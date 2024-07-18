import { useAuth } from "../../auth/hooks/useAuth";
import { lazy, Suspense } from "react";
import { UserApplications } from "../../applications/components/UserApplications";
import { useToggle } from "../../miscs/hooks/useToggle";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Button } from "../../../components/ui/Button";
import { ApplicationsOverview } from "../../applications/components/ApplicationsOverview";

const CreateApplication = lazy(() =>
  import("../../applications/components/CreateApplication").then((module) => ({
    default: module.CreateApplication,
  }))
);

export const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <>No User found, this shouldnt happen</>;
  }

  const { isOpen, open, close } = useToggle();

  return (
    <>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
              <div>
                User Application Failed
                <Button onClick={() => resetErrorBoundary()}>Try again</Button>
              </div>
            )}
          >
            <Suspense fallback={<>Loading...</>}>
              <ApplicationsOverview userId={user.id} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
              <div>
                User Application Failed
                <Button onClick={() => resetErrorBoundary()}>Try again</Button>
              </div>
            )}
          >
            <Suspense fallback={<>Loading...</>}>
              <UserApplications userId={user.id} open={open} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>

      {user && <CreateApplication close={close} isOpen={isOpen} userId={user.id} />}
    </>
  );
};
