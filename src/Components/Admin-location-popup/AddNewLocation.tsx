//react
import { useState } from 'react'
//mui ui
import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
//css
import '../Admin-add-room-popup/addRoom.scss'

interface IProps{
    handleClose:()=>void
}

function AddNewLocation({handleClose}:IProps) {
  return (
    <div className='add-location-modal'>
        <form action="" className='admin-register-form'>
                <h1>Thêm vị trí</h1>
                <Grid container spacing={2} className='mui-grid-container-room'>
                    <Grid item lg={6} className='mui-grid-item-room'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={true}>
                        <InputLabel htmlFor="tenViTri">Tên vị trí</InputLabel>
                        <Input id="tenViTri" aria-describedby="my-helper-text"/>
                        <FormHelperText>check</FormHelperText>
                    </FormControl>
                    </Grid>
                    <Grid item lg={6} className='mui-grid-item-room'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense'>
                        <InputLabel htmlFor="tinhThanh">Tỉnh thành</InputLabel>
                        <Input id="tinhThanh" aria-describedby="my-helper-text" />
                        <FormHelperText>check</FormHelperText>

                    </FormControl>
                    </Grid>
                    <Grid item lg={6} className='mui-grid-item-room'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense'>
                        <InputLabel htmlFor="quocGia">Quốc gia</InputLabel>
                        <Input id="quocGia" aria-describedby="my-helper-text" />
                        <FormHelperText>check</FormHelperText>

                    </FormControl>
                    </Grid>
                    <Grid item lg={6} className='mui-grid-item-room'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense'>
                        <InputLabel htmlFor="hinhAnh">Hình ảnh</InputLabel>
                        <Input id="hinhAnh" aria-describedby="my-helper-text"/>
                        <FormHelperText>check</FormHelperText>

                    </FormControl>
                    </Grid>
                </Grid>
                <div className="button-group-admin-room">
                    <Button variant="contained">Thêm</Button>
                    <Button variant="contained" onClick={handleClose}>Hủy</Button>
                </div>
            </form>
    </div>
  )
}

export default AddNewLocation