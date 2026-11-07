import { Button } from "@mantine/core"
import type { ReactNode } from "react"

interface CancelButtonProps {
  children: ReactNode;
  onCancel: () => void;
  cancelDisabled: boolean;
}

export const CancelButton = ({ children, onCancel, cancelDisabled } : CancelButtonProps) => {
  return (
    <Button
      variant="outline"
      c="gray.7"
      className="border-[#dee2e6]!"
      size="sm"
      onClick={onCancel}
      disabled={cancelDisabled}
    >
      {children}
    </Button>
  )
}
