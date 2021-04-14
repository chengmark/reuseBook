import { Slide } from '@myTypes/Slide'
import React, { ReactElement } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import styled from 'styled-components'
import { MEDIA_BREAK } from '@src/layout'
import { useHistory } from 'react-router-dom'
import { LOCATIONS, toPath } from '@src/routes'

type Props = {
  slides: Array<Slide>
}

const MyCarousel = (props: Props): ReactElement => {
  const { slides, ...rest } = props
  const history = useHistory()

  const redirect = (keyword: string) => {
    history.push(toPath(LOCATIONS.search, keyword))
  }

  return (
    <SlideShow
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
        <div
          style={{ height: '300px', maxWidth: '1500px' }}
          key={i}
          onClick={() => {
            redirect(slide.keyword)
          }}
        >
          <img src={slide.img} />
        </div>
      ))}
    </SlideShow>
  )
}

export default MyCarousel

const SlideShow = styled(Carousel)`
  max-width: 1500px;
  cursor: pointer;
  @media (max-width: ${MEDIA_BREAK}px) {
    display: none;
  }
`
