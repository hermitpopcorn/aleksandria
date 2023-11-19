"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { FaFloppyDisk } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import { Collection, Item } from "@prisma/client";
import { encodeId } from "app/api/hashids";

type ItemType = "book";

export type FormValueTypes = {
  hashid?: string;
  collectionHashid: string;
  type: ItemType;
  title: string;
  titleAlphabetic: string;
  isbn13: string;
  cover: string;
  note: string;
  copies: number;
};

type Props = {
  collections: Array<Collection>;
  selectedCollectionHashid?: string;
  action: CallableFunction;
  item?: Item;
};

export default function ItemForm({
  collections,
  selectedCollectionHashid,
  action,
  item,
}: Props) {
  const router = useRouter();

  const [formValues, setFormValues] = useState<FormValueTypes>({
    hashid: item ? encodeId(item.id) : undefined,
    collectionHashid:
      (item?.collectionId ? encodeId(item.collectionId) : undefined) ??
      selectedCollectionHashid ??
      "",
    type: (item?.type as ItemType) ?? "book",
    title: item?.title ?? "",
    titleAlphabetic: item?.titleAlphabetic ?? "",
    isbn13: item?.isbn13 ?? "",
    cover: item?.cover ?? "",
    note: item?.note ?? "",
    copies: item?.copies ?? 1,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const renderCollectionOptions = () => {
    return collections.map((collection) => {
      const hashid = encodeId(collection.id);
      return (
        <option key={hashid} value={hashid}>
          {collection.name}
        </option>
      );
    });
  };

  const handleInput = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    let item: Item;
    try {
      item = await action(formValues);
    } catch (err) {
      alert(err);
      return;
    } finally {
      setIsSubmitting(false);
    }

    router.push("/dashboard/items/" + encodeId(item.id));
    router.refresh();
  };

  const getSubmitButton = () => {
    let color = "bg-blue-500 hover:bg-blue-700";
    if (isSubmitting) {
      color = "bg-blue-200";
    }

    return (
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 flex flex-row justify-center">
        <button
          disabled={isSubmitting}
          type="submit"
          className={classNames(
            color,
            "text-white font-bold py-2 px-4 rounded flex flex-row items-center gap-2",
          )}
        >
          <FaFloppyDisk /> Save
        </button>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full md:w-1/2 flex flex-wrap">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="input-item-collection"
          >
            Collection
          </label>
          <select
            required
            name="collectionHashid"
            value={formValues.collectionHashid}
            onChange={handleInput}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 p-4 pr-8 mb-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="input-item-collection"
          >
            {renderCollectionOptions()}
          </select>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="input-item-type"
          >
            Item type
          </label>
          <select
            required
            name="type"
            value={formValues.type}
            onChange={handleInput}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 p-4 pr-8 mb-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="input-item-type"
          >
            <option value="book">Book</option>
          </select>
        </div>
      </div>
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="input-item-title"
        >
          Title
        </label>
        <input
          required
          name="title"
          value={formValues.title}
          onChange={handleInput}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="input-item-title"
          type="text"
        />
      </div>
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="input-item-titleAlphabetic"
        >
          Title (alphabetic)
        </label>
        <input
          name="titleAlphabetic"
          value={formValues.titleAlphabetic}
          onChange={handleInput}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="input-item-titleAlphabetic"
          type="text"
        />
      </div>
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="input-item-isbn13"
        >
          ISBN
        </label>
        <input
          name="isbn13"
          value={formValues.isbn13}
          onChange={handleInput}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="input-item-isbn13"
          type="text"
        />
      </div>
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="input-item-cover"
        >
          Cover URL
        </label>
        <input
          name="cover"
          value={formValues.cover}
          onChange={handleInput}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="input-item-cover"
          type="text"
        />
      </div>
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="input-item-note"
        >
          Note
        </label>
        <textarea
          name="note"
          value={formValues.note}
          onChange={handleInput}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="input-item-note"
        ></textarea>
      </div>
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="input-item-copies"
        >
          Number of copies
        </label>
        <input
          name="copies"
          value={formValues.copies}
          onChange={handleInput}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="input-item-copies"
          type="number"
        />
      </div>
      {getSubmitButton()}
    </form>
  );
}
