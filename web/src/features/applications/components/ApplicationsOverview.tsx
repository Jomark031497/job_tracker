import { useUserApplicationsOverview } from "../hooks/useUserApplicationsOverview";

type ApplicationsOverview = {
  userId: string;
};

export const ApplicationsOverview = ({ userId }: ApplicationsOverview) => {
  const { data } = useUserApplicationsOverview(userId);

  return (
    <section className="grid grid-cols-4 gap-4 mb-8">
      <div className="p-4 border-2 rounded text-center flex-1 col-span-2 md:col-span-1">
        <h2 className="text-xs md:text-xl font-semibold mb-1">Total Applications</h2>
        <p className="text-md font-bold md:text-2xl">{data.count}</p>
      </div>
      <div className="p-4 border-2 rounded text-center flex-1 col-span-2 md:col-span-1">
        <h2 className="text-xs md:text-xl font-semibold mb-1">Submitted</h2>
        <p className="text-md font-bold md:text-2xl">{data.submitted}</p>
      </div>
      <div className="p-4 border-2 rounded text-center flex-1 col-span-2 md:col-span-1">
        <h2 className="text-xs md:text-xl font-semibold mb-1">In Progress</h2>
        <p className="text-md font-bold md:text-2xl">{data.inProgress}</p>
      </div>
      <div className="p-4 border-2 rounded text-center flex-1 col-span-2 md:col-span-1">
        <h2 className="text-xs md:text-xl font-semibold mb-1">Rejected</h2>
        <p className="text-md font-bold md:text-2xl">{data.rejected}</p>
      </div>
    </section>
  );
};
