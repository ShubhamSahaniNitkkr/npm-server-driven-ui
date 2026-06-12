import type { ActionSchema } from '../actions/types';
import type { ConditionSchema } from '../conditions/types';
import type { ValidationRule } from '../validation/types';

export interface BaseSchema {
  type: string;
  id?: string;
  name?: string;
  className?: string;
  style?: Record<string, string | number>;
  visibleIf?: ConditionSchema;
  enabledIf?: ConditionSchema;
  actions?: Record<string, ActionSchema | ActionSchema[]>;
  children?: SDUISchema[];
  props?: Record<string, unknown>;
}

export interface PageSchema extends BaseSchema {
  type: 'page';
  title?: string;
  layout?: string;
  modals?: ModalSchema[];
}

export interface ModalSchema {
  id: string;
  title?: string;
  width?: number | string;
  children?: SDUISchema[];
}

export interface FormFieldSchema extends BaseSchema {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  validation?: ValidationRule[];
  defaultValue?: unknown;
}

export interface TableColumnSchema {
  key: string;
  title: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: number | string;
  render?: SDUISchema;
}

export interface TableSchema extends BaseSchema {
  type: 'table';
  dataSource?: string | unknown[];
  rowKey?: string;
  columns?: TableColumnSchema[];
  pagination?: {
    pageSize?: number;
    showSizeChanger?: boolean;
  };
  rowActions?: SDUISchema[];
}

export interface ChartSeriesSchema {
  key: string;
  label?: string;
  color?: string;
}

export interface ChartSchema extends BaseSchema {
  type: 'lineChart' | 'barChart' | 'pieChart' | 'areaChart';
  dataSource?: string | unknown[];
  xKey?: string;
  series?: ChartSeriesSchema[];
  height?: number;
  legend?: boolean;
  tooltip?: boolean;
}

export type SDUISchema =
  | PageSchema
  | FormFieldSchema
  | TableSchema
  | ChartSchema
  | BaseSchema;

export interface ThemeConfig {
  mode?: 'light' | 'dark';
  primaryColor?: string;
  borderRadius?: number;
  token?: Record<string, unknown>;
}
