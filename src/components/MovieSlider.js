import React, { Component, memo } from "react";
import Slider from "react-slick";

import CssBaseline from '@mui/material/CssBaseline';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {Fragment} from 'react';
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";


import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';


 class MovieSlider extends Component{

    constructor(props) {
        super(props);

        this.props = props;
        this.slider = props.slider || {};
        
    }
    
    render() {

      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        ...this.slider
      };
      return (
        
        
        <Fragment>
          {
            this.props.data && this.props.data.length > 0 && 
            <>
              <CssBaseline />
              <Container>
                  <Typography variant="h5" component="h5" my={2}>
                      {this.props.title} 
                      {
                        this.props.to &&
                        <Link to={this.props.to} style={{ color: 'inherit', textDecoration: 'inherit','display':'inline-block','padding':'20px 10px 10px 10px','vertical-align':'middle'}}>
                          <Typography gutterBottom variant="h6" component="div" style={{textOverflow:'ellipsis',whiteSpace:'nowrap',overflow:'hidden'}}>
                            <ArrowCircleRightRoundedIcon />
                          </Typography>
                       </Link> 
                      }
                  </Typography>
              <Slider {...settings} >
                  {
                    this.props.data.map(data => (
                    <MovieCard {...data} key={data.id} />
                    ))  
                  }
              </Slider>
            </Container>
            </>
         }
        </Fragment>
      );
    }
  }


  export default memo(MovieSlider);