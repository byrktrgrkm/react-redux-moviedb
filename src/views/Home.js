import Search from '.././components/Home/Search'
import MovieSlider from '../components/MovieSlider'

import {PopulerUrl,UpComing as UpComingUrl,TrendUrl,API} from '../api'


import { useState,useEffect } from 'react';

const Home = () =>{

    const [populerData,setPopulerData] = useState([]);
    const [yakindaData,setYakindaData] = useState([]);
    const [trendData,setTrendData] = useState([]);
    const [populerDiziData,setPopulerDiziData] = useState([]);

    useEffect(() =>{
        

        fetch(PopulerUrl())
    .then(response => response.json())
    .then(json => setPopulerData(json))

    fetch(PopulerUrl(1,'tv'))
    .then(response => response.json())
    .then(json => {
        if(json.results){
            json.results = json.results.map(i => {
                i.media_type = 'tv';
                return i;
            })
        }
        setPopulerDiziData(json)})

    fetch(UpComingUrl())
    .then(response => response.json())
    .then(json => setYakindaData(json))

    fetch(TrendUrl())
    .then(response => response.json())
    .then(json => setTrendData(json))


    },[])





    return (
        <main>

            <Search />
            <MovieSlider data={populerData.results} title="Popüler Olanlar" to="/populer"  slider={{slidesToShow:5,dots:false}}/>

            <MovieSlider data={populerDiziData.results} title="Popüler TV Dizileri"  to="/populer-tv"  slider={{slidesToShow:5,dots:false}}/>
            <MovieSlider data={yakindaData.results} title="Yakında" to="/yakinda"  slider={{dots:false}}/>
            <MovieSlider data={trendData.results} title="Trend" to="/gosterimdekiler"  slider={{dots:false}}/>
        </main>
    );
}


export default Home;