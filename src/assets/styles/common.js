import { css } from 'styled-components';

export default css`

  *,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }

  /* apply a natural box layout model to all elements, but allowing components to change */
  html {
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html {
    font-family: 'Raleway', sans-serif;
    font-size: 16px;
    line-height: 1.2;
    color: var(--color-font-primary);
    text-rendering: optimizeLegibility;
  }

  body {
    min-height: 100vh;
    overflow-y: scroll;
    background: #8C11BE;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
  }

  a {
    text-decoration: none;
    color: var(--color-link-text);
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }
`;
