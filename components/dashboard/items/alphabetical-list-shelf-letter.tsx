type Props = {
  letter: string;
  children?: any;
};

export default async function AlphabeticalItemsListShelfLetter({
  letter,
  children,
}: Props) {
  return (
    <h2
      className="font-bold text-lg mb-2 px-2 border-b-2 border-gray-200"
      aria-label={`Alphabetical divider for letter ${letter}`}
    >
      {children ?? letter}
    </h2>
  );
}
