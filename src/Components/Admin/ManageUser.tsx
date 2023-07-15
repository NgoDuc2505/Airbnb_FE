//react
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
//mui ui
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Container from '@mui/material/Container';
import AdminRegister from '../Admin-register-popup/AdminRegister';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
//css
import './manage.scss'
//Modal
import PersonModal from '../Admin-register-popup/PersonDetailModal';
import PersonUpdateModal from '../Admin-register-popup/PersonUpdateModal';
//redux
import { deleteUserFromList, getUserByPhanTrang } from '../../redux/Admin-slice/AdminUserSlice';
import { AppDispatch, RootState } from '../../redux/store';
//services
import { axiosInterceptorWithCybertoken } from '../../services/services';
//swal
import swal from 'sweetalert';

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
      const dispatch = useDispatch<AppDispatch>()
      const [show, setShow] = React.useState(false)
      const [showUpdate, setShowUpdate] = React.useState(false)
      const onClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setShow(true)
      };
      const onClick2 = (e: React.MouseEvent) => {
        e.stopPropagation()
        setShowUpdate(true)
      };
      const onClick3 = (e: React.MouseEvent) => {
        e.stopPropagation()
        try{ 
          swal({
            title: "Bạn có chắc chắn muốn xóa người này?",
            text: "Không thể quay lại sau khi xóa",
            icon: "warning",
            buttons: [
              'Không xóa',
              'Xóa!'
            ],
            dangerMode: true,
          }).then(function(isConfirm) {
            if (isConfirm) {
              swal({
                title: 'Xóa thành công!',
                text: `Người dùng với id ${params.row.id} đã bị xóa`,
                icon: 'success'
              }).then(async() => {
                  await axiosInterceptorWithCybertoken.delete(`/api/users?id=${params.row.id}`);
                  dispatch(deleteUserFromList([params.row.id]))
              });
            } else {
              swal("Hủy thành công",  `Người dùng với id ${params.row.id} chưa bị xóa`, "error");
            }
          })
          
        } catch(error) { 
          console.log(error)
          swal("Thất bại, tại khoản xóa thất bại!", {
            icon: "error",
          });
        }
      };
      return (
        <div className="button-group">
          <Button variant="contained" onClick={onClick}>Xem chi tiết</Button>
          <Button variant="contained" onClick={onClick2} color='info'>Sửa</Button>
          <Button variant="contained" onClick={onClick3} color='error'>Xóa</Button>
          <Modal
            open={show}
            onClose={()=> setShow(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <PersonModal personData={params.row} closeModal={()=>{setShow(false)}} openUpdate={()=>{setShowUpdate(true)}}/>
          </Modal>
          <Modal
            open={showUpdate}
            onClose={()=> setShowUpdate(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <PersonUpdateModal personData={params.row} handleCloseModal={()=>{setShowUpdate(false)}}/>
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
];



function ManageUser() {
  const dispatch  = useDispatch<AppDispatch>()
  const refSearch = React.useRef<HTMLInputElement>();
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1)
  const [searchKey, setSearchKey] = React.useState("")
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dataRetrieve = useSelector((state: RootState)=>state.sliceUserAdmin.currentUserbyPhanTrang)
  const newRows = dataRetrieve.data ? dataRetrieve.data : rows 

  
  React.useEffect(() => { 
    dispatch(getUserByPhanTrang({pageIndex: page, keywords: searchKey}))
  }, [page, searchKey])

  const handleChangePagination = (e: React.ChangeEvent<unknown>, page: number) => {
    setPage(page)
    return e.target
 }

  return (
    <div className='manage-user'>
      <Container fixed={true} className='mui-container-manage'>
        <Button className='button-add-admin' onClick={handleOpen}>Đăng ký quản trị viên</Button>
        <div className="search-user">
          <TextField inputRef={refSearch} id="outlined-basic" label="Tìm tài khoản qua tên" variant="outlined" className='input-search' />
          <button onClick={() => { 
            const keyword = (refSearch.current as unknown) as HTMLInputElement
            setSearchKey(keyword.value)
          }}>Tìm</button>
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
          rows={newRows}
          columns={columns}
          checkboxSelection
          hideFooterPagination={true}
          hideFooter={true}
          sx={{ fontSize: '1.4rem', height:475 }}
        />
        <Pagination onChange={handleChangePagination} count={Math.ceil(dataRetrieve.totalRow/dataRetrieve.pageSize)} variant="outlined" sx={{ marginTop: '1rem', marginRight: '5%', justifyContent: 'flex-end', display: 'flex' }} />
      </Container>
    </div>
  )
}

export default ManageUser