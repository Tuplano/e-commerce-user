import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongoclient"; 
import connectToDatabase from "@/lib/mongodb"; 
import User from "@/models/users"; 
import bcrypt from "bcryptjs";

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("AUTHORIZE CREDENTIALS");

        await connectToDatabase();

        const user = await User.findOne({ email: credentials?.email });
        if (!user) {
          console.log("No user found with email:", credentials?.email);
          throw new Error("No user found");
        }

        const isValid = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!isValid) {
          console.log("Invalid password");
          throw new Error("Invalid password");
        }

        return { id: user._id.toString(), email: user.email };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/login",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ account, profile, user }) {

        await connectToDatabase();

        const existingUser = await User.findOne({ email: user.email });

        
        if (!existingUser) {
          const newUser = new User({
            username: user.name,
            email: user.email,
            password:"",
          });

          await newUser.save();
        }
      return true;
    },
    

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      console.log("JWT Callback Token:", token);
      return token;

      
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      console.log("Session Callback:", session);
      return session;
    },
  },
});

export { handler as GET, handler as POST };
