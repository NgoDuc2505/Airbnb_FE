
import { NavLink } from 'react-router-dom';
//MUI UI
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
//scss
import './exploreComponent.scss'
import useGetInspectOfSearchPage from './exploreComponentLogic';
//interface constant
import { ILocationItem } from '../../constant/constant'
//swipper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const themeCustom = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 992,
      lg: 1200,
      xl: 1536,
    },
  },
});
function ExploreLocation() {
  const result: ILocationItem[] = useGetInspectOfSearchPage()
  
  return (
    <div className='explore-location'>
      <h1>Khám phá những đặc điểm nổi bật gần đây</h1>
      <Box sx={{ flexGrow: 1 }} className='mui-box'>
      <ThemeProvider theme={themeCustom}>
      <Grid container spacing={2} className='mui-grid'>
          {
            result.map((itemReturn : ILocationItem) => {
              return (
                <Grid item lg={3} md={4}  className='mui-grid-item item-location' key={itemReturn.id}>
                  <Item className='mui-item item-location-detail'>
                    <NavLink to={`${itemReturn.id}`}>
                    <div className="explore-location-item">
                      <img src={itemReturn.hinhAnh} alt="..." />
                      <div className="explore-location-item-text">
                        <p>{itemReturn.tenViTri}</p>
                        <span>{`${itemReturn.tinhThanh}, ${itemReturn.quocGia}`}</span>
                      </div>
                    </div>
                    </NavLink>
                  </Item>
                </Grid>
              )
            })
          }
        </Grid>
      </ThemeProvider>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        {result.map((itemReturn : ILocationItem) => {
              return (
                <SwiperSlide key={itemReturn.id} className='swpper-slice-custom'>
                <div className="swiper-item-custom">
                <NavLink to={`${itemReturn.id}`}>
                    <div className="explore-location-item">
                      <img src={itemReturn.hinhAnh} alt="..." />
                      <div className="explore-location-item-text">
                        <p>{itemReturn.tenViTri}</p>
                        <span>{`${itemReturn.tinhThanh}, ${itemReturn.quocGia}`}</span>
                      </div>
                    </div>
                    </NavLink>
                </div>
                </SwiperSlide>
              )
            })}
      </Swiper>
      </Box>
    </div>
  )
}

export default ExploreLocation