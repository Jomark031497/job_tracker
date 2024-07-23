import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "../../../components/ui/Button";

type WithErrorBoundaryProps = {
  children: ReactNode;
  fallbackMessage: string;
};

export const WithErrorBoundary = ({ children, fallbackMessage }: WithErrorBoundaryProps) => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ resetErrorBoundary }) => (
          <div className="flex flex-col items-center border p-4">
            <p className="italic text-red-500">{fallbackMessage}</p>
            <Button className="px-4" onClick={resetErrorBoundary}>
              Try again
            </Button>
          </div>
        )}
      >
        {children}
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
);
