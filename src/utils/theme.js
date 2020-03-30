import 'typeface-lato';
import { createMuiTheme } from '@material-ui/core/styles';

const CustomThemeObject = {
  typography: {
    fontFamily: '"Lato"',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  palette: {
    primary: {
      light: '#3492ca',
      main: '#0277bd',
      dark: '#015384',
    },
    secondary: {
      light: '#fbcc57',
      main: '#fbc02d',
      dark: '#af861f',
    },
  },
};

const CustomTheme = createMuiTheme(CustomThemeObject);

export default CustomTheme;
