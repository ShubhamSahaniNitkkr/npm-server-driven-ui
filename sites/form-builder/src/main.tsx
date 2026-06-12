import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { mergeRegistries, SDUIRenderer } from '@shubhamsunnynitkkr/server-driven-ui';
import { createAntdRegistry } from '@shubhamsunnynitkkr/server-driven-ui-antd';
import pageSchema from './schemas/page.json';

const registry = createAntdRegistry();

function App() {
  return (
    <ConfigProvider>
      <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
        <SDUIRenderer
          schema={pageSchema}
          registry={mergeRegistries(registry)}
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
