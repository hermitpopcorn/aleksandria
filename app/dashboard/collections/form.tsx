"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { FaFloppyDisk } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import { Collection } from "@prisma/client";
import { encodeId } from "app/api/hashids";
import { CollectionType } from "app/types";

export type FormValueTypes = {
  hashid?: string;
  name: string;
  type: CollectionType;
};

type Props = {
  action: CallableFunction;
  collection?: Collection;
};

export default function CollectionForm({ action, collection }: Props) {
  const router = useRouter();

  const [formValues, setFormValues] = useState<FormValueTypes>({
    hashid: collection ? encodeId(collection.id) : undefined,
    name: collection ? collection.name : "",
    type: collection ? (collection.type as CollectionType) : CollectionType.Book,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    await action(formValues);
    setIsSubmitting(false);

    router.push(
      formValues.hashid
        ? `/dashboard/collections/${formValues.hashid}`
        : "/dashboard/collections",
    );
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
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="input-collection-name"
        >
          Collection name
        </label>
        <input
          name="name"
          value={formValues.name}
          onChange={handleInput}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="input-collection-name"
          type="text"
        />
      </div>
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="input-collection-type"
        >
          Collection type
        </label>
        <select
          name="type"
          value={formValues.type}
          onChange={handleInput}
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 p-4 pr-8 mb-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 capitalize"
          id="input-collection-type"
        >
          {Object.values(CollectionType).map((i) => (
            <option value={i.valueOf()} className="capitalize">
              {i.valueOf()}
            </option>
          ))}
        </select>
      </div>
      {getSubmitButton()}
    </form>
  );
}
