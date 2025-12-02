// language=hbs
export const messageTemplate = `
  <div class="content">
    {{#if message}}
      {{{ message }}}
    {{/if}}
    {{#if picture}}
      <img src="{{picture}}" alt="{{picture}}"/>
    {{/if}}
    <div class="more">
      {{#if statusIcon}}
        <i class="statusIcon fa-solid {{statusIcon}}"></i>
      {{/if}}
      {{{ time }}}
    </div>
  </div>
`;

