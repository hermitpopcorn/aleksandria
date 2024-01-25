"use server";

import prisma from "db";
import { Collection, Item, Prisma } from "@prisma/client";
import { auth } from "@auth/auth";
import { FormValueTypes } from "./form";
import { decodeCollectionHashid, decodeItemHashid } from "app/api/hashids";
import { cache } from "react";

type ItemInfo = { label: string; info: string };

function sanitizeInfos(infos: { label?: string; info?: string }[]): ItemInfo[] {
  let filtered: ItemInfo[] = [];
  infos.map((v) => {
    if (!v.label || !v.info) {
      return;
    }
    filtered.push({ label: v.label, info: v.info });
  });

  return filtered;
}

export async function postAddItem(formValues: FormValueTypes): Promise<Item> {
  const collection = await findCollection(formValues.collectionHashid);

  let infos: ItemInfo[] = sanitizeInfos(formValues.infos);

  return await prisma.item.create({
    data: {
      collectionId: collection.id,
      type: formValues.type,
      title: formValues.title.trim(),
      titleAlphabetic: formValues.titleAlphabetic.trim()
        ? formValues.titleAlphabetic.trim()
        : formValues.title.trim(),
      note: formValues.note.trim() ? formValues.note.trim() : null,
      cover: formValues.cover.trim() ? formValues.cover.trim() : null,
      copies: formValues.copies !== undefined ? Number(formValues.copies) : 1,
      infos: infos ? { create: infos } : undefined,
    },
  });
}

export const getCollections = cache(async () => {
  const session = await auth();

  return await prisma.collection.findMany({
    where: {
      userId: session?.user.id,
    },
  });
});

async function findCollection(hashid: string): Promise<Collection> {
  const session = await auth();
  const id = decodeCollectionHashid(hashid);

  return await prisma.collection.findFirstOrThrow({
    where: {
      userId: session?.user.id,
      id,
    },
  });
}

export async function editExistingItem(formValues: FormValueTypes): Promise<Item> {
  const session = await auth();

  if (!formValues.hashid) {
    throw new Error("No ID supplied.");
  }

  const realId = decodeItemHashid(formValues.hashid!);

  const collection = await findCollection(formValues.collectionHashid);

  let infos: ItemInfo[] = sanitizeInfos(formValues.infos);

  const clearExistingInfos = deleteInfosForItem(realId);

  const update = prisma.item.update({
    where: {
      collection: {
        userId: session!.user.id,
      },
      id: realId,
    },
    data: {
      collectionId: collection.id,
      type: formValues.type,
      title: formValues.title.trim(),
      titleAlphabetic: formValues.titleAlphabetic.trim()
        ? formValues.titleAlphabetic.trim()
        : formValues.title.trim(),
      note: formValues.note.trim() ? formValues.note.trim() : null,
      cover: formValues.cover.trim() ? formValues.cover.trim() : null,
      copies: formValues.copies !== undefined ? Number(formValues.copies) : 1,
      infos: infos ? { create: infos } : undefined,
    },
  });

  const result = await prisma.$transaction([clearExistingInfos, update]);
  return result[1];
}

export async function deleteItem(hashid: string): Promise<Item> {
  const session = await auth();

  const realId = decodeItemHashid(hashid);

  const clearExistingInfos = deleteInfosForItem(realId);

  const del = prisma.item.delete({
    where: {
      collection: {
        userId: session!.user.id,
      },
      id: realId,
    },
  });

  const result = await prisma.$transaction([clearExistingInfos, del]);
  return result[1];
}

function deleteInfosForItem(id: any): Prisma.PrismaPromise<Prisma.BatchPayload> {
  return prisma.itemInformation.deleteMany({
    where: {
      itemId: id,
    },
  });
}
