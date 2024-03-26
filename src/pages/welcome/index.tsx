import * as React from 'react'

// import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  // CarouselContent,
  // CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from '@/components/ui/carousel'

import model from '../../assets/model.webp'
// import man from '../../assets/man.webp'
// import woman from '../../assets/woman.webp'

const WelcomePage: React.FC = () => {
  return (
    <Carousel className='flex w-full flex-col items-center justify-center gap-4'>
      <h1 className='self-start p-4 text-4xl font-bold leading-tight'>
        Welcome to your new virtual post office
      </h1>
      <img src={model} />
      {/* <CarouselContent className='w-full w-max-96'>
        <CarouselItem>
          <div className='p-1'>
            <Card>
              <CardContent className='flex aspect-square items-center justify-center p-6'>
                <img src={model} />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className='p-1'>
            <Card>
              <CardContent className='flex aspect-square items-center justify-center p-6'>
                <img src={man} />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className='p-1'>
            <Card>
              <CardContent className='flex aspect-square items-center justify-center p-6'>
                <img src={woman} />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent> */}
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  )
}
export default WelcomePage
