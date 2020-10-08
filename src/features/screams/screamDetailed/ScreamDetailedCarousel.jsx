import React from 'react';
import { Image } from 'semantic-ui-react';
import Carousel from 'semantic-ui-carousel-react';
import { useDispatch, useSelector } from 'react-redux';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import { getScreamPhotos } from '../../../app/firestore/firestoreServices/firestoreScreamsHandler';
import { listenToScreamPhotos } from '../screamActions';

const ScreamDetailedCarousel = ({ scream }) => {
  // console.log('carousel', scream);
  const dispatch = useDispatch();
  const { photos } = useSelector((state) => state.scream);
  console.log('photos', photos);
  useFirestoreCollection({
    query: () => getScreamPhotos(scream.id),
    data: (photos) => dispatch(listenToScreamPhotos(photos)),
    deps: [scream.id, dispatch],
  });

  // console.log(photos);
  // var renderPhotos = [];

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
    // {
    //   render: () => {
    //     return <Image src={`/assets/categoryImages/culture.jpg`} fluid />;
    //   },
    // },
    // {
    //   render: () => {
    //     return <Image src={`/assets/categoryImages/music.jpg`} fluid />;
    //   },
    // },
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
