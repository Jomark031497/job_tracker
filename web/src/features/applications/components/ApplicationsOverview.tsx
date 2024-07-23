import { useUserApplicationsOverview } from "../hooks/useUserApplicationsOverview";

type ApplicationsOverview = {
  userId: string;
};

export const ApplicationsOverview = ({ userId }: ApplicationsOverview) => {
  const { data } = useUserApplicationsOverview(userId);

  return (
    <section className="mb-8 grid grid-cols-4 gap-4">
      {[
        {
          label: "Total Applications",
          data: data.count,
          percentage: "+ 10% from last month",
        },
        {
          label: "Submitted",
          data: data.submitted,
          percentage: "+ 5% from last month",
        },
        {
          label: "In Progress",
          data: data.inProgress,
          percentage: "- 2% from last month",
        },
        {
          label: "Rejected",
          data: data.rejected,
          percentage: "+ 50% from last month",
        },
      ].map((item) => (
        <div key={item.label} className="col-span-2 flex-1 rounded border bg-white p-4 shadow md:col-span-1">
          <h2 className="mb-4 text-xs md:text-base">{item.label}</h2>
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
      <div className="col-span-2 h-[126px] flex-1 animate-pulse rounded border bg-gray-200 p-4 shadow md:col-span-1"></div>
      <div className="col-span-2 h-[126px] flex-1 animate-pulse rounded border bg-gray-200 p-4 shadow md:col-span-1"></div>
      <div className="col-span-2 h-[126px] flex-1 animate-pulse rounded border bg-gray-200 p-4 shadow md:col-span-1"></div>
      <div className="col-span-2 h-[126px] flex-1 animate-pulse rounded border bg-gray-200 p-4 shadow md:col-span-1"></div>
    </section>
  );
};
