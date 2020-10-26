import React from 'react';
import { Image } from 'semantic-ui-react';
import Carousel from 'semantic-ui-carousel-react';

const ScreamCarousel = ({ scream }) => {
  console.log('carousel', scream);

  let elements = [
    {
      render: () => {
        return <Image src={`/assets/categoryImages/travel.jpg`} fluid />;
      },
    },
  ];

  return (
    <Carousel
      elements={elements}
      duration={3000}
      animation='fade'
      showNextPrev={false}
      showIndicators={true}
    />
  );
};

export default ScreamCarousel;
