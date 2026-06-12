import { createRegistry, mergeRegistries, type ComponentRegistry, type SDUIComponent } from '@shubhamsunnynitkkr/server-driven-ui';
import {
  AreaChartAdapter,
  BarChartAdapter,
  LineChartAdapter,
  PieChartAdapter,
} from './components/Charts';

export type ChartComponentType = 'lineChart' | 'barChart' | 'pieChart' | 'areaChart';

const CHART_MAP: Record<ChartComponentType, SDUIComponent> = {
  lineChart: LineChartAdapter as unknown as SDUIComponent,
  barChart: BarChartAdapter as unknown as SDUIComponent,
  pieChart: PieChartAdapter as unknown as SDUIComponent,
  areaChart: AreaChartAdapter as unknown as SDUIComponent,
};

export interface CreateChartsRegistryOptions {
  include?: ChartComponentType[];
}

export function createChartsRegistry(options?: CreateChartsRegistryOptions): ComponentRegistry {
  const include = options?.include ?? (Object.keys(CHART_MAP) as ChartComponentType[]);
  const initial: Record<string, SDUIComponent> = {};
  for (const type of include) {
    initial[type] = CHART_MAP[type];
  }
  return createRegistry(initial);
}

export function withCharts(baseRegistry: ComponentRegistry, options?: CreateChartsRegistryOptions): ComponentRegistry {
  return mergeRegistries(baseRegistry, createChartsRegistry(options));
}

export const chartComponents = CHART_MAP;
