import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      mainColor: string;
      subColor: string;
      noteColor: string;
      noteBlockColor: string;
      messageColor: string;
      borderColor: string;
      successColor: string;
      failColor: string;
      activeColor: string;
      placeholderColor: string;
      savingColor: string;
      focusColor: string;
      hoverColor: string;
      dropColor: string;
      shadowColor: string;
      redColor: string;
      blackColor: string;
      whiteColor: string;
    };

    fontSize: {
      xxxSmall: string;
      xxSmall: string;
      xSmall: string;
      small: string;
      medium: string;
      large: string;
      xLarge: string;
      xxLarge: string;
      xxxLarge: string;
      xxxxLarge: string;
      title: string;
    };

    fontWeight: {
      extraLight: string;
      light: string;
      normal: string;
      medium: string;
      semiBold: string;
      bold: string;
      extraBold: string;
      title: string;
    };
  }
}
