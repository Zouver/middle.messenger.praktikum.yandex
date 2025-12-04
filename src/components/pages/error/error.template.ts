// language=hbs
export const errorPageTemplate = `
    <div class="error-content">
      {{{ errorCode }}}
      {{{ errorContent }}}
    </div>
    <a href="/">{{{ backButton }}}</a>
`;

