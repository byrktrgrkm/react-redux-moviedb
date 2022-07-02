import { Badge, Card, CardContent, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { memo, useEffect, useMemo } from 'react';
import '../../css/videos.component.scss'



const Videos = (prop) =>{


    useEffect(()=>{
       
    },[prop.params])

    if(!prop.videos)
        return <></>

    const VideoSource = ({site,sitekey})=>{
        switch(site){
            case 'YouTube':
                return (
                <iframe width="420" height="315"
                            src={`https://www.youtube.com/embed/${sitekey}`}>
                </iframe>
                );
            break;


        }
        
    }    
    return (    
        
        <Container>
        
        <Grid container spacing={2}>

            {
                prop.videos.slice(0,3).map(video =>(
                    <Grid item xs={6} md={4} key={video.id} style={{position:'relative'}}>
                        
            
                        <Card>
                        <div 
                        onClick={() => {
                            prop.setEmbedState({
                                key:video.key,
                                show:true
                            })
                        }}
                        style={{position:'absolute',left:0,top:0,bottom:0,right:0,backgroundColor:'black','z-index':10,opacity:.1}}>

                        </div>
                         <VideoSource site={video.site} sitekey={video.key} />
                            

                            <CardContent>
                            <Badge color="secondary">
                                {video.site}
                            </Badge>
                                <Typography variant="body2" color="text.secondary">
                                {video.name}
                                </Typography>
                        </CardContent>
                        </Card>
                    </Grid>

                ))
            }
            
            
    
            
        </Grid>
        </Container>

    );
}


export default memo(Videos);