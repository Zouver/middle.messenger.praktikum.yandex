export type EventBusCallback = (...args: unknown[]) => void
export type Listener = Record<string, EventBusCallback[]>
