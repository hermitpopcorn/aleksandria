"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { FaFloppyDisk, FaRegSquarePlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import { Collection, Item } from "@prisma/client";
import { encodeCollectionId, encodeItemId } from "app/api/hashids";
import { ItemType } from "app/types";
import BaseButton from "@components/dashboard/base-button";
import { ItemWithInformations } from "prisma/types";
import CreatableSelect from "react-select/creatable";

export type FormValueTypes = {
  hashid?: string;
  collectionHashid: string;
  type: ItemType;
  title: string;
  titleAlphabetic: string;
  cover: string;
  note: string;
  copies: number;
  infos: { label: string; info: string }[];
};

type Props = {
  collections: Array<Collection>;
  selectedCollectionHashid?: string;
  action: CallableFunction;
  item?: ItemWithInformations;
};

export default function ItemForm({
  collections,
  selectedCollectionHashid,
  action,
  item,
}: Props) {
  const router = useRouter();

  const [formValues, setFormValues] = useState<FormValueTypes>({
    hashid: item ? encodeItemId(item.id) : undefined,
    collectionHashid:
      (item?.collectionId ? encodeCollectionId(item.collectionId) : undefined) ??
      selectedCollectionHashid ??
      "",
    type: (item?.type as ItemType) ?? ItemType.Book,
    title: item?.title ?? "",
    titleAlphabetic: item?.titleAlphabetic ?? "",
    cover: item?.cover ?? "",
    note: item?.note ?? "",
    copies: item?.copies ?? 1,
    infos: item?.infos ?? [{ label: "", info: "" }],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const renderCollectionOptions = () => {
    return collections.map((collection) => {
      const hashid = encodeCollectionId(collection.id);
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

  const addInfo = () => {
    const infos = formValues.infos;
    infos.push({ label: "", info: "" });

    setFormValues({
      ...formValues,
      infos,
    });
  };

  const handleInfoLabelInput = (index: number, label?: string) => {
    const infos = formValues.infos;
    infos[index].label = label ? label : "";

    setFormValues({
      ...formValues,
      infos,
    });
  };

  const handleInfoValueInput = (e: ChangeEvent, index: number) => {
    const infos = formValues.infos;
    const target = e.target as HTMLInputElement;
    infos[index].info = target.value;

    setFormValues({
      ...formValues,
      infos,
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

    router.push("/dashboard/items/" + encodeItemId(item.id));
    router.refresh();
  };

  const getSubmitButton = () => {
    let color = "bg-blue-500 hover:bg-blue-700";
    if (isSubmitting) {
      color = "bg-blue-200";
    }

    return (
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 flex flex-row justify-center">
        <BaseButton
          disabled={isSubmitting}
          type="submit"
          className={classNames(color, "text-white")}
        >
          <FaFloppyDisk /> Save
        </BaseButton>
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
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 p-4 pr-8 mb-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 capitalize"
            id="input-item-type"
          >
            {Object.values(ItemType).map((i, index) => (
              <option value={i.valueOf()} className="capitalize" key={index}>
                {i.valueOf()}
              </option>
            ))}
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
      <section>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Additional Information
          </label>
          <div>
            {formValues.infos.map((info, index) => (
              <div className="flex flex-row justify-center gap-4" key={index}>
                <div className="w-3/12 flex items-center justify-center">
                  <CreatableSelect
                    instanceId={`input-item-info-label-${index}`}
                    unstyled
                    defaultValue={{ label: info.label, value: info.label }}
                    onChange={(value) => handleInfoLabelInput(index, value?.value)}
                    className="w-full mb-3 appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 mb-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    classNames={{
                      control: (props): string =>
                        classNames(
                          "py-3 px-4 border text-gray-700 rounded leading-tight",
                          props.isFocused
                            ? "outline-none bg-white border-gray-500"
                            : "bg-gray-200 border-gray-200",
                        ),
                      menu: (_): string => "p-1 bg-white border border-gray-500",
                      menuList: (_): string => "py-1 px-2 hover:bg-gray-200",
                    }}
                    options={[{ value: "ISBN", label: "ISBN" }]}
                  />
                </div>
                <div className="w-9/12">
                  <input
                    value={info.info}
                    onChange={(e) => handleInfoValueInput(e, index)}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    id={`input-item-info-${index}`}
                  />
                </div>
              </div>
            ))}
          </div>
          <BaseButton
            className="bg-blue-500 hover:bg-blue-700 text-white"
            type="button"
            onClick={addInfo}
          >
            <FaRegSquarePlus aria-hidden />
            <span>Add more information</span>
          </BaseButton>
        </div>
      </section>
      {getSubmitButton()}
    </form>
  );
}
