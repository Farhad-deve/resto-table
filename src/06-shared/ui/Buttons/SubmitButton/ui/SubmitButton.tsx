import { Button } from "@mantine/core"
import type { ReactNode } from "react"

interface ChangeButtonProps {
  children: ReactNode;
  leftSection?: ReactNode;
  isSubmitLoading: boolean;
  isDisabled?: boolean;
}

export const SubmitButton = ({ children, isSubmitLoading, isDisabled, leftSection } : ChangeButtonProps) => {
  return (
    <Button
      type="submit"
      color="teal.7"
      size="sm"
      loading={isSubmitLoading}
      disabled={isDisabled}
      leftSection={leftSection}
    >
      {children}
    </Button>
  )
}
