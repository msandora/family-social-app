import React from 'react';
import { Image } from 'semantic-ui-react';
import Carousel from 'semantic-ui-carousel-react';

const ScreamCarousel = ({ scream }) => {
  const defaultImg ="/assets/categoryImages/travel.jpg";

  let elements = [];
  scream.screamImages &&
    scream.screamImages.map((img) => {
      elements.push({
        render: () => {
          return <Image src={img} alt='img' fluid />;
        },
      })
    })
    

  let DefaultElements = [
    {
      render: () => {
        return <Image src={`/assets/categoryImages/travel.jpg`} fluid />;
      },
    },
  ];

  return (
    <Carousel
      elements={elements.length > 0 ? elements : DefaultElements}
      // duration={3000}
      // animation='fade'
      showNextPrev={false}
      showIndicators={true}
    />
  );
};

export default ScreamCarousel;
