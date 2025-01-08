import { redirect } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";

export async function requireAdmin(request: Request) {
  const { userId, sessionId, getToken } = await getAuth(request);

  if (!userId) {
    throw redirect("/sign-in?redirect_url=/admin/dashboard");
  }

  // Get user details from Clerk
  const token = await getToken();
  const response = await fetch("https://api.clerk.dev/v1/users/" + userId, {
    headers: {
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  });

  const user = await response.json();
  
  // Check if user's email matches admin email
  const isAdmin = user.email_addresses.some(
    (email: any) => email.email_address === process.env.ADMIN_EMAIL
  );

  if (!isAdmin) {
    throw redirect("/");
  }

  return { userId, sessionId };
} 