import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";

interface ErrorAlertProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const ErrorAlert = ({
  title = "Error",
  message = "An error occurred while loading data.",
  onRetry,
}: ErrorAlertProps) => {
  return (
    <Alert variant="destructive" className="flex max-w-xs flex-col gap-4">
      <div className="flex items-start gap-4">
        <AlertCircle className="h-5 w-5" />
        <div className="flex-1">
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </div>
      </div>

      {onRetry && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Retry
          </Button>
        </div>
      )}
    </Alert>
  );
};

export default ErrorAlert;
