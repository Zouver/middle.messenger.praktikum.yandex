// language=hbs
export const navigationTemplate = `
  <ul>
    {{#each pages}}
      <li><a href="{{url}}">{{title}}</a></li>
    {{/each}}
  </ul>
`;

