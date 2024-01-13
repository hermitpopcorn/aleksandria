"use server";

import prisma from "db";
import { Collection, Item } from "@prisma/client";
import { auth } from "@auth/auth";
import { FormValueTypes } from "./form";
import { decodeCollectionHashid, decodeItemHashid } from "app/api/hashids";
import { cache } from "react";

export async function postAddItem(formValues: FormValueTypes): Promise<Item> {
  const collection = await findCollection(formValues.collectionHashid);

  return await prisma.item.create({
    data: {
      collectionId: collection.id,
      type: formValues.type,
      title: formValues.title.trim(),
      titleAlphabetic: formValues.titleAlphabetic.trim()
        ? formValues.titleAlphabetic.trim()
        : formValues.title.trim(),
      isbn13: formValues.isbn13.trim() ? formValues.isbn13.trim() : null,
      note: formValues.note.trim() ? formValues.note.trim() : null,
      cover: formValues.cover.trim() ? formValues.cover.trim() : null,
      copies: formValues.copies !== undefined ? Number(formValues.copies) : 1,
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

  return await prisma.item.update({
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
      isbn13: formValues.isbn13.trim() ? formValues.isbn13.trim() : null,
      note: formValues.note.trim() ? formValues.note.trim() : null,
      cover: formValues.cover.trim() ? formValues.cover.trim() : null,
      copies: formValues.copies !== undefined ? Number(formValues.copies) : 1,
    },
  });
}

export async function deleteItem(hashid: string): Promise<Item> {
  const session = await auth();

  const realId = decodeItemHashid(hashid);

  return await prisma.item.delete({
    where: {
      collection: {
        userId: session!.user.id,
      },
      id: realId,
    },
  });
}
