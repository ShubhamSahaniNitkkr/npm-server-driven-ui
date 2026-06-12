import React from 'react';
import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
} from 'antd';
import type { AdapterProps } from '../types';

function FieldWrapper({
  label,
  required,
  error,
  children,
}: {
  label?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  if (!label) return <>{children}</>;
  return (
    <Form.Item label={label} required={required} validateStatus={error ? 'error' : undefined} help={error}>
      {children}
    </Form.Item>
  );
}

export const InputAdapter = React.memo(function InputAdapter({
  schema,
  value,
  onChange,
  error,
  disabled,
}: AdapterProps) {
  const label = schema.label as string | undefined;
  const placeholder = schema.placeholder as string | undefined;
  return (
    <FieldWrapper label={label} required={schema.required as boolean} error={error}>
      <Input
        value={value as string | undefined}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
      />
    </FieldWrapper>
  );
});

export const TextAreaAdapter = React.memo(function TextAreaAdapter({
  schema,
  value,
  onChange,
  error,
  disabled,
}: AdapterProps) {
  return (
    <FieldWrapper label={schema.label as string} required={schema.required as boolean} error={error}>
      <Input.TextArea
        value={value as string | undefined}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={schema.placeholder as string}
        disabled={disabled}
        rows={(schema.rows as number) ?? 4}
      />
    </FieldWrapper>
  );
});

export const PasswordAdapter = React.memo(function PasswordAdapter({
  schema,
  value,
  onChange,
  error,
  disabled,
}: AdapterProps) {
  return (
    <FieldWrapper label={schema.label as string} required={schema.required as boolean} error={error}>
      <Input.Password
        value={value as string | undefined}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={schema.placeholder as string}
        disabled={disabled}
      />
    </FieldWrapper>
  );
});

export const NumberAdapter = React.memo(function NumberAdapter({
  schema,
  value,
  onChange,
  error,
  disabled,
}: AdapterProps) {
  return (
    <FieldWrapper label={schema.label as string} required={schema.required as boolean} error={error}>
      <InputNumber
        value={value as number | undefined}
        onChange={(v) => onChange?.(v)}
        disabled={disabled}
        style={{ width: '100%' }}
        min={schema.min as number | undefined}
        max={schema.max as number | undefined}
      />
    </FieldWrapper>
  );
});

export const CheckboxAdapter = React.memo(function CheckboxAdapter({
  schema,
  value,
  onChange,
  disabled,
}: AdapterProps) {
  return (
    <Checkbox
      checked={Boolean(value)}
      onChange={(e) => onChange?.(e.target.checked)}
      disabled={disabled}
    >
      {schema.label as string}
    </Checkbox>
  );
});

export const RadioAdapter = React.memo(function RadioAdapter({
  schema,
  value,
  onChange,
  error,
  disabled,
}: AdapterProps) {
  const options = (schema.options as { label: string; value: string }[]) ?? [];
  return (
    <FieldWrapper label={schema.label as string} required={schema.required as boolean} error={error}>
      <Radio.Group
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        options={options}
      />
    </FieldWrapper>
  );
});

export const SwitchAdapter = React.memo(function SwitchAdapter({
  schema,
  value,
  onChange,
  disabled,
}: AdapterProps) {
  return (
    <Form.Item label={schema.label as string}>
      <Switch checked={Boolean(value)} onChange={(v) => onChange?.(v)} disabled={disabled} />
    </Form.Item>
  );
});

export const SelectAdapter = React.memo(function SelectAdapter({
  schema,
  value,
  onChange,
  error,
  disabled,
}: AdapterProps) {
  const options = (schema.options as { label: string; value: string }[]) ?? [];
  return (
    <FieldWrapper label={schema.label as string} required={schema.required as boolean} error={error}>
      <Select
        value={value as string | undefined}
        onChange={(v) => onChange?.(v)}
        options={options}
        disabled={disabled}
        style={{ width: '100%' }}
        placeholder={schema.placeholder as string}
      />
    </FieldWrapper>
  );
});

export const MultiSelectAdapter = React.memo(function MultiSelectAdapter({
  schema,
  value,
  onChange,
  error,
  disabled,
}: AdapterProps) {
  const options = (schema.options as { label: string; value: string }[]) ?? [];
  return (
    <FieldWrapper label={schema.label as string} required={schema.required as boolean} error={error}>
      <Select
        mode="multiple"
        value={(value as string[]) ?? []}
        onChange={(v) => onChange?.(v)}
        options={options}
        disabled={disabled}
        style={{ width: '100%' }}
        placeholder={schema.placeholder as string}
      />
    </FieldWrapper>
  );
});

export const DatePickerAdapter = React.memo(function DatePickerAdapter({
  schema,
  value,
  onChange,
  error,
  disabled,
}: AdapterProps) {
  return (
    <FieldWrapper label={schema.label as string} required={schema.required as boolean} error={error}>
      <DatePicker
        value={value as never}
        onChange={(_, dateString) => onChange?.(dateString)}
        disabled={disabled}
        style={{ width: '100%' }}
      />
    </FieldWrapper>
  );
});
