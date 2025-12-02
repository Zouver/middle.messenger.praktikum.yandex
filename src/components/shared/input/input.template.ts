// language=hbs
export const inputTemplate = `
	 {{#if label}}
			 <label for="{{name}}">
			 	{{{ label }}}
			 </label>
	 {{/if}}
  <input 
		id="{{name}}" 
		name="{{name}}" 
		type="{{type}}" 
		value="{{value}}" 
		placeholder="{{placeholder}}"
	/>
`;

