import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { mergeRegistries, SDUIRenderer } from '@shubhamsunnynitkkr/server-driven-ui';
import { createAntdRegistry } from '@shubhamsunnynitkkr/server-driven-ui-antd';
import { withCharts } from '@shubhamsunnynitkkr/server-driven-ui-charts';
import pageSchema from './schemas/page.json';

const registry = withCharts(createAntdRegistry());

const mockContext = {
  monthlyRevenue: [
    { month: 'Jan', revenue: 42000 },
    { month: 'Feb', revenue: 48000 },
    { month: 'Mar', revenue: 51000 },
    { month: 'Apr', revenue: 55000 },
    { month: 'May', revenue: 62000 },
    { month: 'Jun', revenue: 68000 },
  ],
  trafficSources: [
    { source: 'Organic', value: 45 },
    { source: 'Paid', value: 25 },
    { source: 'Social', value: 18 },
    { source: 'Referral', value: 12 },
  ],
  monthlyUsers: [
    { month: 'Jan', users: 1200 },
    { month: 'Feb', users: 1450 },
    { month: 'Mar', users: 1680 },
    { month: 'Apr', users: 1920 },
    { month: 'May', users: 2100 },
    { month: 'Jun', users: 2350 },
  ],
  growth: [
    { month: 'Jan', growth: 5 },
    { month: 'Feb', growth: 8 },
    { month: 'Mar', growth: 12 },
    { month: 'Apr', growth: 15 },
    { month: 'May', growth: 18 },
    { month: 'Jun', growth: 22 },
  ],
};

function App() {
  return (
    <ConfigProvider>
      <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
        <SDUIRenderer
          schema={pageSchema}
          registry={mergeRegistries(registry)}
          context={mockContext}
        />
      </div>
    </ConfigProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
