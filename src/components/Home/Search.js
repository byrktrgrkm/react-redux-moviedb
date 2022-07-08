import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import {Fragment} from 'react';

import '../../css/Search.component.css';  

import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';


import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

const ImagePropeties = {
    backgroundImage:`url('https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/5GISMqlRXMEyBrgEqyvhaMMuQmJ.jpg')`,
    backgroundSize:'contain',
    backgroundRepeat:'no-repeat',
    backgroundSize:'100% 100%',
     
}

const SearchField = styled('div')(({ theme }) => ({
    
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    color:'white',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width:'100%',
    '& .MuiInputBase-input': {
        width:'100%',
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
    },
  }));
  


const Search = () =>{
  const { t } = useTranslation();
    const navigate = useNavigate();
    const Handle = (e) =>{
        if(e.charCode == 13){
            navigate('/search?q='+e.target.value);
        }
    }

    return (
        <Fragment>
            <CssBaseline />
            <Container style={ImagePropeties} >
                <Box sx={{ bgcolor: '',height:'300px' ,display:'flex',justifyContent:'center',flexDirection:'column'}}  >
             
                <h1 class="hosgeldin">{t('home_welcome')}</h1>
                <h2 class="hosgeldin-2">{t('home_subtitle')}</h2> 
                <SearchField>
                    <SearchIconWrapper>
                    <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                    placeholder={t('home_text_field')}
                    inputProps={{ 'aria-label': 'search' }}
                    onKeyPress={Handle}
                    />
                </SearchField>
             
        
                </Box>
            </Container>
        </Fragment>
    );
}


export default Search;