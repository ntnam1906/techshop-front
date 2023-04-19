import React from "react";
import '../../public/local/css/home.css'
import slider1 from '../../public/local/images/slide-1.png'
import slider2 from '../../public/local/images/slide-2.png'
import slider3 from '../../public/local/images/slide-3.png'
import slider4 from '../../public/local/images/slide-4.png'
import slider5 from '../../public/local/images/slide-5.png'
import slider6 from '../../public/local/images/slide-6.png'
import { Carousel } from 'react-bootstrap';

const SliderComponent = () => {
    return(
    <Carousel>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={slider1}
            alt="UET"
            />
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={slider2}
            alt="UET"
            />
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={slider3}
            alt="UET"
            />
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={slider4}
            alt="UET"
            />
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={slider5}
            alt="UET"
            />
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={slider6}
            alt="UET"
            />
        </Carousel.Item>
    </Carousel>
    
)
}

export default SliderComponent