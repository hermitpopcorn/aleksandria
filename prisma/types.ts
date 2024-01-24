import { Prisma } from "@prisma/client";

export type ItemWithCollection = Prisma.ItemGetPayload<{
  include: { collection: true };
}>;
