import {createTheme} from "@mui/material/styles";

let lightTheme = createTheme({
    palette: {
        background: {
            default: "#fafbfc"
        },
        mode: "light",
    },
});

lightTheme = createTheme(lightTheme, {
    components: {
        MuiTablePagination: {
            styleOverrides: {
                root: {
                    position: 'sticky',
                    bottom: 0,
                    backgroundColor: lightTheme.palette.background.default
                }
            }
        }
    }
});

export {lightTheme}