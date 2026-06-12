import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { mergeRegistries, SDUIRenderer } from '@shubhamsunnynitkkr/server-driven-ui';
import { createAntdRegistry } from '@shubhamsunnynitkkr/server-driven-ui-antd';
import pageSchema from './schemas/page.json';

const registry = createAntdRegistry();

const mockDeals = [
  { id: 1, company: 'Acme Corp', value: '$45,000', stage: 'Proposal' },
  { id: 2, company: 'Globex', value: '$120,000', stage: 'Negotiation' },
  { id: 3, company: 'Initech', value: '$28,500', stage: 'Closed Won' },
  { id: 4, company: 'Umbrella Co', value: '$67,000', stage: 'Discovery' },
  { id: 5, company: 'Stark Industries', value: '$250,000', stage: 'Proposal' },
];

const mockActivities = [
  { id: 1, title: 'Call with Acme Corp — follow up sent' },
  { id: 2, title: 'Globex deal moved to Negotiation' },
  { id: 3, title: 'New lead: Wayne Enterprises' },
  { id: 4, title: 'Initech contract signed' },
];

function App() {
  return (
    <ConfigProvider>
      <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
        <SDUIRenderer
          schema={pageSchema}
          registry={mergeRegistries(registry)}
          context={{ deals: mockDeals, activities: mockActivities }}
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
