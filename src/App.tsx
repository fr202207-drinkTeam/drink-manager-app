import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MainRouter } from './router/MainRouter';
import { RecoilRoot } from 'recoil';

export const App = () => {
  const apptheme = createTheme({
    typography: {
      fontFamily: ['M PLUS 1p', 'sans-serif'].join(','),
    },
  });
  return (
    <RecoilRoot>
      <ThemeProvider theme={apptheme}>
        <BrowserRouter>
          <MainRouter />
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;
