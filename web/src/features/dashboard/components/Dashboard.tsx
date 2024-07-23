import { useAuth } from "../../auth/hooks/useAuth";
import { Suspense } from "react";
import { useToggle } from "../../miscs/hooks/useToggle";
import { lazily } from "react-lazily";
import { WithErrorBoundary } from "../../miscs/components/WithErrorBoundary";
import { Navigate } from "react-router-dom";

const { CreateApplication } = lazily(() => import("../../applications/components/CreateApplication"));
const { ApplicationsOverview, ApplicationsOverviewSkeleton } = lazily(
  () => import("../../applications/components/ApplicationsOverview"),
);
const { UserApplications } = lazily(() => import("../../applications/components/UserApplications"));

export const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  const { isOpen, open, close } = useToggle();

  return (
    <>
      <WithErrorBoundary fallbackMessage="Unable to fetch applications overview">
        <Suspense fallback={<ApplicationsOverviewSkeleton />}>
          <ApplicationsOverview userId={user.id} />
        </Suspense>
      </WithErrorBoundary>

      <UserApplications userId={user.id} open={open} />

      <CreateApplication close={close} isOpen={isOpen} userId={user.id} />
    </>
  );
};
