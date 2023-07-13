import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
const arrayRenderItem: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8]
const arrayIcon: Array<number> = [1, 2, 3]
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 992,
      lg: 1200,
      xl: 1536,
    },
  },
});

export function SkeletonC() {
  return (
    <Box sx={{ width: '100%' }} className='mui-box-skeleton'>
      <Skeleton variant='rectangular' width={'100%'} height={500} />
      <Skeleton variant='rounded' width={'50%'} height={30} sx={{ marginTop: '3rem' }} />
      <Grid container spacing={2}>
        {arrayRenderItem.map(itemt => {
          return (
            <Grid item xs={3} key={itemt}>
              <Skeleton animation="wave" width={'100%'} height={100} />
            </Grid>
          )
        })}
      </Grid>
    </Box>
  );
}

export const SkeletonRegister = () => {
  return (
    <Box sx={{ width: '100%', paddingTop: '50%', transform: 'translateY(-20%)' }} className='mui-box-skeleton'>
      <Skeleton variant='circular' sx={{ width: '60px', height: '60px', borderRadius: '50%', margin: 'auto' }}></Skeleton>
      <Skeleton variant='rounded' sx={{ width: '50%', height: '6rem', margin: 'auto', marginTop: '1rem' }}></Skeleton>
      <Box sx={{ width: '80%', margin: 'auto' }}>
        <Skeleton variant='rectangular' sx={{ width: '100%', borderRadius: '10px', height: '40px', marginTop: '2rem' }}></Skeleton>
        <Skeleton variant='rectangular' sx={{ width: '100%', borderRadius: '10px', height: '40px', marginTop: '2rem' }}></Skeleton>
        <Skeleton variant='rectangular' sx={{ width: '100%', borderRadius: '10px', height: '40px', marginTop: '2rem' }}></Skeleton>
      </Box>
      <Box sx={{ display: 'flex', marginTop: '2rem', justifyContent: 'space-evenly' }}>
        <Skeleton variant='rectangular' sx={{ width: '30%', height: '5rem', borderRadius: '10px' }}></Skeleton>
        <Skeleton variant='rectangular' sx={{ width: '30%', height: '5rem', borderRadius: '10px' }}></Skeleton>
      </Box>
    </Box>
  )
}

