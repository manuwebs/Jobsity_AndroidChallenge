import { StyleSheet } from 'react-native';

export const AppColors = {
  white: '#FFFFFF',
  black: '#322d2b',
  gray: '#f0efef',
  noFill: 'transparent',
  primary: '#f3c6bf',
  secondary: '#3f8a89',
  secondaryDark: '#387b7a',
  accent: '#a56f67',
};

const margin = 10;

export const AppStyles = StyleSheet.create({
  borderRadius: {
    borderRadius: 15,
  },
  heading1: {
    fontSize: 30,
  },
  alignCenter: {
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.secondary,
  },
  textCenter: {
    textAlign: 'center',
  },
  textJustify: {
    textAlign: 'justify',
  },
  textRight: {
    textAlign: 'right',
  },
  bold: {
    fontWeight: 'bold',
  },
  marginHorizontal: {
    marginHorizontal: margin,
  },
  marginVertical: {
    marginVertical: margin,
  },
  marginBottom: {
    marginBottom: margin,
  },
  marginTop: {
    marginTop: margin,
  },
  marginLeft: {
    marginLeft: margin,
  },
  marginRight: {
    marginRight: margin,
  },
  margin: {
    margin: margin,
  },
});
