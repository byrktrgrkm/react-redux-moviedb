import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import {ImageUrl_500} from '../api'
import { Link } from 'react-router-dom';
import { Button, Grow } from '@mui/material';
import { useTranslation } from 'react-i18next';

import DeleteIcon from '@mui/icons-material/Delete';

const MovieCard = (prop) =>{
   
    const {t} = useTranslation()

    return (
        <Grow
    in={true}
    style={{ transformOrigin: '0 0 0' }}
    {...({ timeout: 700 })}
  >
        <Card sx={{ maxWidth: 200,height:350,margin:'6px 8px'}} >

        <CardMedia
        component="img"
        height="200"
        image={ImageUrl_500(prop.poster_path)}
        alt="green iguana"
        />
        <Box sx={{ position: 'relative', display: 'inline-flex',marginTop:'-20px',backgroundColor:'black',borderRadius:'50%',marginLeft:'15px' }}>
            <CircularProgress color="secondary" variant="determinate" value={Math.floor(prop.vote_average * 10)} />
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
                    {Math.floor(prop.vote_average * 10)}<sup>%</sup>
                </Typography>
            </Box>
        </Box>
        <CardContent>
        <Tooltip title={prop.title}>
            <Link to={`/${prop.media_type || 'movie'}/${prop.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <Typography gutterBottom variant="h6" component="div" style={{textOverflow:'ellipsis',whiteSpace:'nowrap',overflow:'hidden'}}>
                {prop.title || prop.name || prop.original_title}
                </Typography>
           </Link> 
        </Tooltip>
        <Typography variant="body2" color="text.secondary">
        {prop.release_date || prop.first_air_date}
        </Typography>
        
        {
            prop.delete &&

            <Button
            startIcon={<DeleteIcon />}
            onClick={prop.delete.handle}
            variant="outlined"  color="error" sx={{float:'right'}}>{t('bookmark_button_remove')}</Button>
        }
        
    </CardContent>
    </Card>

    </Grow>
    );
}


export default MovieCard;