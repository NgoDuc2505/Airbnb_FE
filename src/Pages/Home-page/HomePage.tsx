
import HardLayout from '../../Components/Hard-layout/HardLayout'
import Carousel from '../../Components/Carousel/Carousel'
import ExploreLocation from '../../Components/Explore-location/ExploreLocation'
//MUI UI
import Container from '@mui/material/Container';

function HomePage() {
  return (
    <div>
      <Carousel/>
      <Container maxWidth='xl'>
      <ExploreLocation/>
      <HardLayout />
      </Container>
    </div>
  )
}

export default HomePage