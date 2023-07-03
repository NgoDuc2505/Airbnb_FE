import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Container from '@mui/material/Container';
import './manage.scss'
import AdminRegister from '../Admin-register-popup/AdminRegister';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import PersonModal from '../Admin-register-popup/PersonDetailModal';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Mã', width: 70, align: 'center', headerAlign: 'center' },
  { field: 'name', headerName: 'Tên', width: 200, align: 'center', headerAlign: 'center' },
  { field: 'avatar', headerName: 'Hình ảnh', width: 180, align: 'center', headerAlign: 'center', 
  renderCell: (params)=>{ return <Avatar alt="Remy Sharp" src={params.row.avatar} />}
},
  {
    field: 'role',
    headerName: 'Role',
    width: 100,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: "action",
    headerName: "Action",
    width: 300,
    sortable: false,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      const [show, setShow] = React.useState(false)
      const onClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setShow(true)
        console.log(e, params)
      };
      const onClick2 = (e: React.MouseEvent) => {
        e.stopPropagation()
        console.log(e, params.row.id)
      };
      const onClick3 = (e: React.MouseEvent) => {
        e.stopPropagation()
        console.log(e, params.row.id)
      };
      return (
        <div className="button-group">
          <Button variant="contained" onClick={onClick}>Xem chi tiết</Button>
          <Button variant="contained" onClick={onClick2}>Sửa</Button>
          <Button variant="contained" onClick={onClick3}>Xóa</Button>
          <Modal
            open={show}
            onClose={()=> setShow(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <PersonModal personData={params.row} closeModal={()=>{setShow(false)}}/>
          </Modal>
        </div>
      );
    }
  }
];

const rows = [
  {
    id: 1,
    name: "admin",
    email: "admin@gmail.com",
    password: "1234",
    phone: "111",
    birthday: "29/11/1993",
    avatar: "http://sc04.alicdn.com/kf/Hc3e61591078043e09dba7808a6be5d21n.jpg",
    gender: true,
    role: "ADMIN"
  },
  {
    id: 3016,
    name: "Khoa D Nguyedsadasdndsa",
    email: "dkhoa2019vn@gmail.com",
    password: "123@ccc",
    phone: "+61403256875",
    birthday: "28-6-2023",
    avatar: "",
    gender: false,
    role: "USER"
  },
  {
    id: 3019,
    name: "nguyen van k",
    email: "nguyenvank@gmail.com",
    password: "123456789",
    phone: "",
    birthday: "14-06-2023",
    avatar: "",
    gender: true,
    role: "USER"
  },
  {
    id: 3020,
    name: "Ngo Duc",
    email: "ngoduc2505@gmail.com",
    password: "25052002Duc@",
    phone: "0364643405",
    birthday: "25-5-2002",
    avatar: "",
    gender: true,
    role: "USER"
  },
  {
    id: 3021,
    name: "Ngô Hoàng Phúc",
    email: "phuc204@gmail.com",
    password: "25052002Duc@",
    phone: "0364643405",
    birthday: "3-6-2023",
    avatar: "",
    gender: true,
    role: "USER"
  },
  {
    id: 3022,
    name: "minhtu",
    email: "tuminhvo98@gmail.com",
    password: "Minhtu123",
    phone: "0123456789",
    birthday: "08/01/1998",
    avatar: "https://airbnbnew.cybersoft.edu.vn/avatar/30-06-2023-07-00-18-351100179_646283387406994_2654810799033263422_n.jpg",
    gender: false,
    role: "ADMIN"
  },
  {
    id: 3023,
    name: "abc",
    email: "giahuyzz11@gmail.com",
    password: "minhtu123",
    phone: "0981231231",
    birthday: "2023-07-06",
    avatar: "",
    gender: true,
    role: "USER"
  },
  {
    id: 3024,
    name: "ductan",
    email: "ductan@gmail.com",
    password: "123456",
    phone: "0123456789",
    birthday: "10/11/1996",
    avatar: "",
    gender: true,
    role: "USER"
  }
];
function ManageUser() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangePagination = (e: React.ChangeEvent<unknown>, page: number) => {
    console.log(e, page)
}
  return (
    <div className='manage-user'>
      <Container fixed={true} className='mui-container-manage'>
        <Button className='button-add-admin' onClick={handleOpen}>Đăng ký quản trị viên</Button>
        <div className="search-user">
          <TextField id="outlined-basic" label="Outlined" variant="outlined" className='input-search' />
          <button>Tìm</button>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <AdminRegister handleCloseModal={handleClose} />
        </Modal>
        <DataGrid
          className='mui-grid-user'
          rows={rows}
          columns={columns}
          checkboxSelection
          hideFooterPagination={true}
          hideFooter={true}

          sx={{ fontSize: '1.4rem' }}
        />
        <Pagination onChange={handleChangePagination} count={10} variant="outlined" sx={{ marginTop: '1rem', marginRight: '5%', justifyContent: 'flex-end', display: 'flex' }} />
      </Container>
    </div>
  )
}

export default ManageUser