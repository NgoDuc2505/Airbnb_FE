
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './adminRegister.scss'
import { IProfile } from '../../constant/constant'
interface IProps {
    personData: IProfile,
    closeModal: () => void,
    openUpdate: () => void
}

export default function PersonModal({ personData, closeModal, openUpdate }: IProps) {
    return (
        <div className="card-detail">
            <Card sx={{ width: 500, height: 620 }} className='card-wrapper'>
                <CardMedia
                    sx={{ height: 300 }}
                    image={personData.avatar ? personData.avatar : 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=1380&t=st=1688393572~exp=1688394172~hmac=815045c69ac370508646eb2d6d759a7ae12ca10a4f3e0ea6083c11c42c2617e7'}
                    title={`Avatar của ${personData.name}`}
                />
                <CardContent className='mui-card-content'>
                    <Typography gutterBottom variant="h2" component="div">
                        {personData.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className='mui-typography-card'>
                        <h4>Thông tin cá nhân:</h4>
                        <ul>
                            <li>Ngày sinh: <span>{personData.birthday}</span> </li>
                            <li>Email: <span>{personData.email}</span> </li>
                            <li>Giới tính: <span>{personData.gender ? 'Nam' : 'Nữ'}</span></li>
                            <li>Số điện thoại: <span>{personData.phone}</span></li>
                            <li>Mật khẩu: <span>{personData.password}</span></li>
                            <li>Quyền: <span>{personData.role}</span></li>
                        </ul>
                    </Typography>
                </CardContent>
                <CardActions className='btn-group-card'>
                    <Button size="large" onClick={()=>{openUpdate(); closeModal()}}>Sửa</Button>
                    <Button size="large" onClick={closeModal}>Đóng</Button>
                </CardActions>
            </Card>
        </div>
    );
}