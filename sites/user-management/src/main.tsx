import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { mergeRegistries, SDUIRenderer } from '@shubhamsunnynitkkr/server-driven-ui';
import { createAntdRegistry } from '@shubhamsunnynitkkr/server-driven-ui-antd';
import pageSchema from './schemas/page.json';

const registry = createAntdRegistry();

const mockUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'user' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'user' },
  { id: 4, name: 'David Brown', email: 'david@example.com', role: 'admin' },
  { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'user' },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'user' },
];

function App() {
  return (
    <ConfigProvider>
      <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
        <SDUIRenderer
          schema={pageSchema}
          registry={mergeRegistries(registry)}
          context={{ users: mockUsers }}
          onSubmit={(state) => console.log('Form submitted:', state)}
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
