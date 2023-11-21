import { createTheme, adaptV4Theme } from "@mui/material/styles";

import { deepPurple, pink, lightGreen } from '@mui/material/colors';

export default createTheme(adaptV4Theme({
    palette: {
        primary: {
            main: "#84349D",
        },
        secondary: {
            main: "#C25BBC",
        },
        type: "dark",
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