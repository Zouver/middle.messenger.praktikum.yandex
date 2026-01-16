// language=hbs
export const chatListTemplate = `
  <div id="chat-list-navigation">
	  {{#if createChat}}
		  {{{createChat}}}
	  {{/if}}
	  <a href="/profile">{{{ text }}}</a>
  </div>
  <div id="chat-list-search">
    {{{ search }}}
  </div>
  <hr/>
  <div id="chat-list-content">
    {{#each chats}}
	    {{#if @first }}{{else}}<hr/>{{/if}}
      {{{ this }}}
    {{/each}}
  </div>
`;

