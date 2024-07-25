import { useAuth } from "../../auth/hooks/useAuth";
import { Suspense } from "react";
import { useToggle } from "../../miscs/hooks/useToggle";
import { lazily } from "react-lazily";
import { WithErrorBoundary } from "../../miscs/components/WithErrorBoundary";
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
    <div className="flex flex-col gap-12">
      <WithErrorBoundary fallbackMessage="Unable to fetch applications overview">
        <Suspense fallback={<ApplicationsOverviewSkeleton />}>
          <UserJobApplicationsOverview userId={user.id} />
        </Suspense>
      </WithErrorBoundary>

      <UserJobApplications userId={user.id} open={open} />
      <CreateJobApplication close={close} isOpen={isOpen} userId={user.id} />
    </div>
  );
};
