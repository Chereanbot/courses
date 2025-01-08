import { LoaderFunction, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { requireAdmin } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireAdmin(request);
  return null;
};

export default function AdminRoot() {
  return <Outlet />;
} 