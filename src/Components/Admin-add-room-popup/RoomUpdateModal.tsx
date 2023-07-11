import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import NativeSelect from '@mui/material/NativeSelect';
import Button from '@mui/material/Button';
import './addRoom.scss'
import { IRoomDetail} from '../../constant/constant';
import { ChangeEvent, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import swal from 'sweetalert';
import { axiosInterceptor } from '../../services/services';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getRoomByPhanTrang } from '../../redux/Admin-slice/AdminRoomSlice';


interface IProps {
    handleCloseUpdate:()=>void,
    roomdata: IRoomDetail,
    pageIndex: number
}

const str2bool = (value: string | true) => {
    if (typeof value === "string") {
         if (value.toLowerCase() === "true") return true;
         if (value.toLowerCase() === "false") return false;
    }
    return value;
 }

function RoomUpdateModal({handleCloseUpdate, roomdata, pageIndex}:IProps) {
    const dispatch = useDispatch<AppDispatch>()
    const [mayGiat, setMayGiat] = useState<boolean | string>();
    const [banLa, setBanLa] = useState<boolean | string>();
    const [tivi, setTivi] = useState<boolean | string>();
    const [bep, setBep] = useState<boolean | string>();
    const [dieuHoa, setDieuHoa] = useState<boolean | string>();
    const [wifi, setWifi] = useState<boolean | string>();
    const [doXe, setDoXe] = useState<boolean | string>();
    const [hoBoi, setHoBoi] = useState<boolean | string>();
    const [banUi, setBanUi] = useState<boolean | string>();
    const [file,setFile]= useState<File | null | Blob>(null);
    const [preview, setPreview] = useState();

    useEffect(() => {
        if (!file) {
            setPreview(undefined)
            return
        }
        const objectUrl: any= URL.createObjectURL(file)
        setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [file])

    const handleChangeFile =(e:React.ChangeEvent<HTMLInputElement>)=>{
        if((e.target.files) !== null){
            setFile(e.target.files[0])
        }
    }


    const formik = useFormik({
        initialValues: {
            id: roomdata.id,
            tenPhong: `${roomdata.tenPhong}`,   
            hinhAnh: `${roomdata.hinhAnh}`,
            moTa: `${roomdata.moTa}`,
            khach: roomdata.khach,
            maViTri: roomdata.maViTri,
            phongNgu: roomdata.phongNgu,
            phongTam: roomdata.phongTam,
            giaTien: roomdata.giaTien,
            giuong: roomdata.giuong,
            mayGiat: roomdata.mayGiat,
            banLa: roomdata.banLa,
            tivi: roomdata.tivi,
            bep: roomdata.bep,
            dieuHoa: roomdata.dieuHoa,
            wifi: roomdata.wifi,
            doXe: roomdata.doXe,
            hoBoi: roomdata.hoBoi,
            banUi: roomdata.banUi,
        },
        validationSchema: Yup.object().shape({
            tenPhong: Yup.string().required('Name can not be empty'),
            moTa: Yup.string().required('Mô tả can not be empty'),
            khach: Yup.number().min(1, 'Khách hàng phải lớn hơn 0').required('Khách hàng can not be empty'),
            maViTri: Yup.number().min(1, 'Mã Vị Trí phải lớn hơn 0').required('Mã vị trí can not be empty'),
            phongNgu: Yup.number().min(1, 'Sô phòng ngủ phải lớn hơn 0').required('Số phòng ngủ can not be empty'),
            phongTam: Yup.number().min(1, 'Số phòng tắm phải lớn hơn 0').required('Số phòng tắm can not be empty'),
            giaTien: Yup.number().min(1, 'Giá tiền phải lớn hơn 0').required('Giá tiền can not be empty'),
            giuong: Yup.number().min(1, 'Số giường phải lớn hơn 0').required('Giường can not be empty'),

        }),
        onSubmit: async (values: IRoomDetail) => {
            try {

            
                const newValue = {
                    ...values,
                    mayGiat: mayGiat? str2bool(mayGiat) : values.mayGiat,
                    banLa: banLa? str2bool(banLa) : values.banLa,
                    tivi: tivi? str2bool(tivi) : values.tivi,
                    bep: bep? str2bool(bep) : values.bep,
                    dieuHoa: dieuHoa? str2bool(dieuHoa) : values.dieuHoa,
                    wifi: wifi? str2bool(wifi) : values.wifi,
                    doXe: doXe? str2bool(doXe) : values.doXe,
                    hoBoi: hoBoi? str2bool(hoBoi) : values.hoBoi,
                    banUi: banUi? str2bool(banUi) : values.banUi,
                }
                
                
                await axiosInterceptor.put(`/api/phong-thue/${roomdata.id}`, newValue)

                if(file !== null){
                    const formData = new FormData();
                    formData.append("formFile", file);
                    await axiosInterceptor.post(`/api/phong-thue/upload-hinh-phong?maPhong=${roomdata.id}`, formData)
                }
                dispatch(getRoomByPhanTrang({ pageIndex: pageIndex, keywords: "" }))
                swal(`Thành công cập nhật phòng ${newValue.tenPhong}`, { icon: "success" })
                handleCloseUpdate()

            
            } catch (error) {
                console.log(error)
                swal("Thất bại, vui lòng kiểm tra lại thông tin, hình ảnh phải dưới 1MB !", {
                    icon: "error",
                });
            }

        }
    })


    return (
        <div className='room-update-modal'>
            <h1>Sửa thông tin phòng</h1>
                <form action="" onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2} className='mui-grid-container-room'>
                    <Grid item lg={4} className='mui-grid-item-room'>
                        <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={formik.errors.tenPhong ? true : false}>
                            <InputLabel htmlFor="tenPhong">Tên phòng</InputLabel>
                            <Input id="tenPhong" aria-describedby="my-helper-text" {...formik.getFieldProps('tenPhong')}/>
                            {formik.touched.tenPhong && formik.errors.tenPhong ? <FormHelperText id="my-helper-text">{formik.errors.tenPhong}</FormHelperText> : <></>}
                        </FormControl>
                    </Grid>
                    <Grid item lg={4} className='mui-grid-item-room'>
                        <InputLabel htmlFor="hinhAnh">Hình Ảnh</InputLabel>
                        <img className="mb-2" src={preview? preview : formik.values.hinhAnh} alt="" style={{height: "5rem", display:"block"}}/>
                        <input type="file" onChange={handleChangeFile} style={{fontSize:"1rem"}}/>
                        <a target='_blank' href="https://imagecompressor.11zon.com/vi/image-compressor/compress-image-to-1mb.php">Nén ảnh</a>
                    </Grid>
                    <Grid item lg={4} className='mui-grid-item-room'>
                        <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={formik.errors.moTa ? true : false}>
                            <InputLabel htmlFor="moTa">Mô tả</InputLabel>
                            <Input id="moTa" aria-describedby="my-helper-text" {...formik.getFieldProps('moTa')}/>
                            {formik.touched.moTa && formik.errors.moTa ? <FormHelperText id="my-helper-text">{formik.errors.moTa}</FormHelperText> : <></>}
                        </FormControl>
                    </Grid>
                    <Grid item lg={4} className='mui-grid-item-room'>
                        <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={formik.errors.khach ? true : false}>
                            <InputLabel htmlFor="khach">Khách tối đa</InputLabel>
                            <Input id="khach" aria-describedby="my-helper-text" {...formik.getFieldProps('khach')}/>
                            {formik.touched.khach && formik.errors.khach ? <FormHelperText id="my-helper-text">{formik.errors.khach}</FormHelperText> : <></>}
                        </FormControl>
                    </Grid>
                    <Grid item lg={4} className='mui-grid-item-room'>
                        <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={formik.errors.phongNgu ? true : false}>
                            <InputLabel htmlFor="phongNgu">Phòng ngủ</InputLabel>
                            <Input id="phongNgu" aria-describedby="my-helper-text" {...formik.getFieldProps('phongNgu')}/>
                            {formik.touched.phongNgu && formik.errors.phongNgu ? <FormHelperText id="my-helper-text">{formik.errors.phongNgu}</FormHelperText> : <></>}
                        </FormControl>
                    </Grid>
                    <Grid item lg={4} className='mui-grid-item-room'>
                        <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={formik.errors.giuong ? true : false}>
                            <InputLabel htmlFor="giuong">Giường</InputLabel>
                            <Input id="giuong" aria-describedby="my-helper-text" {...formik.getFieldProps('giuong')}/>
                            {formik.touched.giuong && formik.errors.giuong ? <FormHelperText id="my-helper-text">{formik.errors.giuong}</FormHelperText> : <></>}
                        </FormControl>
                    </Grid>
                    <Grid item lg={4} className='mui-grid-item-room'>
                        <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={formik.errors.giaTien ? true : false}>
                            <InputLabel htmlFor="giaTien">Giá tiền</InputLabel>
                            <Input id="giaTien" aria-describedby="my-helper-text" {...formik.getFieldProps('giaTien')}/>
                            {formik.touched.giaTien && formik.errors.giaTien ? <FormHelperText id="my-helper-text">{formik.errors.giaTien}</FormHelperText> : <></>}
                        </FormControl>
                    </Grid>
                    <Grid item lg={4} className='mui-grid-item-room'>
                        <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={formik.errors.maViTri ? true : false}>
                            <InputLabel htmlFor="maViTri">Mã vị trí</InputLabel>
                            <Input id="maViTri" aria-describedby="my-helper-text" {...formik.getFieldProps('maViTri')}/>
                            {formik.touched.maViTri && formik.errors.maViTri ? <FormHelperText id="my-helper-text">{formik.errors.maViTri}</FormHelperText> : <></>}
                        </FormControl>
                    </Grid>
                    <Grid item lg={4} className='mui-grid-item-room'>
                        <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={formik.errors.phongTam ? true : false}>
                            <InputLabel htmlFor="phongTam">Phòng tắm</InputLabel>
                            <Input id="phongTam" aria-describedby="my-helper-text" {...formik.getFieldProps('phongTam')}/>
                            {formik.touched.phongTam && formik.errors.phongTam ? <FormHelperText id="my-helper-text">{formik.errors.phongTam}</FormHelperText> : <></>}
                        </FormControl>
                    </Grid>
                    </Grid>
                    <div className="selection-group-wrapper">
                        <div className="selection-group">
                            <InputLabel htmlFor="mayGiat">Máy giặt</InputLabel>
                            <NativeSelect id="mayGiat" value={mayGiat ? mayGiat : formik.values.mayGiat} onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                                setMayGiat(event.target.value);
                            }}>
                                <option value='true'>Có</option>
                                <option value='false'>Không</option>
                            </NativeSelect>
                        </div>
                        <div className="selection-group">
                            <InputLabel htmlFor="banLa">Bàn là</InputLabel>
                            <NativeSelect id="banLa" value={banLa ? banLa : formik.values.banLa} onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                                setBanLa(event.target.value);
                            }}>
                                <option value='true' >Có</option>
                                <option value='false'>Không</option>
                            </NativeSelect>
                        </div>
                        <div className="selection-group">
                            <InputLabel htmlFor="tivi">Tivi</InputLabel>
                            <NativeSelect id="tivi" value={tivi ? tivi : formik.values.tivi} onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                                setTivi(event.target.value);
                            }}>
                                <option value='true' >Có</option>
                                <option value='false'>Không</option>
                            </NativeSelect>
                        </div>
                        <div className="selection-group">
                            <InputLabel htmlFor="bep">Bếp</InputLabel>
                            <NativeSelect id="bep" value={bep ? bep : formik.values.bep} onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                                setBep(event.target.value);
                            }}>
                                <option value='true' >Có</option>
                                <option value='false'>Không</option>
                            </NativeSelect>
                        </div>
                        <div className="selection-group">
                            <InputLabel htmlFor="dieuHoa">Điều hòa</InputLabel>
                            <NativeSelect id="dieuHoa" value={dieuHoa ? dieuHoa : formik.values.dieuHoa} onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                                setDieuHoa(event.target.value);
                            }}>
                                <option value='true' >Có</option>
                                <option value='false'>Không</option>
                            </NativeSelect>
                        </div>
                        <div className="selection-group">
                            <InputLabel htmlFor="wifi">Wifi</InputLabel>
                            <NativeSelect id="wifi" value={wifi ? wifi : formik.values.wifi} onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                                setWifi(event.target.value);
                            }}>
                                <option value='true' >Có</option>
                                <option value='false'>Không</option>
                            </NativeSelect>
                        </div>
                        <div className="selection-group">
                            <InputLabel htmlFor="doXe">Đỗ xe</InputLabel>
                            <NativeSelect id="doXe" value={doXe ? doXe : formik.values.doXe} onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                                setDoXe(event.target.value);
                            }}>
                                <option value='true' >Có</option>
                                <option value='false'>Không</option>
                            </NativeSelect>
                        </div>
                        <div className="selection-group">
                            <InputLabel htmlFor="hoBoi">Hồ bơi</InputLabel>
                            <NativeSelect id="hoBoi" value={hoBoi ? hoBoi : formik.values.hoBoi} onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                                setHoBoi(event.target.value);
                            }}>
                                <option value='true' >Có</option>
                                <option value='false'>Không</option>
                            </NativeSelect>
                        </div>
                        <div className="selection-group">
                            <InputLabel htmlFor="banUi">Bàn ủi</InputLabel>
                            <NativeSelect id="banUi" value={banUi ? banUi : formik.values.banUi} onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                                setBanUi(event.target.value);
                            }}>
                                <option value='true' >Có</option>
                                <option value='false'>Không</option>
                            </NativeSelect>
                        </div>
                    </div>
                    <div className="button-group-admin-room">
                        <Button variant="contained" type='submit'>Sửa</Button>
                        <Button variant="contained" onClick={handleCloseUpdate}>Hủy</Button>
                    </div>
                </form>
        </div>
  )
}

export default RoomUpdateModal