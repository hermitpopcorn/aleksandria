import Hashids from "hashids";

type HashidType = "collections" | "items";
type HashidsCache = Record<HashidType, Hashids>;

let hashidsCache = {} as HashidsCache;

function getHashids(type: HashidType): Hashids {
  const checkCache = hashidsCache[type];
  if (checkCache) {
    return checkCache;
  }

  const length = process.env.HASHIDS_LENGTH ? Number(process.env.HASHIDS_LENGTH) : 6;
  let salt = ((hashidType: HashidType): string => {
    switch (hashidType) {
      case "collections":
        return process.env.HASHIDS_COLLECTIONS_SALT ?? "Aleksandria-Collections";
      case "items":
        return process.env.HASHIDS_ITEMS_SALT ?? "Aleksandria-Items";
      default:
        return process.env.HASHIDS_SALT ?? "Aleksandria";
    }
  })(type);

  const hashids = new Hashids(salt, length);
  hashidsCache[type] = hashids;
  return hashids;
}

export class InvalidHashidError extends Error {
  constructor(message?: string) {
    super(message ?? "Invalid Hashid provided.");
    this.name = "InvalidHashidError";
  }
}

function encodeId(hashids: Hashids, id: number): string {
  return hashids.encode(id);
}

function decodeHashid(hashids: Hashids, hashid: string): number {
  const decodedNumberLikeArray = hashids.decode(hashid);

  if (decodedNumberLikeArray.length != 1) {
    throw new InvalidHashidError("Invalid count of decoded IDs.");
  }

  const numberLike = decodedNumberLikeArray.pop()!;

  const decodedNumber = Number(numberLike);
  if (!Number.isInteger(decodedNumber)) {
    throw new InvalidHashidError("Decoded ID is not a valid integer.");
  }

  return Number(numberLike);
}

export function encodeCollectionId(id: number): string {
  const hashids = getHashids("collections");
  return encodeId(hashids, id);
}

export function decodeCollectionHashid(hashid: string): number {
  const hashids = getHashids("collections");
  return decodeHashid(hashids, hashid);
}

export function encodeItemId(id: number): string {
  const hashids = getHashids("items");
  return encodeId(hashids, id);
}

export function decodeItemHashid(hashid: string): number {
  const hashids = getHashids("items");
  return decodeHashid(hashids, hashid);
}
