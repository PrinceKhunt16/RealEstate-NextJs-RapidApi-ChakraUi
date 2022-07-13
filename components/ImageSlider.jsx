import React from "react";
import Slider from "react-slick";

export default function ImageSlider({ photos }) {
    
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoPlay: true,
    };

    return (
        <Slider {...settings}>
            {
                photos.map(photo => (
                    <img src={photo.url} alt="photo" />
                ))
            }
        </Slider>
    );
}