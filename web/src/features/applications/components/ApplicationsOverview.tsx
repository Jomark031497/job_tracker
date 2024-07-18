import { useUserApplicationsOverview } from "../hooks/useUserApplicationsOverview";

type ApplicationsOverview = {
  userId: string;
};

export const ApplicationsOverview = ({ userId }: ApplicationsOverview) => {
  const { data } = useUserApplicationsOverview(userId);

  return (
    <section className="flex items-center gap-4 mb-8">
      <div className="p-4 border-2 rounded text-center flex-1">
        <h2 className="text-xl font-semibold">Total Applications</h2>
        <p className="text-2xl font-bold">{data.count}</p>
      </div>
      <div className="p-4 border-2 rounded text-center flex-1">
        <h2 className="text-xl font-semibold">Submitted</h2>
        <p className="text-2xl font-bold">{data.submitted}</p>
      </div>
      <div className="p-4 border-2 rounded text-center flex-1">
        <h2 className="text-xl font-semibold">In Progress</h2>
        <p className="text-2xl font-bold">{data.inProgress}</p>
      </div>
      <div className="p-4 border-2 rounded text-center flex-1">
        <h2 className="text-xl font-semibold">Rejected</h2>
        <p className="text-2xl font-bold">{data.rejected}</p>
      </div>
    </section>
  );
};
