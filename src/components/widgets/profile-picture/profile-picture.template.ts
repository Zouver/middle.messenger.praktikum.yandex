// language=hbs
export const profilePictureTemplate = `
    <div class="profile-overlay">
        {{{ changeAvatarText }}}
    </div>
    {{#if avatar}}{{else}}<i class="fa-regular fa-image"></i>{{/if}}
    {{{ fileInput }}}
    {{#if submitButton}}{{{submitButton}}}{{/if}}
`;

