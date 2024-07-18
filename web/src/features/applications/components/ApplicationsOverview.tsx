import { useUserApplicationsOverview } from "../hooks/useUserApplicationsOverview";

type ApplicationsOverview = {
  userId: string;
};

export const ApplicationsOverview = ({ userId }: ApplicationsOverview) => {
  const { data } = useUserApplicationsOverview(userId);

  return (
    <section className="mb-8 grid grid-cols-4 gap-4">
      <div className="col-span-2 flex-1 rounded border-2 p-4 text-center md:col-span-1">
        <h2 className="mb-1 text-xs font-semibold md:text-xl">Total Applications</h2>
        <p className="text-md font-bold md:text-2xl">{data.count}</p>
      </div>
      <div className="col-span-2 flex-1 rounded border-2 p-4 text-center md:col-span-1">
        <h2 className="mb-1 text-xs font-semibold md:text-xl">Submitted</h2>
        <p className="text-md font-bold md:text-2xl">{data.submitted}</p>
      </div>
      <div className="col-span-2 flex-1 rounded border-2 p-4 text-center md:col-span-1">
        <h2 className="mb-1 text-xs font-semibold md:text-xl">In Progress</h2>
        <p className="text-md font-bold md:text-2xl">{data.inProgress}</p>
      </div>
      <div className="col-span-2 flex-1 rounded border-2 p-4 text-center md:col-span-1">
        <h2 className="mb-1 text-xs font-semibold md:text-xl">Rejected</h2>
        <p className="text-md font-bold md:text-2xl">{data.rejected}</p>
      </div>
    </section>
  );
};
