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

import { Provider,useSelector } from 'react-redux';
import { store } from './app/store';

import {
    selectTheme
  } from './features/theme/ThemeSlice'

function App() {
  //const [mode] = React.useState('light');
  const mode = useSelector(selectTheme);
  console.log(mode)

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
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;

