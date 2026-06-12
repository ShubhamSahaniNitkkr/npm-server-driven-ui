import React from 'react';
import { Alert, Avatar, Badge, Statistic, Tag, Typography } from 'antd';
import type { AdapterProps } from '../types';

const { Text: AntText, Title: AntTitle } = Typography;

export const TextAdapter = React.memo(function TextAdapter({ schema, className, style }: AdapterProps) {
  return (
    <AntText type={(schema.variant as 'secondary' | 'success' | 'warning' | 'danger') ?? undefined} className={className} style={style}>
      {(schema.text as string) ?? (schema.content as string)}
    </AntText>
  );
});

export const TitleAdapter = React.memo(function TitleAdapter({ schema, className, style }: AdapterProps) {
  return (
    <AntTitle level={(schema.level as 1 | 2 | 3 | 4 | 5) ?? 3} className={className} style={style}>
      {(schema.text as string) ?? (schema.title as string)}
    </AntTitle>
  );
});

export const BadgeAdapter = React.memo(function BadgeAdapter({ schema, children, className, style }: AdapterProps) {
  return (
    <Badge count={schema.count as number} color={schema.color as string} className={className} style={style}>
      {children ?? (schema.text as string)}
    </Badge>
  );
});

export const TagAdapter = React.memo(function TagAdapter({ schema, className, style }: AdapterProps) {
  return (
    <Tag color={schema.color as string} className={className} style={style}>
      {(schema.text as string) ?? (schema.label as string)}
    </Tag>
  );
});

export const AvatarAdapter = React.memo(function AvatarAdapter({ schema, className, style }: AdapterProps) {
  return (
    <Avatar src={schema.src as string} size={(schema.size as 'small' | 'default' | 'large' | number) ?? 'default'} className={className} style={style}>
      {(schema.text as string) ?? (schema.name as string)?.[0]}
    </Avatar>
  );
});

export const AlertAdapter = React.memo(function AlertAdapter({ schema, className, style }: AdapterProps) {
  return (
    <Alert
      message={schema.message as string}
      description={schema.description as string}
      type={(schema.variant as 'success' | 'info' | 'warning' | 'error') ?? 'info'}
      showIcon={(schema.showIcon as boolean) ?? true}
      className={className}
      style={style}
    />
  );
});

export const StatisticAdapter = React.memo(function StatisticAdapter({ schema, className, style }: AdapterProps) {
  return (
    <Statistic
      title={schema.title as string}
      value={schema.value as string | number}
      prefix={schema.prefix as React.ReactNode}
      suffix={schema.suffix as string}
      className={className}
      style={style}
    />
  );
});
