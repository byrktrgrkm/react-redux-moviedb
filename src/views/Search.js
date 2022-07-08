import { Alert, Avatar, Button, Container, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
    Link,
  useLocation
} from "react-router-dom";


import {SearchUrl,ImageUrl_500} from '../api'
import MovieCard from "../components/MovieCard";
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from "react-i18next";

function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }



const Search = () =>{





    let query = useQuery();

    const [queryParam,setQueryParam] = useState(query.get('q'));
    const [value,setValue] = useState(query.get('q'));
    const [data,setData] = useState([]);


    const {t} = useTranslation();

    const handle = (e) => {
 
        setValue(e.target.value)
    }



    const handleSubmit = (e)=>{
        if(e.keyCode == 13){
            //entersa bu işlemleri yap 
            setQueryParam(value);
        }
    }




    useEffect(() =>{
        

        fetch(SearchUrl(queryParam))
        .then(response => response.json())
        .then(json => setData(json.results))

    },[queryParam])

    return (
        <>

         <Container container  style={{marginTop:'20px',marginBottom:'20px',textAlign:'center'}}>
            <FormControl sx={{width:'80%'}} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">{t('home_text_field')}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type="search"
                value={value} 
                onChange={handle} 
                onKeyDown={handleSubmit}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="search"
                    edge="end"
                    >
                        <SearchIcon />
                    </IconButton>
                </InputAdornment>
                }
                label="Password"
            />
            </FormControl>
        </Container>
        
       
        <Container style={{minHeight:'80vh'}}>

        {
            data.length == 0 &&
            <Alert severity="info">Film bulunmuyor</Alert>
        }   
        {
            
            data && 


            <Grid container >
            { 

                data.map(item => (
                                    
                   
                    <Grid item xs={6} md={3} key={item.id} >
                                <MovieCard {...item} />
                    </Grid>
                    
                ))
            
               /* data.map(item => (
                    
                        <ListItem>
                            <ListItemAvatar>
                        
                            <Avatar sx={{ width: 128, height: 128 }} src={ImageUrl_500(item.poster_path)} />
                            </ListItemAvatar>
                            <Link to={`/movie/${item.id}`} style={{textDecoration:'none',color:'inherit'}}>
                            <ListItemText primary={item.title} secondary={new Date(item.release_date).toLocaleDateString()}  sx={{marginLeft:'20px'}}/></Link>
                        </ListItem>
                        
                        
                ))*/
            }
         </Grid>
        }
        </Container>

        </>
    );
}


export default Search;