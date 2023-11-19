import Hashids from "hashids";

const hashids = new Hashids(process.env.HASHIDS_SALT ?? "Aleksandria", 6);

export class InvalidHashidError extends Error {
  constructor(message?: string) {
    super(message ?? "Invalid Hashid provided.");
    this.name = "InvalidHashidError";
  }
}

export function encodeId(id: number): string {
  return hashids.encode(id);
}

export function decodeHashid(hashid: string): number {
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
