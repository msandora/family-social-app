import React from 'react';
import { Image } from 'semantic-ui-react';
import Carousel from 'semantic-ui-carousel-react';

const ScreamDetailedCarousel = ({ scream }) => {
  let elements = [
    {
      render: () => {
        return <Image src={`/assets/categoryImages/travel.jpg`} fluid />;
      },
    },
    {
      render: () => {
        return <Image src={`/assets/categoryImages/food.jpg`} fluid />;
      },
    },
    {
      render: () => {
        return <Image src={`/assets/categoryImages/culture.jpg`} fluid />;
      },
    },
    {
      render: () => {
        return <Image src={`/assets/categoryImages/music.jpg`} fluid />;
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

export default ScreamDetailedCarousel;
