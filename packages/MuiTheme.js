import { cyan500, grey100, grey300, grey500, lightBlack, darkBlack, white } from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import Spacing from 'material-ui/styles/spacing';

const primaryColor = '#00A86B';

export default {
  spacing: Spacing,
  fontFamily: 'ProximaNova, Helvetica, Verdana, sans-serif',
  fontSize: 5,
  palette: {
    primary1Color: primaryColor,
    primary2Color: cyan500,
    primary3Color: lightBlack,
    accent1Color: '#ff8d2f',
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
  },
};
