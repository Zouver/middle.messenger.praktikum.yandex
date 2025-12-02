// language=hbs
export const signupTemplate = `
  {{{ heading }}}
  <form class="auth-form">
    <div class="form-group">
      {{#each inputs}}
        {{{ this }}}
      {{/each}}
    </div>
    <div class="button-group">
      {{#each buttons}}
        {{{ this }}}
      {{/each}}
    </div>
  </form>
`;

