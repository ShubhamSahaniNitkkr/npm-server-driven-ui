import type { SDUISchema } from '../schema/types';

export interface FallbackProps {
  schema: SDUISchema;
  type: string;
}

export function FallbackComponent({ type }: FallbackProps) {
  if (import.meta.env?.PROD) return null;
  return (
    <div
      style={{
        padding: 8,
        border: '1px dashed #faad14',
        borderRadius: 4,
        color: '#ad6800',
        fontSize: 12,
      }}
      data-sdui-fallback={type}
    >
      Unknown component: <strong>{type}</strong>
    </div>
  );
}
