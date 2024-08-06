import { useAuth } from "../../auth/hooks/useAuth";
import { useToggle } from "../../miscs/hooks/useToggle";
import { lazily } from "react-lazily";
import { SuspenseWithErrorBoundary } from "../../miscs/components/SuspenseWithErrorBoundary";
import { Navigate } from "react-router-dom";

const { CreateJobApplication } = lazily(() => import("../../job-applications/components/CreateJobApplication"));
const { UserJobApplicationsOverview, ApplicationsOverviewSkeleton } = lazily(
  () => import("../../job-applications/components/UserJobApplicationsOverview"),
);
const { UserJobApplications } = lazily(() => import("../../job-applications/components/UserJobApplications"));

export const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  const { isOpen, open, close } = useToggle();

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <SuspenseWithErrorBoundary
        fallback={<ApplicationsOverviewSkeleton />}
        errorFallbackMessage="Unable to fetch applications overview"
      >
        <UserJobApplicationsOverview userId={user.id} />
      </SuspenseWithErrorBoundary>

      <UserJobApplications userId={user.id} open={open} />

      <CreateJobApplication close={close} isOpen={isOpen} userId={user.id} />
    </div>
  );
};
