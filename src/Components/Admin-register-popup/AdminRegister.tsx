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


interface IProps {
    handleCloseModal: () => void
}

function AdminRegister({ handleCloseModal }: IProps) {
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
        <div className='admin-register'>
            <form action="" className='admin-register-form'>
                <h1>Đăng ký người quản trị</h1>
                <Grid container spacing={2} className='mui-grid-admin'>
                    {/* <Grid item lg={6} className='mui-item-grid-admin'>
                        <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={true}>
                            <InputLabel htmlFor="my-input-email">Email</InputLabel>
                            <Input id="my-input-email" aria-describedby="my-helper-text" />
                            <FormHelperText>check</FormHelperText>
                        </FormControl>
                    </Grid> */}
                    <Grid item lg={6} className='mui-item-grid-admin'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={true}>
                        <InputLabel htmlFor="my-input-account">Tài khoản</InputLabel>
                        <Input id="my-input-account" aria-describedby="my-helper-text"/>
                        <FormHelperText>check</FormHelperText>
                    </FormControl>
                    </Grid>
                    <Grid item lg={6} className='mui-item-grid-admin'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense'>
                        <InputLabel htmlFor="my-input-password">Mật khẩu</InputLabel>
                        <Input id="my-input-password" aria-describedby="my-helper-text" />
                        <FormHelperText>check</FormHelperText>

                    </FormControl>
                    </Grid>
                    <Grid item lg={6} className='mui-item-grid-admin'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense'>
                        <InputLabel htmlFor="my-input-password-check">Nhập lại mật khẩu</InputLabel>
                        <Input id="my-input-password-check" aria-describedby="my-helper-text" />
                        <FormHelperText>check</FormHelperText>

                    </FormControl>
                    </Grid>
                    <Grid item lg={6} className='mui-item-grid-admin'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense'>
                        <InputLabel htmlFor="my-input-name">Họ tên</InputLabel>
                        <Input id="my-input-name" aria-describedby="my-helper-text"/>
                        <FormHelperText>check</FormHelperText>

                    </FormControl>
                    </Grid>
                    <Grid item lg={6} className='mui-item-grid-admin'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense'>
                        <InputLabel htmlFor="my-input-email">Email</InputLabel>
                        <Input id="my-input-email" aria-describedby="my-helper-text"/>
                        <FormHelperText>check</FormHelperText>

                    </FormControl>
                    </Grid>
                    <Grid item lg={6} className='mui-item-grid-admin'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense'>
                        <InputLabel htmlFor="my-input-phone">Số điện thoại</InputLabel>
                        <Input id="my-input-phone" aria-describedby="my-helper-text"/>
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
                    <Button variant="contained">Thêm</Button>
                    <Button variant="contained" onClick={() => { handleCloseModal() }}>Hủy</Button>
                </div>
            </form>
        </div>
    )
}

export default AdminRegister