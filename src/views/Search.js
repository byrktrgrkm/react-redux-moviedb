import { Alert, Avatar, Button, Container, Grid, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
    Link,
  useLocation
} from "react-router-dom";


import {SearchUrl,ImageUrl_500} from '../api'
import MovieCard from "../components/MovieCard";


function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }



const Search = () =>{





    let query = useQuery();

    const [queryParam,setQueryParam] = useState(query.get('q'));
    const [value,setValue] = useState(query.get('q'));
    const [data,setData] = useState([]);

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

        <Container sx={{marginTop:'10px'}}>
            <Input placeholder="Film ara.." variant="outlined"  type="search" sx={{width:'100%'}} value={value} onChange={handle} onKeyDown={handleSubmit}/>
            <Button variant="outlined" sx={{float:'right',position:'fixed'}}>Ara</Button>
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
                                    
                   
                    <Grid item xs={2} md={3} key={item.id} >
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