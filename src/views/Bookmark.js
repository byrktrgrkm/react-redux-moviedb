import { Grid, Pagination, Typography,Container, Stack, Button, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import React, { memo } from "react";
import MovieCard from "../components/MovieCard";

import { useTranslation } from 'react-i18next';

import { useSelector, useDispatch } from 'react-redux';
import {
   selectBookmarks,
   selectBookmarksPerpage,
   deleteBookmark,
   setPerPage
  } from '../features/BookmarkSlice'


const Bookmark = (props) =>{


    const containerRef = React.createRef() 
    const [page, setPage] = React.useState(1)
    const [snackbar,setSnackbar] = React.useState({
        open:false,
        duration:6000,
        message:'test',
        type:'success'
    });
    const list = useSelector(selectBookmarks);
    const perpage = useSelector(selectBookmarksPerpage);

    const perpageSetting = useSelector(( (state) => state.bookmark.perPageSettings ))

    const [crop,setCrop] = React.useState([]);
    const handleChange = (event, value) => {
        setPage(value);
    };

    const {t} = useTranslation();

    const dispatch = useDispatch();
    
    React.useEffect(() =>{

        const start = (page-1) * perpage
        setCrop(
            list.slice(start,start + perpage)
        )

       

    },[page,list,perpage])



    const deleteHandle = (e) =>{

        setSnackbar({
            ...snackbar,
            message:t('bookmark_delete_message'),
            open:true
        })

        dispatch(deleteBookmark(e.id))

    }


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackbar({
            ...snackbar,
            open:false
        })
        
      };


    const CustomPagination = () => {
        if(list.length <= perpage)
            return;

        const max = Math.ceil(list.length / perpage);     

        return (
            <Stack spacing={2}>
            <div style={{margin:'10px',textAlign:'center',display:'flex',justifyContent:'center'}}>
                 <Pagination count={ max }   variant="outlined" color="secondary"   page={page} onChange={handleChange} />
            </div>
            </Stack>
        )
    }


     
    return (
        <main>
          <Container  ref={containerRef} style={{"minHeight":'80vh'}}>
                
                  <Grid sx={{display:'flex',justifyContent:'space-between'}} justify="space-between">  
                  <Typography variant="h5" component="h5" my={2}>
                      {t('menu_bookmark')}
                  </Typography>
                  <Typography variant="h5" component="h5" my={2}>
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 80 }} >
                    <InputLabel id="demo-simple-select-label">{t('bookmark_select_perpage')}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label={t('bookmark_select_perpage')}
                            defaultValue={perpage}
                            onChange={(e) =>{ dispatch( setPerPage(e.target.value));  setPage(1)}} 

                        >
                            
                            {
                            [...Array(perpageSetting.max-perpageSetting.min+1)].map((x, i) =>
                                <MenuItem key={i} value={i + perpageSetting.min }>{i + perpageSetting.min}</MenuItem>
                            )}

                         
                            
                        </Select>
                    </FormControl>
                  </Typography>
                  </Grid>
             
                
                  {
                     crop.length == 0 &&
                     <Alert sx={{display:''}} severity="error">{t('bookmark_alert_not_found')}</Alert>
                  }
                  
                  <CustomPagination />

                  <Grid container >
                    
                    {
                        crop && 

                        crop.length > 0 
                        &&
                        crop.map(i =>(
                            <Grid item xs={6} md={3} key={i.id} >
                                <MovieCard {...i}  delete={{
                                    handle: () => {deleteHandle(i)},
                                }} />
                            </Grid>
                             
                        ))
                    }
                 
                  
                  
                 </Grid> 

                <CustomPagination />
                 
        </Container>

        <Snackbar open={snackbar.open} autoHideDuration={snackbar.duration} onClose={handleClose}>
            <Alert onClose={handleClose} severity={snackbar.type} sx={{ width: '100%' }}>
              {snackbar.message}
            </Alert>
        </Snackbar>


        </main>
    )
}

export default memo(Bookmark);