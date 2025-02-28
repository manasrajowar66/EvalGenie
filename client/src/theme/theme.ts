import { createTheme } from '@mui/material/styles';

export const difficultyLevelColor: { [key: string]: string } = {
  Easy: "#4CAF50",
  Medium: "#FF9800",
  Hard: "#F44336",
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#0f87ff',
    },
    secondary: {
      main: '#d32f2f',
    },
    background: {
      default: '#f5f5f5',
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
    },
    body1: {
      fontSize: '1rem',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0.625rem',
          textTransform: "none"
        },
      },
    },
    MuiDialog:{
        styleOverrides:{
            paper:{
                borderRadius: "0.875rem",
                padding: "2.62rem"
            }
        }
    }
  },
});

export default theme;
