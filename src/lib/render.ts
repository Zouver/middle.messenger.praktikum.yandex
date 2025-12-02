import {Component} from "@lib/component";

export function render(query: string, component: Component) {
	const root = document.querySelector(query);

	if(!root) {
		throw new Error(`${query} not found`);
	}

	root.appendChild(component.getContent());
	component.dispatchComponentDidMount();
	return root;
}
