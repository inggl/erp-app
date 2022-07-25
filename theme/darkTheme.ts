import {createTheme} from "@mui/material/styles";

let darkTheme = createTheme({
    palette: {
        background: {
            default: "#1e1e1f"
        },
        mode: "dark"
    }
});

darkTheme = createTheme(darkTheme, {
    components: {
        MuiTablePagination: {
            styleOverrides: {
                root: {
                    position: 'sticky',
                    bottom: 0,
                    backgroundColor: darkTheme.palette.background.default
                }
            }
        }
    }
});

export {darkTheme}