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