import { useUserApplicationsOverview } from "../hooks/useUserApplicationsOverview";
import { FaSuitcase } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { FiSend } from "react-icons/fi";

type UserJobApplicationsOverviewProps = {
  userId: string;
};

export const UserJobApplicationsOverview = ({ userId }: UserJobApplicationsOverviewProps) => {
  const { data } = useUserApplicationsOverview(userId);

  return (
    <section className="grid grid-cols-4 gap-4">
      {[
        {
          label: "Total Applications",
          data: data.count,
          percentage: "+ 10% from last month",
          icon: <FaSuitcase />,
        },
        {
          label: "Submitted",
          data: data.submitted,
          percentage: "+ 5% from last month",
          icon: <FiSend />,
        },
        {
          label: "In Progress",
          data: data.inProgress,
          percentage: "- 2% from last month",
          icon: <FaRegClock />,
        },
        {
          label: "Rejected",
          data: data.rejected,
          percentage: "+ 50% from last month",
          icon: <IoMdClose />,
        },
      ].map((item) => (
        <div key={item.label} className="col-span-2 flex-1 rounded border bg-white p-4 shadow md:col-span-1">
          <h2 className="mb-4 flex items-center justify-between text-xs md:text-base">
            {item.label} <span>{item.icon}</span>
          </h2>
          <p className="text-md font-bold md:text-2xl">{item.data}</p>
          <p className="text-xs text-gray-500 md:text-sm">{item.percentage}</p>
        </div>
      ))}
    </section>
  );
};

export const ApplicationsOverviewSkeleton = () => {
  return (
    <section className="mb-8 grid grid-cols-4 gap-4">
      <div className="col-span-2 h-[106px] flex-1 animate-pulse rounded border bg-gray-200 p-4 shadow md:col-span-1 md:h-[126px]"></div>
      <div className="col-span-2 h-[106px] flex-1 animate-pulse rounded border bg-gray-200 p-4 shadow md:col-span-1 md:h-[126px]"></div>
      <div className="col-span-2 h-[106px] flex-1 animate-pulse rounded border bg-gray-200 p-4 shadow md:col-span-1 md:h-[126px]"></div>
      <div className="col-span-2 h-[106px] flex-1 animate-pulse rounded border bg-gray-200 p-4 shadow md:col-span-1 md:h-[126px]"></div>
    </section>
  );
};
