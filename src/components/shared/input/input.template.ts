// language=hbs
export const inputTemplate = `
	 {{#if label}}
			 <label for="{{name}}">
			 	{{{ label }}}
			 </label>
	 {{/if}}
	 <div class="input-wrapper">
		 {{{ input }}}
	 </div>
	 <div class="input-error">
		 {{error}}
	 </div>
`;

