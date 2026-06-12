import React, { useMemo } from 'react';
import { resolveDataSource } from '@shubhamsunnynitkkr/server-driven-ui';
interface ChartSeriesSchema {
  key: string;
  label?: string;
  color?: string;
}
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface ChartAdapterProps {
  schema: Record<string, unknown>;
  sduiContext?: { runtimeContext?: Record<string, unknown> };
  className?: string;
  style?: Record<string, string | number>;
}

const COLORS = ['#1677ff', '#52c41a', '#faad14', '#ff4d4f', '#722ed1'];

function useChartData(schema: Record<string, unknown>, sduiContext?: ChartAdapterProps['sduiContext']) {
  return useMemo(() => {
    const ctx = { ...(sduiContext?.runtimeContext ?? {}) };
    return resolveDataSource(schema.dataSource as string | unknown[], ctx) as Record<string, unknown>[];
  }, [schema.dataSource, sduiContext?.runtimeContext]);
}

export const LineChartAdapter = React.memo(function LineChartAdapter({
  schema,
  sduiContext,
  className,
  style,
}: ChartAdapterProps) {
  const data = useChartData(schema, sduiContext);
  const xKey = (schema.xKey as string) ?? 'name';
  const series = (schema.series as ChartSeriesSchema[]) ?? [];
  const height = (schema.height as number) ?? 300;

  return (
    <div className={className} style={style}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          {(schema.tooltip as boolean) !== false && <Tooltip />}
          {(schema.legend as boolean) && <Legend />}
          {series.map((s, index) => (
            <Line key={s.key} type="monotone" dataKey={s.key} name={s.label ?? s.key} stroke={s.color ?? COLORS[index % COLORS.length]} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});

export const BarChartAdapter = React.memo(function BarChartAdapter({
  schema,
  sduiContext,
  className,
  style,
}: ChartAdapterProps) {
  const data = useChartData(schema, sduiContext);
  const xKey = (schema.xKey as string) ?? 'name';
  const series = (schema.series as ChartSeriesSchema[]) ?? [];
  const height = (schema.height as number) ?? 300;

  return (
    <div className={className} style={style}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          {(schema.tooltip as boolean) !== false && <Tooltip />}
          {(schema.legend as boolean) && <Legend />}
          {series.map((s, index) => (
            <Bar key={s.key} dataKey={s.key} name={s.label ?? s.key} fill={s.color ?? COLORS[index % COLORS.length]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

export const PieChartAdapter = React.memo(function PieChartAdapter({
  schema,
  sduiContext,
  className,
  style,
}: ChartAdapterProps) {
  const data = useChartData(schema, sduiContext);
  const nameKey = (schema.nameKey as string) ?? (schema.xKey as string) ?? 'name';
  const valueKey = (schema.valueKey as string) ?? 'value';
  const height = (schema.height as number) ?? 300;

  return (
    <div className={className} style={style}>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie data={data} dataKey={valueKey} nameKey={nameKey} cx="50%" cy="50%" outerRadius={100} label>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          {(schema.tooltip as boolean) !== false && <Tooltip />}
          {(schema.legend as boolean) && <Legend />}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
});

export const AreaChartAdapter = React.memo(function AreaChartAdapter({
  schema,
  sduiContext,
  className,
  style,
}: ChartAdapterProps) {
  const data = useChartData(schema, sduiContext);
  const xKey = (schema.xKey as string) ?? 'name';
  const series = (schema.series as ChartSeriesSchema[]) ?? [];
  const height = (schema.height as number) ?? 300;

  return (
    <div className={className} style={style}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          {(schema.tooltip as boolean) !== false && <Tooltip />}
          {(schema.legend as boolean) && <Legend />}
          {series.map((s, index) => (
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label ?? s.key}
              stroke={s.color ?? COLORS[index % COLORS.length]}
              fill={s.color ?? COLORS[index % COLORS.length]}
              fillOpacity={0.3}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});
