// language=hbs
export const chatTemplate = `
  <header id="selected-chat-header">
    <div id="selected-chat-avatar"></div>
    {{{ title }}}
  </header>
  <hr/>
  <main id="selected-chat-content">
    {{#each messages}}
      {{{ this }}}
    {{/each}}
  </main>
  <hr />
  {{{selectedChatPanel}}}
`;

