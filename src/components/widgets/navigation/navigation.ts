
import {Component} from "@/lib/component";

import {navigationTemplate} from "./navigation.template.ts";

import type {NavigationProps} from "./navigation.props.ts";

import './navigation.css';

export class Navigation extends Component<NavigationProps> {
	constructor(props: NavigationProps) {
		super(
			"nav",
			props,
			["main-menu"]
		);
	}

	render() {
		return this.compile(navigationTemplate, this.props);
	}
}

