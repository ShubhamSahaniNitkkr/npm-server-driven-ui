import React, { useMemo, useState } from 'react';
import { Button, List, Space, Table } from 'antd';
import { resolveDataSource, SchemaNode } from '@shubhamsunnynitkkr/server-driven-ui';
import type { TableColumnSchema } from '@shubhamsunnynitkkr/server-driven-ui';
import type { AdapterProps } from '../types';

export const TableAdapter = React.memo(function TableAdapter({ schema, registry, sduiContext }: AdapterProps) {
  const ctx = {
    ...(sduiContext?.runtimeContext as Record<string, unknown>),
  };
  const data = resolveDataSource(schema.dataSource as string | unknown[], ctx);
  const columns = (schema.columns as TableColumnSchema[]) ?? [];
  const rowKey = (schema.rowKey as string) ?? 'id';
  const rowActions = (schema.rowActions as import('@shubhamsunnynitkkr/server-driven-ui').SDUISchema[]) ?? [];

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState((schema.pagination as { pageSize?: number })?.pageSize ?? 10);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [filters] = useState<Record<string, string>>({});

  const processedData = useMemo(() => {
    let rows = [...data] as Record<string, unknown>[];
    Object.entries(filters).forEach(([key, filterValue]) => {
      if (!filterValue) return;
      rows = rows.filter((row) =>
        String(row[key] ?? '').toLowerCase().includes(filterValue.toLowerCase()),
      );
    });
    if (sortKey && sortOrder) {
      rows.sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        if (av === bv) return 0;
        const cmp = av! > bv! ? 1 : -1;
        return sortOrder === 'asc' ? cmp : -cmp;
      });
    }
    return rows;
  }, [data, filters, sortKey, sortOrder]);

  const antColumns = columns.map((col) => ({
    key: col.key,
    dataIndex: col.key,
    title: col.title,
    sorter: col.sortable ? true : undefined,
    filteredValue: col.filterable ? [filters[col.key] ?? ''] : undefined,
    onFilter: col.filterable
      ? (value: string, record: Record<string, unknown>) =>
          String(record[col.key] ?? '').toLowerCase().includes(String(value).toLowerCase())
      : undefined,
    render: (value: unknown, record: Record<string, unknown>) => {
      if (col.render && registry) {
        return (
          <SchemaNode
            schema={{ ...col.render, value, record } as unknown as import('@shubhamsunnynitkkr/server-driven-ui').SDUISchema}
            registry={registry}
            row={record}
          />
        );
      }
      return String(value ?? '');
    },
  }));

  if (rowActions.length > 0) {
    antColumns.push({
      key: '__actions',
      dataIndex: '__actions',
      title: 'Actions',
      sorter: false,
      filteredValue: undefined,
      onFilter: undefined,
      render: (_: unknown, record: Record<string, unknown>) => (
        <Space>
          {rowActions.map((actionSchema, index) => (
            <SchemaNode
              key={actionSchema.id ?? index}
              schema={actionSchema}
              registry={registry!}
              row={record}
            />
          ))}
        </Space>
      ),
    });
  }

  return (
    <Table
      rowKey={rowKey}
      dataSource={processedData}
      columns={antColumns as never}
      pagination={{
        current: page,
        pageSize,
        total: processedData.length,
        showSizeChanger: (schema.pagination as { showSizeChanger?: boolean })?.showSizeChanger ?? true,
        onChange: (p, ps) => {
          setPage(p);
          setPageSize(ps);
        },
      }}
      onChange={(_, __, sorter) => {
        const s = Array.isArray(sorter) ? sorter[0] : sorter;
        if (!s || !s.columnKey) {
          setSortKey(null);
          setSortOrder(null);
          return;
        }
        setSortKey(String(s.columnKey));
        setSortOrder(s.order === 'ascend' ? 'asc' : s.order === 'descend' ? 'desc' : null);
      }}
    />
  );
});

export const ListAdapter = React.memo(function ListAdapter({ schema, registry, sduiContext }: AdapterProps) {
  const ctx = { ...(sduiContext?.runtimeContext as Record<string, unknown>) };
  const data = resolveDataSource(schema.dataSource as string | unknown[], ctx);

  return (
    <List
      dataSource={data as Record<string, unknown>[]}
      renderItem={(item, index) => (
        <List.Item key={String((item as Record<string, unknown>).id ?? index)}>
          {schema.itemRender && registry ? (
            <SchemaNode
              schema={{ ...schema.itemRender, item } as unknown as import('@shubhamsunnynitkkr/server-driven-ui').SDUISchema}
              registry={registry}
              row={item as Record<string, unknown>}
            />
          ) : (
            <span>{String((item as Record<string, unknown>).title ?? JSON.stringify(item))}</span>
          )}
        </List.Item>
      )}
    />
  );
});

export const PageAdapter = React.memo(function PageAdapter({
  schema,
  children,
  sduiContext,
  registry,
}: AdapterProps) {
  const modals = (schema.modals as { id: string; title?: string; children?: import('@shubhamsunnynitkkr/server-driven-ui').SDUISchema[] }[]) ?? [];
  const openModals = sduiContext?.openModals ?? new Set<string>();

  return (
    <div data-sdui-page>
      {schema.title ? <h1 style={{ marginBottom: 16 }}>{schema.title as string}</h1> : null}
      {children}
      {modals.map((modal) => {
        if (!openModals.has(modal.id)) return null;
        return (
          <div
            key={modal.id}
            role="dialog"
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}
          >
            <div style={{ background: '#fff', padding: 24, borderRadius: 8, minWidth: 400, maxWidth: '90vw' }}>
              {modal.title ? <h3>{modal.title}</h3> : null}
              {modal.children?.map((child, index) =>
                registry ? (
                  <SchemaNode key={child.id ?? index} schema={child} registry={registry} />
                ) : null,
              )}
              <Button onClick={() => sduiContext?.closeModal?.(modal.id)} style={{ marginTop: 16 }}>
                Close
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
});
