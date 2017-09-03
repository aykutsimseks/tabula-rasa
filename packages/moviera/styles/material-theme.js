import { fade } from 'material-ui/utils/colorManipulator';

const palette = {
  primary1Color: '#eee',

  textColor: '#000',
  secondaryTextColor: '#444',

  alternateTextColor: '#444',

  accent1Color: '#ff5E60',
  borderColor: '#ff5E60',
  focusBorderColor: '#ccc',
};

export default {
  fontFamily: 'Roboto, sans-serif',
  palette,
  dropDownMenu: {
    accentColor: palette.accent1Color,
    style: {
      color: palette.alternateTextColor,
    },
  },
  menuItem: {
    selectedTextColor: palette.primary1Color,
  },
  inkBar: {
    backgroundColor: palette.accent1Color,
  },
  textField: {
    floatingLabelColor: palette.secondaryTextColor,
    focusColor: palette.focusBorderColor,
  },
  tabs: {
    backgroundColor: palette.primary1Color,
    textColor: fade(palette.alternateTextColor, 0.4),
    selectedTextColor: palette.alternateTextColor,
  },
  svgIcon: {
    color: palette.alternateTextColor,
  },
};
