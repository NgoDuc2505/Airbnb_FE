import * as React from 'react';
import { ACCESS_USER_ID, IComment } from '../../constant/constant';
import { useFormik } from 'formik';
import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import * as Yup from 'yup';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import { getLocal } from '../../utils/utils';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCommentByRoomId } from '../../redux/Comment-slice/CommentSlice';
import { AppDispatch } from '../../redux/store'
import { axiosInterceptor } from '../../services/services'

interface IProps{
    currentComment: IComment | any
    limit: boolean
}

export const checkIfImageExists = (url: string): string => {
    return url === "" ? "/src/assets/Image/emptyAva.jpg": url
}

export function Comment({currentComment, limit} : IProps){ 
    return ( 
        <div className='detail-comment-user'>
            <div className='detail-comment-avatar'>
                <img src={checkIfImageExists(currentComment.avatar)} alt="" />
                <div>
                    <h3>{currentComment.tenNguoiBinhLuan}</h3>
                    <p>{currentComment.ngayBinhLuan}</p>
                </div>
            </div>
            <p className='comment-description'>
                {limit ? currentComment.noiDung.slice(0, 300) + (currentComment.noiDung.length > 50 ? "..." : "") : currentComment.noiDung}
            </p>
        </div>
    )
}

interface IPropsSlider{
    classes: string | any
}

export function CommentSlider({classes}: IPropsSlider){
    return(
    <div className={classes}> 
        <div className='col-md-6 col-sm-12 d-flex justify-content-between align-items-center mb-2'>
            <p>Cleanliness</p>
            <div className='comment-slider'>
                <div></div>
                <p>4.9</p>
            </div>
        </div> 
        <div className='col-md-6 col-sm-12 d-flex justify-content-between align-items-center pl-md-5 mb-2'>
            <p>Accuracy</p>
            <div className='comment-slider'>
                <div></div>
                <p>4.9</p>
            </div>
        </div> 
        <div className='col-md-6 col-sm-12 d-flex justify-content-between align-items-center mb-2'>
            <p>Communication</p>
            <div className='comment-slider'>
                <div></div>
                <p>4.9</p>
            </div>
        </div> 
        <div className='col-md-6 col-sm-12 d-flex justify-content-between align-items-center pl-md-5 mb-2'>
            <p>Location</p>
            <div className='comment-slider'>
                <div></div>
                <p>4.9</p>
            </div>
        </div> 
        <div className='col-md-6 col-sm-12 d-flex justify-content-between align-items-center mb-2'>
            <p>Check-in</p>
            <div className='comment-slider'>
                <div></div>
                <p>4.9</p>
            </div>
        </div> 
        <div className='col-md-6 col-sm-12 d-flex justify-content-between align-items-center pl-md-5 mb-2'>
            <p>Value</p>
            <div className='comment-slider'>
                <div></div>
                <p>4.9</p>
            </div>
        </div> 
    </div>
    )
}


export function CommentBox() { 
    const dispatch = useDispatch<AppDispatch>()
    const idRoom = useParams()
    const [starvalue, setValue] = React.useState<number | null>(0);
    const formik = useFormik({ 
        initialValues: {
            comment:'',
            star: 0
        },
        validationSchema:Yup.object().shape({
            comment: Yup.string().required('Comment can not be empty'),
            star: Yup.number().moreThan(0)
        }),
        onSubmit: async (values: any) => {
        try{
            if (getLocal(ACCESS_USER_ID)){             
                const value = {
                    maPhong: idRoom.idDetail,
                    maNguoiBinhLuan: getLocal(ACCESS_USER_ID),
                    ngayBinhLuan: new Date(),
                    noiDung: values.comment,
                    saoBinhLuan: values.star
                }   
                await axiosInterceptor.post('/api/binh-luan',value)
                dispatch(getCommentByRoomId(String(idRoom.idDetail)))
            }
            
            swal("Comment thành công!", {icon: "success"})
        }catch(error){
            console.log(error)
            swal("Comment thất bại!", {icon: "error"})
        }
        }
    })
    return (
        <form action="" className='comment-form' onSubmit={formik.handleSubmit}>
            <FormControl variant='standard' className='mui-form-control' margin='dense' error={formik.errors.comment ? true : false}>
                <InputLabel htmlFor="my-input-comment">Comment</InputLabel>
                <Input id="my-input-comment" aria-describedby="my-helper-text" {...formik.getFieldProps('comment')} />
                {formik.touched.comment && formik.errors.comment ? <FormHelperText id="my-helper-text">{`${formik.errors.comment}`}</FormHelperText> : <></>}
            </FormControl>
            
            <h3 className='mt-3'>Số sao đánh giá</h3>
            <Rating
                className='rating-star'
                name="simple-controlled"
                value={starvalue}
                onChange={(event, newValue) => {
                    formik.values.star = newValue
                    setValue(newValue);
                }}
            />
            <div className='helper-text-star-rating'>
                {starvalue === 0 ? <FormHelperText id="my-helper-text">Bạn chưa đánh giá sao</FormHelperText> : <></>}
            </div>
            <div className="form-button-group">
                <Button variant="outlined" type='submit'>Comment</Button>
            </div>
        </form>
    )
}