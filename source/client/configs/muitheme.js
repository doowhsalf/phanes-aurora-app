import { createTheme, adaptV4Theme } from "@mui/material/styles";

import { deepPurple, pink } from '@mui/material/colors';

export default createTheme(adaptV4Theme({
  palette: {
    primary: deepPurple,
    secondary: {
      main: "#ff4081",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  // appBar: {
  //   //height: 50,
  //   textColor: Colors.white,
  //   backgroundColor: Colors.app_primary1Color
  // },
  // toolbar: {
  //   //height: 50,
  //   backgroundColor: Colors.app_primary1Color,
  //   textColor: Colors.fullWhite,
  //   color: Colors.white,
  //   iconColor: Colors.app_icons,
  //   separatorColor: Colors.app_divider
  // },
  // tableRow: {
  //   hoverColor: Colors.app_hoverColor
  // },
  // overrides: {
  //   MuiTablePagination: {
  //     spacer: {
  //       flex: '0 1 auto'
  //     }
  //   }
  // }
}));
