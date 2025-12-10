// language=hbs
export const keyValueListTemplate = `
    {{#each items}}
      {{{ this }}}
      {{#if @last}}{{else}}<hr/>{{/if}}
    {{/each}}
`;

