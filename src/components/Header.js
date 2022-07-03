import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';

import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import { useState}  from 'react';

import { NavLink } from 'react-router-dom';
import { FormControl, FormControlLabel, InputLabel, Select, Switch } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import GitHubIcon from '@mui/icons-material/GitHub';

import { useSelector, useDispatch } from 'react-redux';
import {
    switchTheme,
    selectTheme
  } from '../features/theme/ThemeSlice'

  import {
    switchLanguage,
    selectLanguage,
    languages
  } from '../features/language/LanguageSlice'
import styled from '@emotion/styled';
import { API } from '../api';


import { useTranslation } from 'react-i18next';

import LeftMenu from './LeftMenu';

import i18next from "i18next";

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));

const Header = () =>{

    const { t } = useTranslation();

    
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [leftMenu,setLeftMenu] = useState(false)
  
    const handleOpenNavMenu = (event) => {
  
      setLeftMenu(true)
    };

  
    const handleCloseNavMenu = () => {
    };

    const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const theme = useSelector(selectTheme);

  const language = useSelector(selectLanguage);

  API.skeleton(language)

  
  const dispatch = useDispatch();

  const handleChange = (_event) => {
      dispatch(switchTheme(theme == 'dark' ? 'light' : 'dark'))
  };

  const onChangeLanguage = (_event,value) =>{
    i18next.changeLanguage(value.props.value.toLowerCase());
    dispatch(switchLanguage(value.props.value))
  }



  const leftMenuHandle = (open) =>{
    setLeftMenu(open)
  }

    return (

        <header>
            <AppBar position="static">
                <Container >
                    <Toolbar disableGutters>   
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        FİLMDB
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                        >
                        <MenuIcon />
                        </IconButton>
                        <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                        >
                      
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        

                        
                        <Button
                                sx={{ my: 2, color: 'inherit', display: 'block' }}
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                            {t('menu_movies')} 
                        </Button>

                        <Button
                                sx={{ my: 2, color: 'white', display: 'flex' }}
        
                                startIcon={<BookmarkBorderIcon/>}
                            > 
                           <NavLink  style={{color:'inherit',textDecoration:'none'}}  to={`/yer-imleri`}>
                                { t('menu_bookmark') }
                          </NavLink>
                        </Button>


                        <Button
                            startIcon={  <GitHubIcon />}
                                sx={{ my: 2, color: 'white', display: 'flex' }}
                            >
                              <a  style={{color:'inherit',textDecoration:'none'}}  target="_blank" href={`https://github.com/byrktrgrkm/react-redux-moviedb`}>
                              Github
                          </a>
                           
                          
                        </Button>
                        <Menu
                            
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                        >
                        <MenuItem onClick={handleClose}>
                                <NavLink  style={{color:'inherit',textDecoration:'none'}}  to={`/populer`}>
                                { t('popular') }
                                </NavLink>
                            </MenuItem>
                            <MenuItem   onClick={handleClose}>
                                <NavLink style={{color:'inherit',textDecoration:'none'}}   to={`/gosterimdekiler`}>
                                { t('on_vision') }
                                </NavLink>
                            </MenuItem>
                            <MenuItem  onClick={handleClose}>
                                <NavLink style={{color:'inherit',textDecoration:'none'}}   to={`/yakinda`}>
                                { t('movie_soon') }
                                </NavLink>
                            </MenuItem>
                            <MenuItem  onClick={handleClose}>
                                <NavLink style={{color:'inherit',textDecoration:'none'}}   to={`/populer-tv`}>
                                { t('tv_series') }
                                </NavLink>
                            </MenuItem>

                            

                        </Menu>
                       

                    </Box>

                 
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                              
                    </Typography>
                

                <FormControlLabel
                        control={<MaterialUISwitch sx={{ m: 1 }} checked={theme == 'dark'}
                        onChange={handleChange} defaultChecked  />}
                        label={theme == 'dark' ? t('theme_dark_mode') : t('theme_light_mode')}
                    />

               
                <FormControl variant="filled" sx={{ m: 1, minWidth: 80 }} >
                  <InputLabel id="demo-simple-select-label">{t('input_language')}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label={t('language')}
                        defaultValue={language}
                        onChange={onChangeLanguage} 

                    >
                        {
                            languages.map(lan =><MenuItem value={lan}>{lan.toUpperCase()}</MenuItem> )
                        }
                        
                    </Select>
                </FormControl>

                </Toolbar>
                </Container>
                </AppBar>
           
            <LeftMenu open={leftMenu} setOpen={leftMenuHandle}/>     
        </header>
    );
}


export default Header;