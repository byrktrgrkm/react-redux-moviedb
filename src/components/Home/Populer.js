import CssBaseline from '@mui/material/CssBaseline';

import Container from '@mui/material/Container';

import {Fragment} from 'react';




import {PopulerUrl} from '../../api'

import { useState,useEffect } from 'react';



import MovieSlider from '../MovieSlider';

const Populer = () =>{

    const [populerData,setPopulerData] = useState([]);

    useEffect(() =>{
        

        fetch(PopulerUrl())
    .then(response => response.json())
    .then(json => setPopulerData(json))


    },[])


    return (
        <Fragment>
          
            <CssBaseline />
            <Container>
                <MovieSlider data={populerData.results} title="Popüler Olanlar"/>

                
            </Container>
        </Fragment>
    );
}


export default Populer;