import {Component} from "@lib/component/component.ts";

export const isComponent = (value: unknown): value is Component => {
	return value instanceof Component;
};

export const isArrayComponent = (value: unknown): value is Component[] => {
	return Array.isArray(value) && value.length > 0 && value[0] instanceof Component;
};
