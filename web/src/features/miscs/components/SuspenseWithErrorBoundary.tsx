import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "../../../components/ui/Button";

type SuspenseWithErrorBoundaryProps = {
  children: ReactNode;
  errorFallbackMessage: string;
  fallback: ReactNode;
};

export const SuspenseWithErrorBoundary = ({
  children,
  errorFallbackMessage,
  fallback,
}: SuspenseWithErrorBoundaryProps) => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ resetErrorBoundary }) => (
          <div className="flex flex-col items-center border p-4">
            <p className="italic text-red-500">{errorFallbackMessage}</p>
            <Button className="px-4" onClick={resetErrorBoundary}>
              Try again
            </Button>
          </div>
        )}
      >
        <Suspense fallback={fallback}>{children}</Suspense>
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
);
