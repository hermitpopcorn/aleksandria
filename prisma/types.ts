import { Prisma } from "@prisma/client";

export type ItemWithCollection = Prisma.ItemGetPayload<{
  include: { collection: true };
}>;

export type ItemWithInformations = Prisma.ItemGetPayload<{
  include: { infos: true };
}>;

export type ItemWithCollectionAndInformations = ItemWithCollection & ItemWithInformations;
