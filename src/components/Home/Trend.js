import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {Fragment} from 'react';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';

import {TrendUrl,ImageUrl_500} from '../../api'

import { useState,useEffect } from 'react';

const Populer = () =>{

    const [populerData,setPopulerData] = useState([]);

    useEffect(() =>{
        

        fetch(TrendUrl())
    .then(response => response.json())
    .then(json => setPopulerData(json))


    },[])


    return (
        <Fragment>
          
            <CssBaseline />
            <Container>
                <Typography variant="h5" component="h5" my={2}>
                    Trend
                </Typography>

                <Grid container>
                {
                   populerData.results &&  populerData.results.slice(0,6).map(data => ( 
                   
                    <Grid item xs={2}>
                   
                   <Card sx={{ maxWidth: 200,height:350 }} key={data.id} >

                        <CardMedia
                        component="img"
                        height="200"
                        image={ImageUrl_500(data.poster_path)}
                        alt="green iguana"
                        />
                        <Box sx={{ position: 'relative', display: 'inline-flex',marginTop:'-20px',backgroundColor:'black',borderRadius:'50%',marginLeft:'15px' }}>
                        <CircularProgress color="secondary" variant="determinate" value={Math.floor(data.vote_average * 10)} />
                        <Box
                            sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            }}
                        >
                            <Typography variant="caption" component="div" color="text.secondary">
                            {Math.floor(data.vote_average * 10)}<sup>%</sup>
                            </Typography>
                        </Box>
                        </Box>
                    <CardContent>
                        <Tooltip title= {data.title || data.original_title}>
                            <Typography gutterBottom variant="h6" component="div" style={{textOverflow:'ellipsis',whiteSpace:'nowrap',overflow:'hidden'}}>
                                {data.title || data.name || data.original_title}
                            </Typography>
                        </Tooltip>
                        <Typography variant="body2" color="text.secondary">
                        {data.release_date || data.first_air_date}
                        </Typography>
                    </CardContent>


                    </Card>
             
                   </Grid> 
                    ))
                }
               
              </Grid>
            </Container>
        </Fragment>
    );
}


export default Populer;