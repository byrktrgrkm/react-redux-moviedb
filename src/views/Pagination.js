import { Grid, Pagination, Typography,Container, Stack } from "@mui/material";

import React, { memo } from "react";
import MovieCard from "../components/MovieCard";

import {PopulerUrl,UpComing as UpComingUrl,TrendUrl} from '../api'


import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

const SelectNameToUrl = {
    "popular":PopulerUrl,
    "on_vision":TrendUrl,
    "movie_soon":UpComingUrl,
    "tv_series":(page)=>{
        return PopulerUrl(page,'tv');
    }
}

const PaginationUI = (props) =>{

    const navigate = useNavigate();

    if( ! SelectNameToUrl[props.name]){
        // redirect 
        console.error(`${props.name} not available`)
        navigate('/');
    }



    const containerRef = React.createRef() 
    const [page, setPage] = React.useState(1)
    const [data,setData] = React.useState({})
    const handleChange = (event, value) => {
        setPage(value);
    };


    const {t} = useTranslation();
    


    React.useEffect(() =>{
  
        fill();

    },[page])

    React.useEffect(() =>{ 
        if(page === 1) fill();
        else setPage(1);
    },[props])


    const fill = () =>{

        const selectUrl = SelectNameToUrl[props.name];
        fetch(selectUrl(page))
        .then(response => response.json())
        .then(json => {
            
            setData(json)

            if(containerRef.current !== null && window.scrollTop !== 0)
                window.scrollTo({top:containerRef.current.clientTop,behavior: 'smooth'})
        
        })

    }


    const CustomPagination = () => {
        return (
            <Stack spacing={2}>
            <div style={{margin:'10px',textAlign:'center',display:'flex',justifyContent:'center'}}>
                 <Pagination count={ Math.min(data.total_pages || 1,500)  }   variant="outlined" color="secondary"   page={page} onChange={handleChange} />
            </div>
            </Stack>
        )
    }

     
    return (
        <main>
          <Container  ref={containerRef}>
                 <Typography variant="h5" component="h5" my={2}>
                      {t(props.name)}
                  </Typography>

                  <CustomPagination />

                  <Grid container >
                    
                    {
                        data && data.results && 
                        data.results.map(data =>(
                            <Grid item xs={6} md={3} key={data.id} >
                                <MovieCard {...data} />
                            </Grid>
                             
                        ))
                    }
                 
                  
                  
                 </Grid> 

                <CustomPagination />
                 
        </Container>
        </main>
    )
}

export default memo(PaginationUI);