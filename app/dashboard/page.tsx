import { FaBook, FaGamepad, FaRecordVinyl } from "react-icons/fa6";

export default function DashboardPage() {
  const size = 200;
  const color = "#FAFAFA";

  return (
    <div
      className="h-screen flex flex-col justify-center items-center gap-4 overflow-hidden"
      aria-hidden
    >
      <FaBook size={size} color={color} aria-hidden />
      <FaGamepad size={size} color={color} aria-hidden />
      <FaRecordVinyl size={size} color={color} aria-hidden />
    </div>
  );
}
