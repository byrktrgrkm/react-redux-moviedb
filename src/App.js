import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";



import './App.css';

import Header from './components/Header'
import Footer from './components/Footer'

import {routes} from './routes'

import { ThemeProvider ,createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { useSelector } from 'react-redux';


import {
    selectTheme
  } from './features/theme/ThemeSlice'

import i18next from './i18nextConf';
import { selectLanguage } from './features/language/LanguageSlice';



function App() {
  //const [mode] = React.useState('light');
  const mode = useSelector(selectTheme);

  const lang = useSelector(selectLanguage);
  i18next.changeLanguage(lang.toLowerCase());

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );


  return (
  
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
      <Header />

      
      <Routes>
        {
          routes.map(route =>(
            <Route key={route.path} path={route.path} element={route.element}  exact={route.exact}/>
          ))
        }
       
      </Routes>
    

      <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

