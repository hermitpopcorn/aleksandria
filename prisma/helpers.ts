import { Session } from "next-auth";

export function belongsToUser(session: Session): any {
  return { where: { userId: session.user.id } };
}
