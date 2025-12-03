// language=hbs
export const inputTemplate = `
	 {{#if label}}
			 <label for="{{name}}">
			 	{{{ label }}}
			 </label>
	 {{/if}}
	{{{ input }}}
	{{error}}
`;

