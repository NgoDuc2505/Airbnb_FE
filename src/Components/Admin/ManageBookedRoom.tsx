import * as React from 'react';
import { useState, useEffect } from 'react'
import './manage.scss'
//mui ui
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
//const
import { IBookRoom } from '../../constant/constant'
import { useDispatch, useSelector } from 'react-redux';
//store
import { RootState, AppDispatch } from '../../redux/store'
import { getCurrentCustomerById, getCurrentBookedRoomById } from '../../redux/Current-detail/currentDetailManage'
import BookedRoomModal from '../Admin-booked-room-popup/BookedRoomModal';
import { getListBookedRoom } from '../../redux/Admin-slice/AdminBookingSlice'

function ManageBookedRoom() {
  const dispatch = useDispatch<AppDispatch>()
  const currentDataUser = useSelector((state: RootState) => state.sliceCurrent.currentCustomer)
  const currentDataRoom = useSelector((state: RootState) => state.sliceCurrent.currentBookedRoom)
  const bookingListData = useSelector((state:RootState) =>{return state.sliceBookingAdmin.listBooking})
  const [open, setOpen] = React.useState(false);
  useEffect(()=>{
    dispatch(getListBookedRoom())
  },[])
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const rows = [
    {
      id: 1525,
      maPhong: 14,
      ngayDen: "2023-02-28T00:00:00",
      ngayDi: "2023-03-03T00:00:00",
      soLuongKhach: 4,
      maNguoiDung: 2177
    },
    {
      id: 1536,
      maPhong: 11,
      ngayDen: "2023-02-01T00:00:00",
      ngayDi: "2023-02-01T00:00:00",
      soLuongKhach: 2,
      maNguoiDung: 2199
    },
    {
      id: 1540,
      maPhong: 6,
      ngayDen: "2023-01-31T00:00:00",
      ngayDi: "2023-02-04T00:00:00",
      soLuongKhach: 1,
      maNguoiDung: 2136
    },
    {
      id: 1670,
      maPhong: 10,
      ngayDen: "2023-02-07T00:00:00",
      ngayDi: "2023-06-15T00:00:00",
      soLuongKhach: 2,
      maNguoiDung: 2769
    },
    {
      id: 1678,
      maPhong: 7,
      ngayDen: "2023-02-07T00:00:00",
      ngayDi: "2023-02-07T00:00:00",
      soLuongKhach: 1,
      maNguoiDung: 1
    },
    {
      id: 1679,
      maPhong: 10,
      ngayDen: "2023-02-07T00:00:00",
      ngayDi: "2023-02-25T00:00:00",
      soLuongKhach: 2,
      maNguoiDung: 1
    },
    {
      id: 1680,
      maPhong: 13,
      ngayDen: "2023-02-01T00:00:00",
      ngayDi: "2023-02-07T00:00:00",
      soLuongKhach: 1,
      maNguoiDung: 1
    },
    {
      id: 1681,
      maPhong: 13,
      ngayDen: "2023-02-07T00:00:00",
      ngayDi: "2023-02-07T00:00:00",
      soLuongKhach: 1,
      maNguoiDung: 1
    },
    {
      id: 1682,
      maPhong: 13,
      ngayDen: "2023-02-07T00:00:00",
      ngayDi: "2023-02-07T00:00:00",
      soLuongKhach: 1,
      maNguoiDung: 1
    },
    {
      id: 1683,
      maPhong: 13,
      ngayDen: "2023-02-07T00:00:00",
      ngayDi: "2023-02-07T00:00:00",
      soLuongKhach: 1,
      maNguoiDung: 1
    },
    {
      id: 1684,
      maPhong: 13,
      ngayDen: "2023-02-07T00:00:00",
      ngayDi: "2023-02-07T00:00:00",
      soLuongKhach: 1,
      maNguoiDung: 1
    },
    {
      id: 1685,
      maPhong: 13,
      ngayDen: "2023-02-07T00:00:00",
      ngayDi: "2023-02-07T00:00:00",
      soLuongKhach: 1,
      maNguoiDung: 1
    },
    {
      id: 1686,
      maPhong: 13,
      ngayDen: "2023-02-07T00:00:00",
      ngayDi: "2023-02-07T00:00:00",
      soLuongKhach: 1,
      maNguoiDung: 1
    },
    {
      id: 1689,
      maPhong: 13,
      ngayDen: "2023-02-07T00:00:00",
      ngayDi: "2023-02-07T00:00:00",
      soLuongKhach: 1,
      maNguoiDung: 1
    },
    {
      id: 1690,
      maPhong: 13,
      ngayDen: "2023-02-07T00:00:00",
      ngayDi: "2023-02-07T00:00:00",
      soLuongKhach: 1,
      maNguoiDung: 1
    },
    {
      id: 1691,
      maPhong: 13,
      ngayDen: "2023-02-07T00:00:00",
      ngayDi: "2023-02-07T00:00:00",
      soLuongKhach: 1,
      maNguoiDung: 1
    },
    {
      id: 1692,
      maPhong: 13,
      ngayDen: "2023-02-07T00:00:00",
      ngayDi: "2023-02-07T00:00:00",
      soLuongKhach: 1,
      maNguoiDung: 1
    },
    {
      id: 1693,
      maPhong: 13,
      ngayDen: "2023-02-07T00:00:00",
      ngayDi: "2023-02-07T00:00:00",
      soLuongKhach: 1,
      maNguoiDung: 1
    },
  ]
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'id', width: 90, align: 'center', headerAlign: 'center' },
    { field: 'maPhong', headerName: 'Mã phòng', width: 100, headerAlign: 'center', align: 'center' },
    {
      field: 'ngayDen', headerName: 'Ngày đến', width: 180, align: 'center', headerAlign: 'center'
    },
    {
      field: 'ngayDi',
      headerName: 'Ngày đi',
      width: 180,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'soLuongKhach',
      headerName: 'Số lượng khách',
      type: 'number',
      width: 120,
      align: 'center'
    },
    {
      field: 'maNguoiDung',
      headerName: 'Mã khách hàng',
      width: 120,
      align: 'center'
    },
    {
      field: "action",
      type: 'actions',
      headerName: "Action",
      headerAlign: 'center',
      align: 'center',
      width: 300,
      sortable: false,
      renderCell: (params) => {
        const onClick = (e: React.MouseEvent) => {
          e.stopPropagation()
          dispatch(getCurrentCustomerById(params.row.maNguoiDung))
          dispatch(getCurrentBookedRoomById(params.row.maPhong))
          handleOpen()
        };
        const onClick2 = (e: React.MouseEvent) => {
          e.stopPropagation()
          console.log(e, params.row.id)
        };
        return (
          <div className="button-group">
            <Button variant="contained" onClick={onClick}>Xem chi tiết</Button>
            <Button variant="contained" color='error' onClick={onClick2}>Hủy đơn</Button>
          </div>
        );
      }
    }
  ];
  const newRows:IBookRoom[] = bookingListData?.length >0 ? bookingListData : rows
  return (
    <div className='manage-booked-room'>
      <Container fixed={true} className='mui-container-manage'>
        <div className="search-user">
          <TextField id="outlined-basic" label="Tìm phòng đặt qua id" variant="filled" className='input-search' />
          <button>Tìm</button>
        </div>
        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={newRows}
            columns={columns}
            checkboxSelection
            sx={{ fontSize: '1.4rem', width: "100%" }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 7,
                },
              },
            }}
            pageSizeOptions={[7, 10]}
            className='mui-grid-user'
          />
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
         <BookedRoomModal currentDataRoom={currentDataRoom} currentDataUser={currentDataUser}/>
        </Modal>
      </Container>
    </div>
  )
}

export default ManageBookedRoom