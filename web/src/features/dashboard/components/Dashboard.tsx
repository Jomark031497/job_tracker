import { useAuth } from "../../auth/hooks/useAuth";
import { Suspense } from "react";
import { useToggle } from "../../miscs/hooks/useToggle";
import { lazily } from "react-lazily";
import { WithErrorBoundary } from "../../miscs/components/WithErrorBoundary";
import { Navigate } from "react-router-dom";

const { CreateJobApplication: CreateApplication } = lazily(
  () => import("../../job-applications/components/CreateJobApplication"),
);
const { UserJobApplicationsOverview: ApplicationsOverview, ApplicationsOverviewSkeleton } = lazily(
  () => import("../../job-applications/components/UserJobApplicationsOverview"),
);
const { UserJobApplications: UserApplications } = lazily(
  () => import("../../job-applications/components/UserJobApplications"),
);

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
          <ApplicationsOverview userId={user.id} />
        </Suspense>
      </WithErrorBoundary>
      x
      <UserApplications userId={user.id} open={open} />
      <CreateApplication close={close} isOpen={isOpen} userId={user.id} />
    </div>
  );
};
