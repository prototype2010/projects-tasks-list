import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const PRIMARY_COLOR = '#3f67a7';
const SECONDARY_COLOR = '#F50057';

export const classNamesGenerator = createGenerateClassName({});

const colors = {
  primary: PRIMARY_COLOR,
  secondary: SECONDARY_COLOR,
  white: '#FFF',
  background: {
    grey: '#e1e1e1',
    lime: '#99C31C',
  },
  border: {
    greyLight: '#E0E0E0',
    greyDark: '#9E9E9E',
  },
  text: {
    greyLight: '#969696',
    grey: '#666666',
    greenDark: '#374807',
    error: '#f44336',
  },
};

const dimensions = {
  pagePadding: 10,
};

const breakpoints = {
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};
const media = (direction: 'up' | 'down') =>
  (Object.keys(breakpoints) as (keyof typeof breakpoints)[]).reduce((acc, label) => {
    acc[label] = `@media (${direction === 'down' ? 'max' : 'min'}-width: ${breakpoints[label]}px)`;
    return acc;
  }, {} as { [K in keyof typeof breakpoints]: string });
const theme = {
  breakpoints,
  media: {
    up: media('up'),
    down: media('down'),
  },
  palette: {
    divider: 'red',
  },
  dimensions,
  colors,
};

export type MaterialTheme = Theme & { colors: typeof colors; dimensions: typeof dimensions };

const materialTheme = createMuiTheme(
  {
    palette: {
      primary: {
        main: PRIMARY_COLOR,
      },
      secondary: {
        main: SECONDARY_COLOR,
      },
    },
  },
  { dimensions, colors },
) as MaterialTheme;

const GlobalStyles = createGlobalStyle<{ theme: typeof theme }>`
  ${normalize}
  
  body, html {
    margin: 0;
    background: rgb(211,207,167);
    background: linear-gradient(177deg, rgba(211,207,167,1) 0%, rgba(210,183,91,1) 47%, rgba(196,115,12,1) 100%);
  }
  
  #root > * {
    min-height: calc(100vh - 10px);
    background: rgb(211,207,167);
    background: linear-gradient(177deg, rgba(211,207,167,1) 0%, rgba(210,183,91,1) 47%, rgba(196,115,12,1) 100%);
    padding-bottom: 50px;
  }
  
  #root {
    width: 100%;
    overflow: hidden;
    background: #f2f2f2;
    height: 100%;
    position: relative;
    
    background: rgb(211,207,167);
    background: linear-gradient(177deg, rgba(211,207,167,1) 0%, rgba(210,183,91,1) 47%, rgba(196,115,12,1) 100%);
  }
  
   body * {
    font-family: "Helvetica", "Arial", sans-serif;
    margin: 0;
    padding: 0;
    outline: 0;
    border: 0;
    box-sizing: border-box;
  }
​
  h1 {
    font-size: 2.5em;
    margin: 0 0 30px 0;
  }
​
  h2 {
    font-size: 2em;
    margin-bottom: 25px;
  }
​
  h3 {
    font-size: 1.5em;
    margin-bottom: 15px;
  }
​
  h4 {
    font-size: 1.2em;
    margin-bottom: 10px;
  }
​
  h5 {
    font-size: 1.1em;
    margin-bottom: 10px;
  }
​
  h6 {
    font-size: 1em;
    font-weight: normal;
    margin-bottom: 10px;
  }
​
  p {
    line-height: 20px;
    letter-spacing: 0.03em;
    margin-bottom: 8px;
  }
​
  input[type='search']::-webkit-search-decoration,
  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-results-button,
  input[type='search']::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }
  
  button {
    background: none;
  }
​
  body {
    margin: 0;
  }
​
  code {}
`;
export default theme;
export { GlobalStyles, materialTheme };
