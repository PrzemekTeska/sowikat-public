import React, { useEffect } from 'react';
import CarouselComponent from '../components/CarouselComponent';
import "react-image-gallery/styles/css/image-gallery.css";
import Aos from 'aos';
import "aos/dist/aos.css";
import galeria from '../galeria.png';
import FooterComponent from './FooterComponent';



const GalleryComponent = () => {
    useEffect(() => {
        Aos.init({ duration: 3000, disable: 'mobile' });
    }, []);

    return (
        <div data-aos-once="true" data-aos="fade" id="carousel-container">
            <div className="background-box-gallery">
                <img id="gallery-img" src={galeria} alt="Galeria" />
                <div className="wrapper-box-gallery">
                    <CarouselComponent />
                    <div className="footer-position-mobile" style={{visibility:'hidden'}}><FooterComponent /></div>

                </div>
                
            </div>
            <div className="footer-position"><FooterComponent /></div>

        </div>
    );
}


export default GalleryComponent;