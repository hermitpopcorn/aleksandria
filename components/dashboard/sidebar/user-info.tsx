import { auth } from "@auth/auth";
import LogoutButton from "./btn-logout";

export default async function SidebarUserInfo() {
  const session = await auth();

  return (
    <center>
      <p className="whitespace-nowrap overflow-hidden text-ellipsis mb-2">
        {session?.user?.email}
      </p>
      <LogoutButton>Sign Out</LogoutButton>
    </center>
  );
}
