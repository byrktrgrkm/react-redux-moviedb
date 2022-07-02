import { Grid, Pagination, Typography,Container } from "@mui/material";

import React from "react";
import MovieCard from "../components/MovieCard";

import {PopulerUrl,UpComing as UpComingUrl,TrendUrl} from '../api'




const SelectNameToUrl = {
    "Popüler":PopulerUrl,
    "Gösterimdekiler":TrendUrl,
    "Yakında":UpComingUrl,
    "Popüler Tv Programları":()=>{
        return PopulerUrl(1,'tv');
    }
}

const PaginationUI = (props) =>{


    if( ! SelectNameToUrl[props.name]){
        // redirect 
    }



    const containerRef = React.createRef() 
    const [page, setPage] = React.useState(1)
    const [data,setData] = React.useState({})
    const handleChange = (event, value) => {
        setPage(value);
    };

    


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
            <div style={{margin:'10px',textAlign:'center',display:'flex',justifyContent:'center'}}>
                 <Pagination count={ Math.min(data.total_pages || 1,500)  }   variant="outlined" color="secondary"   page={page} onChange={handleChange} />
            </div>
        )
    }

     
    return (
        <main>
          <Container  ref={containerRef}>
                 <Typography variant="h5" component="h5" my={2}>
                      {props.name}
                  </Typography>

                  <CustomPagination />

                  <Grid container >
                    
                    {
                        data && data.results && 
                        data.results.map(data =>(
                            <Grid item xs={2} md={3} key={data.id} >
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

export default PaginationUI;