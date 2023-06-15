import React from 'react'
//MUI UI
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
//scss
import './exploreComponent.scss'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


function ExploreLocation() {
  return (
    <div className='explore-location'>
        <h1>Khám phá những đặc điểm nổi bật gần đây</h1>
         <Box sx={{ flexGrow: 1 }} className='mui-box'>
      <Grid container spacing={2} className='mui-grid'>
        <Grid item xs={3} className='mui-grid-item'>
          <Item className='mui-item'>
            <div className="explore-location-item">
                <img src="/src/assets/Image/unique.jpg" alt="..." />
                <div className="explore-location-item-text">
                    <p>TP Hồ Chí Minh</p>
                    <span>15 phút lái xe</span>
                </div>
            </div>
          </Item>
        </Grid>
        <Grid item xs={3} className='mui-grid-item'>
          <Item className='mui-item'>
            <div className="explore-location-item">
                <img src="/src/assets/Image/unique.jpg" alt="..." />
                <div className="explore-location-item-text">
                    <p>TP Hồ Chí Minh</p>
                    <span>15 phút lái xe</span>
                </div>
            </div>
          </Item>
        </Grid>
        <Grid item xs={3} className='mui-grid-item'>
          <Item className='mui-item'>
            <div className="explore-location-item">
                <img src="/src/assets/Image/unique.jpg" alt="..." />
                <div className="explore-location-item-text">
                    <p>TP Hồ Chí Minh</p>
                    <span>15 phút lái xe</span>
                </div>
            </div>
          </Item>
        </Grid>
        <Grid item xs={3} className='mui-grid-item'>
          <Item className='mui-item'>
            <div className="explore-location-item">
                <img src="/src/assets/Image/unique.jpg" alt="..." />
                <div className="explore-location-item-text">
                    <p>TP Hồ Chí Minh</p>
                    <span>15 phút lái xe</span>
                </div>
            </div>
          </Item>
        </Grid>
        <Grid item xs={3} className='mui-grid-item'>
          <Item className='mui-item'>
            <div className="explore-location-item">
                <img src="/src/assets/Image/unique.jpg" alt="..." />
                <div className="explore-location-item-text">
                    <p>TP Hồ Chí Minh</p>
                    <span>15 phút lái xe</span>
                </div>
            </div>
          </Item>
        </Grid>
        <Grid item xs={3} className='mui-grid-item'>
          <Item className='mui-item'>
            <div className="explore-location-item">
                <img src="/src/assets/Image/unique.jpg" alt="..." />
                <div className="explore-location-item-text">
                    <p>TP Hồ Chí Minh</p>
                    <span>15 phút lái xe</span>
                </div>
            </div>
          </Item>
        </Grid>
        <Grid item xs={3} className='mui-grid-item'>
          <Item className='mui-item'>
            <div className="explore-location-item">
                <img src="/src/assets/Image/unique.jpg" alt="..." />
                <div className="explore-location-item-text">
                    <p>TP Hồ Chí Minh</p>
                    <span>15 phút lái xe</span>
                </div>
            </div>
          </Item>
        </Grid>
        <Grid item xs={3} className='mui-grid-item'>
          <Item className='mui-item'>
            <div className="explore-location-item">
                <img src="/src/assets/Image/unique.jpg" alt="..." />
                <div className="explore-location-item-text">
                    <p>TP Hồ Chí Minh</p>
                    <span>15 phút lái xe</span>
                </div>
            </div>
          </Item>
        </Grid>
      </Grid>
    </Box>
    </div>
  )
}

export default ExploreLocation