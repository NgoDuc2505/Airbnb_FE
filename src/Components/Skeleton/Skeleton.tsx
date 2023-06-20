import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

const arrayRenderItem: Array<number> = [1,2,3,4,5,6,7,8]

export default function SkeletonC() {
  return (
    <Box sx={{ width: '100%' }} className='mui-box-skeleton'>
      <Skeleton variant='rectangular' width={'100%'} height={500}/>
      <Skeleton variant='rounded' width={'50%'} height={30} sx={{marginTop: '3rem'}} />
      <Grid container spacing={2}>
        {arrayRenderItem.map(itemt=>{
            return(
                <Grid item xs={3} key={itemt}>
                <Skeleton animation="wave" width={'100%'} height={100} />
            </Grid>
            )
        })}
      </Grid>
    </Box>
  );
}

export const SkeletonRegister= ()=>{
    return(
      <Box sx={{width: '100%', paddingTop:'50%', transform: 'translateY(-20%)'}} className='mui-box-skeleton'>
        <Skeleton variant='circular' sx={{width: '60px', height: '60px', borderRadius:'50%', margin:'auto'}}></Skeleton>
        <Skeleton variant='rounded' sx={{width: '50%', height: '6rem', margin:'auto', marginTop:'1rem'}}></Skeleton>
        <Box sx={{width: '80%', margin:'auto'}}>
        <Skeleton variant='rectangular' sx={{width: '100%', borderRadius:'10px', height:'40px', marginTop:'2rem'}}></Skeleton>
        <Skeleton variant='rectangular' sx={{width: '100%', borderRadius:'10px', height:'40px', marginTop:'2rem'}}></Skeleton>
        <Skeleton variant='rectangular' sx={{width: '100%', borderRadius:'10px', height:'40px', marginTop:'2rem'}}></Skeleton>
        </Box>
        <Box sx={{display: 'flex',marginTop:'2rem', justifyContent: 'space-evenly'}}>
          <Skeleton variant='rectangular' sx={{width: '30%', height:'5rem',borderRadius:'10px'}}></Skeleton>
          <Skeleton variant='rectangular' sx={{width: '30%', height:'5rem',borderRadius:'10px'}}></Skeleton>
        </Box>
      </Box>
    )
 }

  