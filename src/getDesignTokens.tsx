import {PaletteMode} from "@mui/material";
import {amber, grey} from "@mui/material/colors";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      ...amber,
      ...(mode === 'dark' && {
        main: "#53C2B1",
      }),
    },
    ...(mode === 'dark' && {
      background: {
        default: "#09091A",
        paper: "#181A1B",
      },
    }),
    text: {
      ...(mode === 'light'
        ? {
          primary: grey[900],
          secondary: grey[800],
        }
        : {
          primary: '#fff',
          secondary: grey[500],
        }),
    },
  },
});