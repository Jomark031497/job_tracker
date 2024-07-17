import { useAuth } from "../../auth/hooks/useAuth";
import { lazy, Suspense } from "react";
import { UserApplications } from "../../applications/components/UserApplications";
import { useToggle } from "../../miscs/hooks/useToggle";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Button } from "../../../components/ui/Button";

const CreateApplication = lazy(() =>
  import("../../applications/components/CreateApplication").then((module) => ({
    default: module.CreateApplication,
  }))
);

export const Dashboard = () => {
  const { user } = useAuth();

  const { isOpen, open, close } = useToggle();

  return (
    <>
      <section className="flex items-center gap-4 mb-8">
        <div className="p-4 border-2 rounded text-center flex-1">
          <h2 className="text-xl font-semibold">Total Applications</h2>
          <p className="text-2xl font-bold">124</p>
        </div>
        <div className="p-4 border-2 rounded text-center flex-1">
          <h2 className="text-xl font-semibold">In Progress</h2>
          <p className="text-2xl font-bold">42</p>
        </div>
        <div className="p-4 border-2 rounded text-center flex-1">
          <h2 className="text-xl font-semibold">Responded</h2>
          <p className="text-2xl font-bold">62</p>
        </div>
        <div className="p-4 border-2 rounded text-center flex-1">
          <h2 className="text-xl font-semibold">Rejected</h2>
          <p className="text-2xl font-bold">20</p>
        </div>
      </section>

      {user && (
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
      )}

      {user && <CreateApplication close={close} isOpen={isOpen} userId={user.id} />}
    </>
  );
};
