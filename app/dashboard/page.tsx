import { FaBook, FaGamepad, FaRecordVinyl } from "react-icons/fa6";

export default function DashboardPage() {
  const size = 200;
  const color = "#FAFAFA";

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4 overflow-hidden">
      <FaBook size={size} color={color} />
      <FaGamepad size={size} color={color} />
      <FaRecordVinyl size={size} color={color} />
    </div>
  );
}
