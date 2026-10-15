import { InputBase, Text } from "@mantine/core";
import { IMaskInput } from "react-imask";

interface PhoneInputProps {
  value: string;
  error?: string;
  onChange : (value: string) => void;
  onBlur : () => void
}

export const PhoneInput = ({ error, onBlur, onChange, value }: PhoneInputProps) => {
  return (
    <InputBase inputMode="numeric"
      label="Телефон"
      component={IMaskInput}
      type="tel"
      autoComplete="tel-national"
      mask={"00 000 00 00"}
      value={value}
      onAccept={(_value, maskRef) => onChange(maskRef.unmaskedValue)}
      onBlur={onBlur}
      leftSection={<Text size="sm">+998</Text>}
      leftSectionWidth={55}
      leftSectionPointerEvents="none"
      placeholder="90 123 45 67"
      error={error}
    />
  );
};
