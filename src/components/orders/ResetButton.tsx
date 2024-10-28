import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface ResetButtonProps {
  onReset: () => void;
  isDisabled?: boolean;
}

export const ResetButton = ({ onReset, isDisabled }: ResetButtonProps) => (
  <Button
    variant="outline"
    size="sm"
    onClick={onReset}
    disabled={isDisabled}
    className="flex items-center gap-2"
  >
    <RotateCcw className="h-4 w-4" />
    Reset Filters
  </Button>
);
