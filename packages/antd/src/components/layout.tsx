import React from 'react';
import { SchemaNode } from '@shubhamsunnynitkkr/server-driven-ui';
import { Card, Col, Collapse, Divider, Row, Tabs } from 'antd';
import type { AdapterProps } from '../types';

export const RowAdapter = React.memo(function RowAdapter({ schema, children, className, style }: AdapterProps) {
  return (
    <Row gutter={(schema.gutter as number) ?? 16} className={className} style={style}>
      {children}
    </Row>
  );
});

export const ColumnAdapter = React.memo(function ColumnAdapter({ schema, children, className, style }: AdapterProps) {
  return (
    <Col span={(schema.span as number) ?? 24} className={className} style={style}>
      {children}
    </Col>
  );
});

export const GridAdapter = React.memo(function GridAdapter({ schema, children, className, style }: AdapterProps) {
  const columns = (schema.columns as number) ?? 2;
  const gap = (schema.gap as number) ?? 16;
  const span = Math.floor(24 / columns);
  const childArray = React.Children.toArray(children);

  return (
    <Row gutter={gap} className={className} style={style}>
      {childArray.map((child, index) => (
        <Col key={index} span={span}>
          {child}
        </Col>
      ))}
    </Row>
  );
});

export const CardAdapter = React.memo(function CardAdapter({ schema, children, className, style }: AdapterProps) {
  return (
    <Card title={schema.title as string} className={className} style={style}>
      {children}
    </Card>
  );
});

export const DividerAdapter = React.memo(function DividerAdapter({ schema, className, style }: AdapterProps) {
  return (
    <Divider orientation={(schema.orientation as 'left' | 'right' | 'center') ?? 'center'} className={className} style={style}>
      {schema.text as string}
    </Divider>
  );
});

export const TabsAdapter = React.memo(function TabsAdapter({ schema, registry }: AdapterProps) {
  const items = (schema.items as { key: string; label: string; children?: import('@shubhamsunnynitkkr/server-driven-ui').SDUISchema[] }[]) ?? [];

  return (
    <Tabs
      items={items.map((item) => ({
        key: item.key,
        label: item.label,
        children: item.children?.map((child, index) =>
          registry ? (
            <SchemaNode key={child.id ?? index} schema={child} registry={registry} />
          ) : null,
        ),
      }))}
    />
  );
});

export const CollapseAdapter = React.memo(function CollapseAdapter({ schema, registry }: AdapterProps) {
  const items = (schema.items as { key: string; label: string; children?: import('@shubhamsunnynitkkr/server-driven-ui').SDUISchema[] }[]) ?? [];

  return (
    <Collapse
      items={items.map((item) => ({
        key: item.key,
        label: item.label,
        children: item.children?.map((child, index) =>
          registry ? (
            <SchemaNode key={child.id ?? index} schema={child} registry={registry} />
          ) : null,
        ),
      }))}
    />
  );
});
