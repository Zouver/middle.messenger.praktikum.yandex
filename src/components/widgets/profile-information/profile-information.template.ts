//language=hbs
export const profileInformationTemplate = `
    {{{ informations }}}
    {{# if error }}{{{error}}}{{/if}}
    {{# if isChange }}
        {{{ submitButton }}}
    {{/if}}
`;
