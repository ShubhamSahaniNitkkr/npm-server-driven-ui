import React from 'react';
import { Button } from 'antd';
import type { AdapterProps } from '../types';

export const ButtonAdapter = React.memo(function ButtonAdapter({
  schema,
  onClick,
  disabled,
  className,
  style,
}: AdapterProps) {
  return (
    <Button
      type={(schema.variant as 'primary' | 'default' | 'dashed' | 'link' | 'text') ?? 'default'}
      danger={schema.danger as boolean}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={style}
    >
      {(schema.text as string) ?? (schema.label as string)}
    </Button>
  );
});

export const IconButtonAdapter = React.memo(function IconButtonAdapter({
  schema,
  onClick,
  disabled,
  className,
  style,
}: AdapterProps) {
  return (
    <Button
      type={(schema.variant as 'primary' | 'default' | 'text') ?? 'text'}
      icon={schema.icon as React.ReactNode}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={style}
      aria-label={(schema.text as string) ?? (schema.label as string)}
    />
  );
});
