// language=hbs
export const chatListTemplate = `
  <div id="chat-list-navigation">
    {{{ text }}}
  </div>
  <div id="chat-list-search">
    {{{ search }}}
  </div>
  <div id="chat-list-content">
    {{#each chats}}
      <hr />
      {{{ this }}}
    {{/each}}
  </div>
`;

