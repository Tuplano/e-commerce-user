import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ProfileCard from "./profileCard";
import User from "@/models/users";
import { IUser } from "@/types/user";
import connectToDatabase from "@/lib/mongodb";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return (
      <div className="p-4 text-center">
        You must be logged in to view this page.
      </div>
    );
  }

  await connectToDatabase();
  const user = await User.findOne({ email: session.user.email }).lean<IUser>();

  if (!user) {
    return <div className="p-4 text-center">User not found.</div>;
  }

  const hasPassword = !!user.password && user.password.trim() !== "";

  return (
    <ProfileCard
      username={user.username || ""}
      email={user.email}
      contact={user.contact ?? ""}
      address={user.address ?? ""}
      role={user.role}
      hasPassword={hasPassword}
    />
  );
}
