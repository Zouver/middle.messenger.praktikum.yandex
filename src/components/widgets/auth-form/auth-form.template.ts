// language=hbs
export const authFormTemplate = `
    <div class="form-group">
      {{#each inputs}}
        {{{ this }}}
      {{/each}}
	    {{#if error}}{{{ error }}}{{/if}}
    </div>
    <div class="button-group">
      {{#each buttons}}
        {{{ this }}}
      {{/each}}
    </div>
`;

