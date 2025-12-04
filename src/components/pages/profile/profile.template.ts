// language=hbs
export const profilePageTemplate = `
    {{{ profileNav }}}
    <div class="profile-wrapper">
      <div class="profile-container">
        <div class="profile-header">
          {{{ profilePicture }}}
          {{{ heading }}}
        </div>
		      {{#if isChangePassword}}
              {{{ profilePasswordChange }}}
		      {{else}}
              {{{ profileInformations }}}
              {{#if isDefaultState}}
                  {{{ profileActions }}}
              {{/if}}
          {{/if}}
      </div>
    </div>
`;

