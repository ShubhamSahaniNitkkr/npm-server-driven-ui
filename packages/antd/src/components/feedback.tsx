import React from 'react';
import { Empty, Skeleton, Spin } from 'antd';
import type { AdapterProps } from '../types';

export const SpinnerAdapter = React.memo(function SpinnerAdapter({ schema, children, className, style }: AdapterProps) {
  return (
    <Spin spinning={(schema.spinning as boolean) ?? true} tip={schema.tip as string} className={className} style={style}>
      {children}
    </Spin>
  );
});

export const SkeletonAdapter = React.memo(function SkeletonAdapter({ schema, className, style }: AdapterProps) {
  return (
    <Skeleton
      active={(schema.active as boolean) ?? true}
      loading={(schema.loading as boolean) ?? true}
      paragraph={{ rows: (schema.rows as number) ?? 3 }}
      className={className}
      style={style}
    />
  );
});

export const EmptyAdapter = React.memo(function EmptyAdapter({ schema, className, style }: AdapterProps) {
  return (
    <Empty description={(schema.description as string) ?? 'No data'} className={className} style={style} />
  );
});
