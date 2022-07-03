import {  Box, Button, CardMedia, Chip, CircularProgress, Divider, Grid, Icon, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import { loadCSS } from 'fg-loadcss';

import '../css/Movie.component.css';  

import React, { useEffect, useState } from 'react'

import {MovieUrl,VideoUrl,SimilarUrl,ImageUrl_Original,ImageUrl_500, RecommendationUrl} from '../api'

import Embed from "../components/Movie/embed";
import MovieSlider from "../components/MovieSlider";
import Videos from "../components/Movie/videos";


import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';


import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';
import BookmarkAddedRoundedIcon from '@mui/icons-material/BookmarkAddedRounded';

import { useSelector, useDispatch } from 'react-redux';
import {
    addBookmark,deleteBookmark,containsBookmark,selectBookmarks,bookmarkContains
  } from '../features/BookmarkSlice'

const Movie = (prop) =>{


    const navigate = useNavigate();
    
    const {t} = useTranslation();

    let params = useParams();

    if( ! params.type ||  ! ['movie','tv'].includes(params.type)){
        // redirect
        navigate('/');
    }



    const [movie,setMovie] = useState({});
    const [videos,setVideos] = useState({});
    const [similarData,setSimilarData] = useState({});
    const [recommendations,setRecommendations] = useState({});


    const dispatch = useDispatch();

    const [isBookmarked,setIsBookmarked] = useState(false)


    const [embedState,setEmbedState] = useState({
        show:false,
        key:''
    });

    const result = useSelector(selectBookmarks);
    const bookmarkHandle = (data,movie_type,action)=>{
       
        const actions = {
            delete: () =>{
                dispatch(deleteBookmark(data.id))
                
            },
            insert: () =>{
                const p = {
                    id:data.id,
                    poster_path:data.poster_path,
                    original_title:data.original_title,
                    release_date:data.release_date,
                    media_type:movie_type,
                    vote_average:data.vote_average
                }
        
                dispatch(addBookmark(p))
            }
        }

        actions[action] && actions[action]();
    }


    useEffect(()=>{
        setIsBookmarked(bookmarkContains(result,params.movie_id))
    },[result,params])


   

  


    useEffect( () =>{


    window.scrollTo({top:0,behavior: 'smooth'})

     fetch(MovieUrl(params.movie_id,params.type))
    .then(async (response) => ( {status:response.status,data: await response.json()} ))
    .then(response => {

        if(response.status === 404 ){

            navigate('/');
            setMovie({result:false})


            throw new Error('Bilgi dönmedi');
        }

        response.data.vote_average_percent = Math.floor(response.data.vote_average * 10);

        setMovie(response.data)

      


    }).catch(message =>{
        console.error(message)
    })

    fetch(VideoUrl(params.movie_id,params.type))
    .then(async (response) => ( {status:response.status,data: await response.json()} ))
    .then(response => { setVideos(response.data)})

    fetch(SimilarUrl(params.movie_id,params.type))
    .then(async (response) => ( {status:response.status,data: await response.json()} ))
    .then(response => { 
        response.data.results = response.data.results.map(i =>{ i.media_type = 'tv';return i})
        setSimilarData(response.data)})
   
    fetch(RecommendationUrl(params.movie_id,params.type))
    .then(async (response) => ( {status:response.status,data: await response.json()} ))
    .then(response => { setRecommendations(response.data)})
   

    },[params])
   

    React.useEffect(() => {
        const node = loadCSS(
          'https://use.fontawesome.com/releases/v5.14.0/css/all.css',
          // Inject before JSS
          document.querySelector('#font-awesome-css') || document.head.firstChild,
        );
    
        return () => {
          node.parentNode.removeChild(node);
        };

      }, []);
    

    const handleVideo = () =>{
        if(videos && videos.results){
           const last = videos.results[videos.results.length-1];
            setEmbedState({
                show:true,
                key:last.key
                })
        }
    }
  

    return (
        <>

            {  
              
               movie.result != false 
               && 
               <div>
               <div class="movie-background" style={{position:'relative','backgroundImage':`url('${ImageUrl_Original(movie.backdrop_path)}')`}}>
                <div class="background-color" 
                    style={
                        {position:'absolute',
                        left:0,right:0,top:0,bottom:0,
                        'background-image':'linear-gradient(to left,black, darkblue)',
                        'z-index':-10,opacity:'.3'
                        }
                    }>

                </div>
                <Container>
           
                <Embed params={embedState}  setEmbedState={setEmbedState}/>
                <Grid container spacing={2}  >
                 <Grid item xs={12} md={4}   sx={{padding:'40px',position:'relative'}}>
                     <div>
     
                     
                     <CardMedia
                         component="img"
                         height="100%"
                         width="100%"
                         image={ImageUrl_500(movie.poster_path)}
                         alt="Paella dish"
                       
                     />
                      {
                    videos != null 
                    && 
                    videos.results != null
                    && videos.results.length > 0 && 
                    <div onClick={handleVideo} class="fragmani-izle">{t('movie_trailer_button')}</div>
                }   
                     
                     </div>
                 </Grid>
                 <Grid item xs={12} md={8} sx={{marginTop:'20px'}} style={{zIndex:1}}>
                     
                 <Typography variant="h4" component="h1" sx={{fontWeight:600,color:'white'}} >
                     {movie.title || movie.original_name}
                 </Typography>
                
                 <Divider variant="middle"/> 
     
                 <div class="movie-info">
                     <span id="datetime"> { 

                     params.type == 'tv' ? 
                     movie.first_air_date + " / " + movie.last_air_date
                     :
                     movie.release_date && movie.release_date.replaceAll('-','/')
                     
                     }</span>
                     <span id="categories">{  movie.genres && movie.genres.map(genre => genre.name).join(',') }</span>
                  
                 </div>
     
     
                 <Divider /> 
                 <div class="movie-info-2">
     
                     <Box sx={{ position: 'relative', display: 'inline-flex',backgroundColor:'black',borderRadius:'50%',width:"50px",height:"50px"}}>
                         <CircularProgress size={50} color="secondary" variant="determinate" value={movie.vote_average_percent} />
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
                             <Typography variant="caption" component="div" color="secondary">
                             {movie.vote_average_percent}<sup>%</sup>
                             </Typography>
                         </Box>
                     </Box>
     
                 <span class="uye-puan">{t('movie_user_vote')}</span>
     
                
                {
                    videos != null 
                    && 
                    videos.results != null
                    && videos.results.length > 0 && 
                 <Chip onClick={handleVideo} sx={{padding:'8px',marginLeft:'30px'}} icon={<Icon class="fas fa-play"   color="danger" />} label={t('movie_trailer_button')} color="primary" />
                
                }   
                 </div>
     
                 <h3 class="item">
                     {t('movie_summary')}
                 </h3>
                 <p class="aciklama">
                             {movie.overview}
                 </p>
                 {
                    isBookmarked ? 
                    <Button
                    onClick={() => {
                        bookmarkHandle(movie,params.type,'delete')
                    }}
                    startIcon={ <BookmarkAddedRoundedIcon />}
                    variant="outlined"  color="error">{t('bookmark_button_delete')}</Button>
                    
                    :<Button
                    onClick={() => {
                        bookmarkHandle(movie,params.type,'insert')
                    }}
                    startIcon={ <BookmarkAddRoundedIcon />}
                    variant="outlined"  color="primary">{t('bookmark_button_add')}</Button>


                 }
                 
         
                
                 </Grid>
                 </Grid>
                </Container>


               
     
             </div>

             <Videos videos={videos.results} setEmbedState={setEmbedState}/>

             <MovieSlider data={similarData.results} title={` ${params.type == 'movie' ? t('movie_smiliar') : t('tv_smiliar')}`} slider={{dots:false}}/>
             <MovieSlider data={recommendations.results} title={t('movie_recommended')} slider={{dots:false}}/>

             </div>
            }
            </>
    );
}


export default Movie;