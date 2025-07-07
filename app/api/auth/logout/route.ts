import { serialize } from 'cookie';

export async function GET(): Promise<Response> {
  const logoutCookie = serialize("userToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });

  return new Response(JSON.stringify({ message: "Logged out successfully" }), {
    status: 200,
    headers: {
      "Set-Cookie": logoutCookie,
      "Content-Type": "application/json",
    },
  });
}
