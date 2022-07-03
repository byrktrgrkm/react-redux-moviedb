import { Button, FormControlLabel, Grid, Switch, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useSelector, useDispatch } from 'react-redux';
import {
    switchTheme,
    selectTheme
  } from '../features/theme/ThemeSlice'
  import { styled } from '@mui/material/styles';
  import Paper from '@mui/material/Paper';
  import GitHubIcon from '@mui/icons-material/GitHub';
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { selectLanguage } from "../features/language/LanguageSlice";

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));

const Footer = () =>{
    const theme = useSelector(selectTheme);
    const language = useSelector(selectLanguage);

    const dispatch = useDispatch();

    const handleChange = (event) => {
        dispatch(switchTheme(theme == 'dark' ? 'light' : 'dark'))
    };

    const {t} = useTranslation()
    return (
        <footer style={{padding:'16px'}}>
            <Container>
           
            <Grid container spacing={2}>
                <Grid item xs={6} md={4}>
                    <Item>
                  

                        <nav>
                            <li><NavLink  style={{color:'inherit',textDecoration:'none'}}  to={`/populer`}>
                                { t('popular') }
                                </NavLink></li>
                                <li><NavLink style={{color:'inherit',textDecoration:'none'}}   to={`/gosterimdekiler`}>
                                { t('on_vision') }
                                </NavLink></li>
                                <li><NavLink style={{color:'inherit',textDecoration:'none'}}   to={`/yakinda`}>
                                { t('movie_soon') }
                                </NavLink></li>
                                <li><NavLink style={{color:'inherit',textDecoration:'none'}}   to={`/populer-tv`}>
                                { t('tv_series') }
                                </NavLink></li>
                        </nav>
                       
                    </Item>
                </Grid>
                <Grid item xs={6} md={4}>

                    
                    <Item>

                    <Grid item>

                    
                        <Item>

                        <nav>
                            <li><NavLink style={{color:'inherit',textDecoration:'none'}}   to={`/yer-imleri`}>
                            {t('menu_bookmark')}
                                </NavLink>
                                
                                </li>
                        </nav>
                        </Item>

                    </Grid>
                    
                    <Grid item>

                    
                        <Item>
                        <nav>
                            <li>{t('footer_theme_language')}: {language}</li>
                            <li>{t('footer_theme_mode')}: {theme}</li>
                        </nav>

                        </Item>

                    </Grid>




                       
                    </Item>
                    
                </Grid>
                <Grid item xs={12} md={4}>
                    <Item>

                        <nav>
                            <li><a style={{textDecoration:'none',color:'inherit'}} href="https://github.com/byrktrgrkm/react-redux-moviedb" target="_blank">Github</a></li>
                        </nav>
                    </Item>
                </Grid>
                
               
              
            </Grid>

            </Container>

            <div style={{textAlign:'center',padding:'16px'}}>
                Powered by : React&Redux
            </div>
        </footer>
    );
}


export default Footer;