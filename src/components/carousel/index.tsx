import { Slide } from '@myTypes/Slide'
import React, { ReactElement } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

type Props = {
  slides: Array<Slide>
}

const MyCarousel = (props: Props): ReactElement => {
  const { slides, ...rest } = props
  return (
    <Carousel
      showThumbs={false}
      showArrows={true}
      infiniteLoop={true}
      autoPlay={true}
      interval={5000}
      transitionTime={500}
      showStatus={false}
      swipeable={true}
      emulateTouch={true}
    >
      {slides.map((slide, i) => (
        <div style={{ height: '300px', maxWidth: '1500px' }} key={i}>
          <img src={slide.img} />
        </div>
      ))}
    </Carousel>
  )
}

export default MyCarousel
