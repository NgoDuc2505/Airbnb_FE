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
//Modal
import AddNewLocation from '../Admin-location-popup/AddNewLocation';
import UpdateLocation from '../Admin-location-popup/UpdateLocation';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { ILocationItem } from '../../constant/constant';


function ManageLocation() {
    const dispatch  = useDispatch<AppDispatch>()
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(1)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [show, setShow] = React.useState(false)
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Mã', width: 70, align: 'center', headerAlign: 'center' },
        { field: 'tenViTri', headerName: 'Tên vị trí', width: 200, align: 'center', headerAlign: 'center' },
        {
            field: 'hinhAnh', headerName: 'Hình ảnh', width: 180, align: 'center', headerAlign: 'center',
            renderCell: (params) => { return <Avatar alt="Remy Sharp" src={params.row.hinhAnh} /> }
        },
        {
            field: 'tinhThanh',
            headerName: 'Tỉnh thành',
            width: 100,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'quocGia',
            headerName: 'Quốc gia',
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
              
                const onClick2 = (e: React.MouseEvent) => {
                    e.stopPropagation()
                    setShow(true)
                    console.log(e, params.row.id)
                };
                const onClick3 = (e: React.MouseEvent) => {
                    e.stopPropagation()
                    console.log(e, params.row.id)
                };
                return (
                    <div className="button-group">
                        <Button variant="contained" onClick={onClick2} color='info'>Sửa</Button>
                        <Button variant="contained" onClick={onClick3} color='error'>Xóa</Button>
                    </div>
                );
            }
        }
    ];
    const rows:ILocationItem[] = [
        {
            id: 1,
            tenViTri: "Quận 1",
            tinhThanh: "Hồ Chí Minh",
            quocGia: "Việt Nam",
            hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/vt1.jpg"
          },
          {
            id: 2,
            tenViTri: "Cái Răng",
            tinhThanh: "Cần Thơ",
            quocGia: "Việt Nam",
            hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/vt2.jpg"
          },
          {
            id: 3,
            tenViTri: "Hòn Rùa",
            tinhThanh: "Nha Trang",
            quocGia: "Việt Nam",
            hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/vt3.jpg"
          },
          {
            id: 4,
            tenViTri: "Hoàn Kiếm",
            tinhThanh: "Hà Nội",
            quocGia: "Việt Nam",
            hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/vt4.jpg"
          },
          {
            id: 5,
            tenViTri: "Hòn Tằm",
            tinhThanh: "Phú Quốc",
            quocGia: "Việt Nam",
            hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/vt5.jpg"
          },
          {
            id: 6,
            tenViTri: "Hải Châu",
            tinhThanh: "Đà Nẵng",
            quocGia: "Việt Nam",
            hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/vt6.jpg"
          },
          {
            id: 7,
            tenViTri: "Langbiang",
            tinhThanh: "Đà Lạt",
            quocGia: "Việt Nam",
            hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/vt7.jpg"
          },
          {
            id: 8,
            tenViTri: "Mũi Né",
            tinhThanh: "Phan Thiết",
            quocGia: "Việt Nam",
            hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/vt8.jpg"
          },
          {
            id: 1675,
            tenViTri: "Chợ Nha Mân",
            tinhThanh: "Đồng Tháp ",
            quocGia: "Việt Nam",
            hinhAnh: "https://airbnbnew.cybersoft.edu.vn/avatar/15-06-2023-03-11-34-cho.jpg"
          },
    ]
    const handleChangePagination = (e: React.ChangeEvent<unknown>, page: number) => {
        setPage(page)
     }
    return (
        <div className='manage-location'>
            <Container fixed={true} className='mui-container-manage'>
                <Button className='button-add-admin' onClick={handleOpen}>Thêm mới vị trí</Button>
                <div className="search-user">
                    <TextField id="outlined-basic" label="Tìm theo tên" variant="outlined" className='input-search' />
                    <button>Tìm</button>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <AddNewLocation handleClose={handleClose}/>
                </Modal>
                <Modal
                    open={show}
                    onClose={()=>{setShow(false)}}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <UpdateLocation handleClose={()=>{setShow(false)}}/>
                </Modal>
                <DataGrid
                    className='mui-grid-user'
                    rows={rows}
                    columns={columns}
                    checkboxSelection
                    hideFooterPagination={true}
                    hideFooter={true}
                    sx={{ fontSize: '1.4rem', height: 475 }}
                />
                <Pagination onChange={handleChangePagination} count={10} variant="outlined" sx={{ marginTop: '1rem', marginRight: '5%', justifyContent: 'flex-end', display: 'flex' }} />
            </Container>
        </div>
    )
}

export default ManageLocation