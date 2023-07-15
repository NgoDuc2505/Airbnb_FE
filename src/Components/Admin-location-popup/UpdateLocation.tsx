//react
import { useDispatch } from 'react-redux';
//mui ui
import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
//css
import '../Admin-add-room-popup/addRoom.scss'
//formik
import { useFormik } from 'formik';
import * as Yup from 'yup';
//services
import { axiosInterceptor } from '../../services/services'
//swal
import swal from 'sweetalert';
//const
import { regex } from '../../constant/constant'
//redux store
import { AppDispatch } from '../../redux/store';
import { getLocationByPhanTrang } from '../../redux/Admin-slice/AdminLocationSlice'
//const
import { ILocationItem } from '../../constant/constant';
import { useEffect, useState } from 'react';

interface IProps {
    handleClose: () => void,
    id: number | undefined,
    data: ILocationItem,
    pageIndex: number
}

function UpdateLocation({ handleClose, id, data, pageIndex }: IProps) {
    const dispatch = useDispatch<AppDispatch>()
    const [file,setFile]= useState<File | null | Blob>(null)
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
            hinhAnh: `${data.hinhAnh}`,
            quocGia: `${data.quocGia}`,
            tenViTri: `${data.tenViTri}`,
            tinhThanh: `${data.tinhThanh}`,
        },
        validationSchema: Yup.object().shape({
            hinhAnh: Yup.string().required('This field have to be filled'),
            quocGia: Yup.string().required('This field have to be filled').matches(regex.nameByVietnamese, 'Invalid value!'),
            tenViTri: Yup.string().required('This field have to be filled'),
            tinhThanh: Yup.string().required('This field have to be filled').matches(regex.nameByVietnamese, 'Invalid value!'),
        }),
        onSubmit: async (values) => {
            try {
                await axiosInterceptor.put(`/api/vi-tri/${id}`, values)
                if(file !== null){
                    const formData = new FormData();
                    formData.append("formFile", file);
                    await axiosInterceptor.post(`/api/vi-tri/upload-hinh-vitri?maViTri=${data.id}`, formData)
                }
                dispatch(getLocationByPhanTrang({ pageIndex: pageIndex, keywords: "" }))
                swal(`Thành công cập nhật vị trí ${values.tenViTri}`, { icon: "success" })
                handleClose()
            } catch (error) {
                console.log(error)
                swal("Thất bại cập nhật vị trí, vui lòng kiểm tra lại thông tin!", { icon: "error" })
            }
        }
    })
    return (
        <div className='update-location-modal'>
            <form action="" className='admin-register-form' onSubmit={formik.handleSubmit}>
                <h1>Sửa vị trí</h1>
                <Grid container spacing={2} className='mui-grid-container-room'>
                    <Grid item lg={6} className='mui-grid-item-room'>
                        <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={formik.errors.tenViTri ? true : false}>
                            <InputLabel htmlFor="tenViTri">Tên vị trí</InputLabel>
                            <Input id="tenViTri" aria-describedby="my-helper-text" {...formik.getFieldProps('tenViTri')} />
                            {formik.errors.tenViTri && formik.touched ? <FormHelperText>{formik.errors.tenViTri}</FormHelperText> : <></>}
                        </FormControl>
                    </Grid>
                    <Grid item lg={6} className='mui-grid-item-room'>
                        <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={formik.errors.tinhThanh ? true : false}>
                            <InputLabel htmlFor="tinhThanh">Tỉnh thành</InputLabel>
                            <Input id="tinhThanh" aria-describedby="my-helper-text" {...formik.getFieldProps('tinhThanh')} />
                            {formik.errors.tinhThanh && formik.touched ? <FormHelperText>{formik.errors.tinhThanh}</FormHelperText> : <></>}
                        </FormControl>
                    </Grid>
                    <Grid item lg={6} className='mui-grid-item-room'>
                        <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={formik.errors.quocGia ? true : false}>
                            <InputLabel htmlFor="quocGia">Quốc gia</InputLabel>
                            <Input id="quocGia" aria-describedby="my-helper-text"{...formik.getFieldProps('quocGia')} />
                            {formik.errors.quocGia && formik.touched ? <FormHelperText>{formik.errors.quocGia}</FormHelperText> : <></>}
                        </FormControl>
                    </Grid>
                    <Grid item lg={6} className='mui-grid-item-room'>
                        <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={formik.errors.hinhAnh ? true : false}>
                            <InputLabel htmlFor="hinhAnh">Hình ảnh</InputLabel>
                            <Input id="hinhAnh" aria-describedby="my-helper-text" {...formik.getFieldProps('hinhAnh')} />
                            {formik.errors.hinhAnh && formik.touched ? <FormHelperText>{formik.errors.hinhAnh}</FormHelperText> : <></>}
                        </FormControl>
                    </Grid>
                    <Grid item lg={6} className='mui-grid-item-room'>
                        <img src={preview ? preview:formik.values.hinhAnh} alt="" />
                        <input type="file" onChange={handleChangeFile}/>
                    </Grid>
                </Grid>
                <div className="button-group-admin-room">
                    <Button variant="contained" color='info' type='submit'>Sửa</Button>
                    <Button variant="contained" color='warning' onClick={handleClose}>Hủy</Button>
                </div>
            </form>
        </div>
    )
}

export default UpdateLocation