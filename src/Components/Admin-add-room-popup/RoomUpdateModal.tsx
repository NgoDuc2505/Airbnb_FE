import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import NativeSelect from '@mui/material/NativeSelect';
import Button from '@mui/material/Button';
import './addRoom.scss'

interface IProps {
    handleCloseUpdate:()=>void
}

function RoomUpdateModal({handleCloseUpdate}:IProps) {
  return (
    <div className='room-update-modal'>
        <h1>Sửa thông tin phòng</h1>
            <form action="">
                <Grid container spacing={2} className='mui-grid-container-room'>
                <Grid item lg={4} className='mui-grid-item-room'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense' >
                        <InputLabel htmlFor="tenPhong">Tên phòng</InputLabel>
                        <Input id="tenPhong" aria-describedby="my-helper-text" />
                        <FormHelperText>check</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item lg={4} className='mui-grid-item-room'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense' >
                        <InputLabel htmlFor="hinhAnh">Hình ảnh</InputLabel>
                        <Input id="hinhAnh" aria-describedby="my-helper-text" />
                        <FormHelperText>check</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item lg={4} className='mui-grid-item-room'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense' >
                        <InputLabel htmlFor="moTa">Mô tả</InputLabel>
                        <Input id="moTa" aria-describedby="my-helper-text" />
                        <FormHelperText>check</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item lg={4} className='mui-grid-item-room'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense' >
                        <InputLabel htmlFor="khach">Khách tối đa</InputLabel>
                        <Input id="khach" aria-describedby="my-helper-text" />
                        <FormHelperText>check</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item lg={4} className='mui-grid-item-room'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense' >
                        <InputLabel htmlFor="phongNgu">Phòng ngủ</InputLabel>
                        <Input id="phongNgu" aria-describedby="my-helper-text" />
                        <FormHelperText>check</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item lg={4} className='mui-grid-item-room'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense' >
                        <InputLabel htmlFor="giuong">Giường</InputLabel>
                        <Input id="giuong" aria-describedby="my-helper-text" />
                        <FormHelperText>check</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item lg={4} className='mui-grid-item-room'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense' >
                        <InputLabel htmlFor="giaTien">Giá tiền</InputLabel>
                        <Input id="giaTien" aria-describedby="my-helper-text" />
                        <FormHelperText>check</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item lg={4} className='mui-grid-item-room'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense' >
                        <InputLabel htmlFor="maViTri">Mã vị trí</InputLabel>
                        <Input id="maViTri" aria-describedby="my-helper-text" />
                        <FormHelperText>check</FormHelperText>
                    </FormControl>
                </Grid>
                </Grid>
                <div className="selection-group-wrapper">
                    <div className="selection-group">
                        <InputLabel htmlFor="phongTam">Phòng tắm</InputLabel>
                        <NativeSelect id="phongTam">
                            <option value={0} >0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                        </NativeSelect>
                    </div>
                    <div className="selection-group">
                        <InputLabel htmlFor="mayGiat">Máy giặt</InputLabel>
                        <NativeSelect id="mayGiat">
                            <option value='yes' >Có</option>
                            <option value='no'>Không</option>
                        </NativeSelect>
                    </div>
                    <div className="selection-group">
                        <InputLabel htmlFor="banLa">Bàn là</InputLabel>
                        <NativeSelect id="banLa">
                            <option value='yes' >Có</option>
                            <option value='no'>Không</option>
                        </NativeSelect>
                    </div>
                    <div className="selection-group">
                        <InputLabel htmlFor="tivi">Tivi</InputLabel>
                        <NativeSelect id="tivi">
                            <option value='yes' >Có</option>
                            <option value='no'>Không</option>
                        </NativeSelect>
                    </div>
                    <div className="selection-group">
                        <InputLabel htmlFor="bep">Bếp</InputLabel>
                        <NativeSelect id="bep">
                            <option value='yes' >Có</option>
                            <option value='no'>Không</option>
                        </NativeSelect>
                    </div>
                    <div className="selection-group">
                        <InputLabel htmlFor="dieuHoa">Điều hòa</InputLabel>
                        <NativeSelect id="dieuHoa">
                            <option value='yes' >Có</option>
                            <option value='no'>Không</option>
                        </NativeSelect>
                    </div>
                    <div className="selection-group">
                        <InputLabel htmlFor="wifi">Wifi</InputLabel>
                        <NativeSelect id="wifi">
                            <option value='yes' >Có</option>
                            <option value='no'>Không</option>
                        </NativeSelect>
                    </div>
                    <div className="selection-group">
                        <InputLabel htmlFor="doXe">Đỗ xe</InputLabel>
                        <NativeSelect id="doXe">
                            <option value='yes' >Có</option>
                            <option value='no'>Không</option>
                        </NativeSelect>
                    </div>
                    <div className="selection-group">
                        <InputLabel htmlFor="hoBoi">Hồ bơi</InputLabel>
                        <NativeSelect id="hoBoi">
                            <option value='yes' >Có</option>
                            <option value='no'>Không</option>
                        </NativeSelect>
                    </div>
                    <div className="selection-group">
                        <InputLabel htmlFor="banUi">Bàn ủi</InputLabel>
                        <NativeSelect id="banUi">
                            <option value='yes' >Có</option>
                            <option value='no'>Không</option>
                        </NativeSelect>
                    </div>
                </div>
                <div className="button-group-admin-room">
                    <Button variant="contained">Sửa</Button>
                    <Button variant="contained" onClick={handleCloseUpdate}>Hủy</Button>
                </div>
            </form>
    </div>
  )
}

export default RoomUpdateModal