import { useState } from 'react'
import { Box, FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import './adminRegister.scss'
import Button from '@mui/material/Button';
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface IProps{
    handleCloseModal:()=>void
}

function PersonUpdateModal({handleCloseModal}:IProps) {
    const [open, setOpen] = useState(false);
    const [dateValue, setDateValue] = useState<Dayjs | null>(null);
    const [genderValue, setGender] = useState<boolean | string>();
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleChange = (event: SelectChangeEvent<typeof genderValue>) => {
        setGender(event.target.value);
    };
  return (
    <div className='person-update-modal'>
          <form action="" className='person-update-form'>
                <h1>Cập nhật thông tin</h1>
                <Grid container spacing={2} className='mui-grid-admin'>
                    <Grid item lg={6} className='mui-item-grid-admin'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense'>
                        <InputLabel htmlFor="name">Họ tên</InputLabel>
                        <Input id="name" aria-describedby="my-helper-text"/>
                        <FormHelperText>check</FormHelperText>

                    </FormControl>
                    </Grid>
                    <Grid item lg={6} className='mui-item-grid-admin'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense'>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input id="email" aria-describedby="my-helper-text" disabled={true}/>
                        <FormHelperText>check</FormHelperText>

                    </FormControl>
                    </Grid>
                    <Grid item lg={6} className='mui-item-grid-admin'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense'>
                        <InputLabel htmlFor="phone">Số điện thoại</InputLabel>
                        <Input id="phone" aria-describedby="my-helper-text"/>
                        <FormHelperText>check</FormHelperText>

                    </FormControl>
                    </Grid>
                    <Grid item lg={6} className='mui-item-grid-admin'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense'>
                        <InputLabel htmlFor="role">Quyền</InputLabel>
                        <Input id="role" aria-describedby="my-helper-text" />
                        <FormHelperText>check</FormHelperText>

                    </FormControl>
                    </Grid>
                    <Grid item lg={6} className='mui-item-grid-admin'>
                    <Box sx={{ display: 'flex' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker className='date-pick' value={dateValue} onChange={(newValue) => setDateValue(newValue)} />
                            </DemoContainer>
                        </LocalizationProvider>
                        <FormControl sx={{ m: 1, minWidth: 90 }}>
                            <InputLabel id="demo-controlled-open-select-label">Gender</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={open}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                value={genderValue}
                                label="Gender"
                                onChange={handleChange}
                                sx={{ fontSize: '1.4rem' }}
                            >
                                <MenuItem value={'true'}>Male</MenuItem>
                                <MenuItem value={'false'}>Female</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    </Grid>
                </Grid>
                <div className="button-group-admin-register">
                    <Button variant="contained">Sửa</Button>
                    <Button variant="contained" onClick={handleCloseModal}>Hủy</Button>
                </div>
            </form>
    </div>
  )
}

export default PersonUpdateModal