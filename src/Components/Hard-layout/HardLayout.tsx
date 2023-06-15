import React from 'react'
import './hardLayout.scss'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function HardLayout() {
  return (
    <div className='feature-sub'>
         <Container maxWidth='xl'>
            <h1>Ở bất cứ đâu </h1>
        <Box sx={{ flexGrow: 1 }} className='mui-box'>
          <Grid container spacing={2} className='mui-grid'>
            <Grid item xs={3} className='mui-grid-item'>
              <Item className='mui-item'>
                <div className="feature-sub-item">
                  <img src="/src/assets/Image/home-ocean.jpg" alt="..." />
                  <p>Toàn bộ nhà</p>
                </div>
              </Item>
            </Grid>
            <Grid item xs={3} className='mui-grid-item'>
              <Item className='mui-item'>
              <div className="feature-sub-item">
                  <img src="/src/assets/Image/unique.jpg" alt="..." />
                  <p>Chỗ ở độc đáo</p>
                </div>
              </Item>
            </Grid>
            <Grid item xs={3} className='mui-grid-item'>
              <Item className='mui-item'>
              <div className="feature-sub-item">
                  <img src="/src/assets/Image/maxresdefault.jpg" alt="..." />
                  <p>Trang trại vè thiên nhiên</p>
                </div>
              </Item>
            </Grid>
            <Grid item xs={3} className='mui-grid-item'>
              <Item className='mui-item'>
              <div className="feature-sub-item">
                  <img src="/src/assets/Image/dog-on-bed-photopin-740w.jpg" alt="..." />
                  <p>Cho phép mang theo thú cưng</p>
                </div>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  )
}

export default HardLayout