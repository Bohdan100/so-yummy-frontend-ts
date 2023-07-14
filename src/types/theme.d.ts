import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    breakpoints: Array<string>;
    colors: {
      mainDark: string;
      secondaryDark: string;
      mainBlack: string;
      mainWhite: string;
      mainGrey: string;
      hoverBgBtn: string;
      secondaryGrey: string;
      disabledGrey: string;
      mainLight?: string;
      mainAccent: string;
      secondaryAccent: string;
      mainNavLinkHover?: string;
      mainHeaderText: string;
      mainBtnCategoryText: string;
      mainBtnCategoryTextHover?: string;
      mainBtnText: string;
      mainBTn: string;
      mainBtnCategory?: string;
      mainBtnCategoryHover?: string;
      mainBtnBGCategory: string;
      mainBtnBGHover?: string;
      mainBtnInput: string;
      bodyBg: string;
      footerBg: string;
      footerSMlinks: string;
      footerSMlinksHover: string;
      footerSMlinksHoverAddRecipePge: string;
      footerBtnBg: string;
      footerCopyRight: string;
      mainBg: string;
      btnTextLight: string;
      sectionHeader: string;
      deleteBtnBg: string;
      deleteBtnRecipe: string;
      recipeBlockBtnBg: string;
      recipeBlockBg: string;
      paginationBg: string;
      paginationText: string;
      aboutRecipe: string;
      mainSearchInput?: string;
      paginationShadow: string;
      userName: string;
      searchSelectBg: string;
      searchSelectText: string;
      searchDropDownBg?: string;
      tooltipbg: string;
      ingredientsBgrCol: string;
      mainSerchHoverText?: string;
      searchFormHoverBtn?: string;
      mainGreyBg: string;
      secondaryGreyBg: string;
      btnHoverBg: string;
      btnHoverText: string;
      iconHover: string;
      switchBg: string;
      burgerRecipeBtn: string;
      formBgCol: string;
      inputPh: string;
      logOutBtnBg: string;
      logOutBtnHoverBg: string;
      logOutBtnHoverText: string;
      cancelBtnHoverText: string;
      titleFooter: string;
      navLinkFooter: string;
      navLinkFooterHover: string;
      subscribeInputText: string;
      iconDlt: string;
      placeholderTextAddRecipe: string;
      inputTextAddRecipe: string;
      scrollbar: string;
      activeOptionInSelect: string;
      selectBg: string;
      btnDecrease: string;
      amountIngr: string;
      bgIngridientAddRecipe: string;
      inputIngText: string;
      descriptionPopularRecipeText: string;
      addBtnHoverBg: string;
      addBtnHoverText: string;
      errMsgText: string;
    };

    fonts: {
      main: string;
    };
    fontWeights: Array<number>;
    lineHeights: {
      subheader: string;
      content: string;
      extraContent: string;
      btnText: string;
      description: string;
      time: string;
      headerLinks: string;
      userLink: string;
      searchSelect: string;
    };
    letterSpacings: {
      subheader: string;
      content: string;
    };

    borders: {
      btnStandart: string;
      btnHover: string;
      mainSearchInput: string;
      searchInput: string;
      mainNavBord: string;
      inputStandart: string;
      inputAddRecipeForm: string;
      countBtns: string;
      popularRecipe: string;
      inputAddRecipe: string;
      productListBorder: string;
    };
    radii: {
      btnStandart: string;
      btnIcon: string;
      logo: string;
      image: string;
      switch: string;
      pagination: string;
      modal: string;
      circle: string;
      form: string;
    };
    transitions: {
      main: string;
    };
  }

  export interface DefaultDarkTheme extends Omit<DefaultTheme, 'colors'> {}
}
