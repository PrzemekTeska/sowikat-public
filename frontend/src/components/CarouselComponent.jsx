import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import pic1 from '../1.jpg'
import pic2 from '../2.jpg'
import pic3 from '../3.jpg'
import pic4 from '../4.jpg'
import pic5 from '../5.jpg'
import pic6 from '../6.jpg'
import pic7 from '../7.png'
import pic8 from '../8.jpg'
import pic9 from '../9.jpg'
import pic10 from '../10.jpg'
import pic11 from '../11.jpg'
import pic12 from '../12.jpg'




const images = [
    {
      original: pic1,
      thumbnail: pic1,
    },
    {
      original: pic2,
      thumbnail: pic2,
    },
    {
      original: pic3,
      thumbnail: pic3,
    },
    {
      original: pic4,
      thumbnail: pic4,
    },
    {
      original: pic5,
      thumbnail: pic5,
    },
    {
      original: pic6,
      thumbnail: pic6,
    },
    {
      original: pic7,
      thumbnail: pic7,
    },
    {
      original: pic8,
      thumbnail: pic8,
    },
    {
      original: pic9,
      thumbnail: pic9,
    },
    {
      original: pic10,
      thumbnail: pic10,
    },
    {
      original: pic11,
      thumbnail: pic11,
    },
    {
      original: pic12,
      thumbnail: pic12,
    },
  ];

class CarouselComponent extends Component {
    render() {
        return (
            <div>
                <ImageGallery items={images} lazyLoad={true}/>
            </div>
        );
    }
}

export default CarouselComponent;