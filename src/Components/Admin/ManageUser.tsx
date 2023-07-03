import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Container from '@mui/material/Container';
import './manage.scss'
import AdminRegister from '../Admin-register-popup/AdminRegister';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
const columns: GridColDef[] = [
  { field: 'id', headerName: 'Mã', maxWidth: 70 },
  { field: 'name', headerName: 'Tên', maxWidth: 130 },
  { field: 'ava', headerName: 'Hình ảnh', maxWidth: 130 },
  {
    field: 'role',
    headerName: 'Role',
    maxWidth: 90,
  },
  {
    field: "action",
    headerName: "Action",
    width: 300,
    sortable: false,
    renderCell: (params) => {
      const onClick = (e: React.MouseEvent) => {
        e.stopPropagation()
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
        </div>
      );
    }
  }
];

const rows = [
  { id: 1, name: 'duc', ava: 'hinh1', role: 'USER' },
  { id: 6, name: 'duc', ava: 'hinh1', role: 'USER' },
  { id: 8, name: 'duc', ava: 'hinh1', role: 'USER' },
  { id: 67, name: 'duc', ava: 'hinh1', role: 'USER' },
  { id: 63, name: 'duc', ava: 'hinh1', role: 'USER' },
  { id: 82, name: 'duc', ava: 'hinh1', role: 'USER' },
  { id: 83, name: 'duc minh ngo ngo minh duc', ava: 'hinh1', role: 'USER' },
];
function ManageUser() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className='manage-user'>
      <Container fixed={true} className='mui-container-manage'>
      <Button className='button-add-admin' onClick={handleOpen}>Đăng ký quản trị viên</Button>
      <div className="search-user">
      <TextField id="outlined-basic" label="Outlined" variant="outlined" className='input-search'/>
      <button>Tìm</button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       <AdminRegister handleCloseModal = {handleClose}/>
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
      <Pagination count={10} variant="outlined" sx={{ marginTop: '1rem', marginRight: '5%', justifyContent: 'flex-end', display: 'flex' }} />
      </Container>
    </div>
  )
}

export default ManageUser