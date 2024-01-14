import { FaBookOpen, FaGamepad, FaRecordVinyl } from "react-icons/fa6";

const color = "#fff";
const size = 48;

type Props = {
  type?: string | null;
};

export default function BlankCover({ type }: Props) {
  return (
    <div className="w-32 h-full place-self-stretch bg-gray-300 rounded-md flex flex-col justify-center items-center">
      {renderIcon(type)}
    </div>
  );
}

function renderIcon(type?: string | null): JSX.Element {
  if (type == "game") {
    return (
      <FaGamepad
        color={color}
        size={size}
        aria-label="Gamepad icon for a blank, unspecified cover"
        title="Gamepad icon"
      />
    );
  }

  if (type == "music") {
    return (
      <FaRecordVinyl
        color={color}
        size={size}
        aria-label="Record vinyl icon for a blank, unspecified cover"
        title="Record vinyl icon"
      />
    );
  }

  return (
    <FaBookOpen
      color={color}
      size={size}
      aria-label="Open book icon for a blank, unspecified cover"
      title="Open book icon"
    />
  );
}
