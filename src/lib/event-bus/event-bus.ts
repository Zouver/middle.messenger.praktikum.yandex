import type {EventBusCallback, Listener} from "@lib/event-bus/types.ts";


export class EventBus {
	private readonly listeners: Listener ={};

	constructor() {
		this.listeners = {};
	}

	on(event: string, callback: EventBusCallback): void {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}

		this.listeners[event].push(callback);
	}

	off(event: string, callback: EventBusCallback): void {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}

		this.listeners[event] = this.listeners[event].filter(
			listener => listener !== callback
		);
	}

	emit(event: string, ...args: unknown[]): void {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}

		this.listeners[event].forEach(listener => {
			listener(...args);
		});
	}
}
