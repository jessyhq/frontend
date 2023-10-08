/* @refresh reload */
// Packages:
import { render } from 'solid-js/web';
import { createGlobalStyles } from 'solid-styled-components'


// Components:
import App from './App'


// Styles:
const GlobalStyle = createGlobalStyles`
  body {
    margin: 0;
    overflow: hidden;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`

// Functions:
render(() => (
  <>
    <GlobalStyle />
    <App />
  </>
), document.getElementById('root') as HTMLElement)
