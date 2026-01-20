// language=hbs
export const chatTemplate = `
  <header id="selected-chat-header">
	  <div id="selected-chat-header-left-side">
		  <div id="selected-chat-avatar"></div>
		  {{{ title }}}
	  </div>
	  <div id="selected-chat-header-right-side">
		  {{{ deleteUserButton }}}
		  {{{ addUserButton }}}
		</div>

  </header>
  <hr/>
  <main id="selected-chat-content">
    {{#each messages}}
      {{{ this }}}
    {{/each}}
  </main>
  <hr />
  {{{chatPanel}}}
`;