export const SkeletonDetail = () => {
  return (
    <Box sx={{ width: '100%', paddingTop: '20%', transform: 'translateY(-20%)' }} className='mui-box-skeleton'>
      <Box sx={{ width: '80%', margin: 'auto' }}>
        <Skeleton variant='rectangular' sx={{ width: '10%', height: '40px', marginTop: '1rem', borderRadius: '10px' }}></Skeleton>
        <Skeleton variant='rectangular' sx={{ width: '100%', borderRadius: '10px', height: '40px', marginTop: '1rem' }}></Skeleton>
        <Skeleton
          sx={{ width: '100%', height: '30rem', marginTop: '3rem', borderRadius: '10px' }}
          variant="rectangular"
        />
        <Box sx={{ display: 'flex', marginTop: '2rem', justifyContent: 'space-between' }} >
          <Box sx={{ width: '60%' }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <Skeleton variant='rectangular' sx={{ width: '30%', height: '5rem', borderRadius: '10px' }}></Skeleton>
              <Skeleton variant='rounded' sx={{ width: '60px', height: '60px', borderRadius: '50%' }}></Skeleton>
            </Box>
            <hr />
            {arrayIcon.map((item, index) => {
              return (
                <Box key={index} sx={{ width: '100%', display: 'flex', marginTop: '1rem', alignItems: "center" }}>
                  <Skeleton variant='rounded' sx={{ width: '60px', height: '60px', borderRadius: '50%', marginRight: '1rem' }}></Skeleton>
                  <Skeleton variant='rectangular' sx={{ width: '70%', height: '5rem', borderRadius: '10px' }}></Skeleton>
                </Box>
              )
            })}
            <hr />
            {arrayIcon.map((item, index) => {
              return (
                <Skeleton key={index} variant='rectangular' sx={{ width: '100%', height: '5rem', borderRadius: '10px', marginTop: '1rem' }}></Skeleton>
              )
            })}
          </Box>
          <Skeleton variant='rectangular' sx={{ width: '35%', height: '50rem', borderRadius: '10px' }}></Skeleton>
        </Box>
      </Box>
    </Box>
  )
}

export const SkeletonProfile = () => {
  const w992 = useMediaQuery('(max-width:991.98px)');
  return (
    <Box sx={{ width: '100%', marginTop:`${w992 ? '26rem' : '22.5rem'}`, transform: 'translateY(-20%)' }} className='mui-box-skeleton-profile'>
      <Container maxWidth='lg'>
      <ThemeProvider theme={theme}>
        <Grid container spacing={2}>
          <Grid className='mui-item-profile' item xs={12} md={3} sx={{position:'relative'}}>
          <Skeleton variant='circular' 
          sx={{ 
            width: '200px', 
            height: '200px', 
            borderRadius: '50%', 
            margin: 'auto', 
            position:'absolute', 
            top:'4rem', 
            left:'50%',
            transform:'translateX(-43%)'
          }}
          ></Skeleton>
           <Skeleton variant='rectangular' sx={{ width: '80%', height: '3rem', borderRadius: '10px',  position:'absolute', bottom:'40%', left:'50%',
            transform:'translateX(-46%)'}}></Skeleton>
             <Skeleton variant='rectangular' sx={{ width: '80%', height: '3rem', borderRadius: '10px',  position:'absolute', bottom:'32%', left:'50%',
            transform:'translateX(-46%)'}}></Skeleton>
          <Skeleton variant='rectangular' sx={{ width: '100%', height: `${w992 ? '55.2rem' : '59.7rem'}`, borderRadius: '10px' }}></Skeleton>
          </Grid>
          <Grid className='mui-item-profile' item xs={12} md={8} sx={{position:'relative'}}>
          <Skeleton variant='rectangular' sx={{ width: '100%', height: `${w992 ? '20rem' : '59.7rem'}`, borderRadius: '10px' }}></Skeleton>
          <Skeleton variant='rectangular' sx={{ width: '80%', height: `${w992? '2.5rem' : '3rem'}`, borderRadius: '10px',  position:'absolute', top:`${w992 ? '20%' : '10%'}`, left:'5%'}}></Skeleton>
          <Skeleton variant='rectangular' sx={{ width: '80%', height: `${w992? '2.5rem' : '3rem'}`, borderRadius: '10px',  position:'absolute', top:`${w992 ? '40%' : '18%'}`, left:'5%'}}></Skeleton>
          <Skeleton variant='rectangular' sx={{ width: `${w992 ? '20%' : '80%'}`, height: `${w992? '4rem' : '3rem'}`, borderRadius: '10px',  position:'absolute', top:`${w992 ? '60%' : '26%'}`, left:'5%'}}></Skeleton>
          <Skeleton variant='rectangular' sx={{ display: `${w992 ? 'none' : 'block'}` ,width: '80%', height: '3rem', borderRadius: '10px',  position:'absolute', top:'34%', left:'5%'}}></Skeleton>
          <Skeleton variant='rectangular' sx={{ display: `${w992 ? 'none' : 'block'}` ,width: '80%', height: '3rem', borderRadius: '10px',  position:'absolute', top:'42%', left:'5%'}}></Skeleton>
          <Skeleton variant='rectangular' sx={{ display: `${w992 ? 'none' : 'block'}` ,width: '30%', height: '4rem', borderRadius: '10px',  position:'absolute', top:'50%', left:'5%'}}></Skeleton>
          </Grid>
        </Grid>
      </ThemeProvider>
      </Container>
    </Box>
  )
}