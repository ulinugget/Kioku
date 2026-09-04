import { Select } from '@radix-ui/themes';
import { cn } from '../utils/cn';

export interface SelectFieldProps {
  className?: string;
  label?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
}

export function SelectField({
  className,
  label,
  placeholder,
  options,
  value,
  defaultValue,
  onValueChange,
  disabled,
  name,
}: SelectFieldProps) {
  return (
    <Select.Root
      className={cn('w-full', className)}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      name={name}
    >
      {label && <Select.Label>{label}</Select.Label>}
      <Select.Trigger placeholder={placeholder} />
      <Select.Content>
        {options.map((option) => (
          <Select.Item key={option.value} value={option.value}>
            {option.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
