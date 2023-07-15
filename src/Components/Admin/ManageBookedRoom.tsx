import * as React from 'react';
import { useState, useEffect, useRef } from 'react'
import './manage.scss'
//mui ui
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
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
import { axiosInterceptorWithCybertoken } from '../../services/services'
import swal from 'sweetalert';

function ManageBookedRoom() {
  const dispatch = useDispatch<AppDispatch>()
  const currentDataUser = useSelector((state: RootState) => state.sliceCurrent.currentCustomer)
  const currentDataRoom = useSelector((state: RootState) => state.sliceCurrent.currentBookedRoom)
  const bookingListData = useSelector((state: RootState) => { return state.sliceBookingAdmin.listBooking })
  const [open, setOpen] = React.useState(false);
  const [valueInput, setValueInput] = useState<number | string>()
  const [searchArr, setArr] = useState<IBookRoom[]>([])
  const btn = useRef<HTMLButtonElement | null>(null)
  useEffect(() => {
    dispatch(getListBookedRoom())
  }, [])
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const rows = [
    {
      id: -1,
      maPhong: -1,
      ngayDen: "no data",
      ngayDi: "no data",
      soLuongKhach: 0,
      maNguoiDung: -1,
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
          try {
            swal({
              title: "Bạn có chắc chắn muốn xóa đơn này?",
              text: "Không thể quay lại sau khi xóa",
              icon: "warning",
              buttons: [
                'Không xóa',
                'Xóa!'
              ],
              dangerMode: true,
            }).then(function (isConfirm) {
              if (isConfirm) {
                swal({
                  title: 'Xóa thành công!',
                  text: `Đơn đặt phòng với id ${params.row.id} đã bị xóa`,
                  icon: 'success'
                }).then(async () => {
                  await axiosInterceptorWithCybertoken.delete(`/api/dat-phong/${params.row.id}`);
                  await dispatch(getListBookedRoom())
                  btn.current?.click()
                });
              } else {
                swal("Hủy thành công", `Đơn đặt phòng với id ${params.row.id} chưa bị xóa`, "error");
              }
            })

          } catch (error) {
            console.log(error)
            swal("Thất bại, xóa thất bại!", {
              icon: "error",
            });
          }
        };
        return (
          <div className="button-group">
            <Button disabled={bookingListData?.length > 0 ? false : true} variant="contained" onClick={onClick}>Xem chi tiết</Button>
            <Button disabled={bookingListData?.length > 0 ? false : true} variant="contained" color='error' onClick={onClick2}>Hủy đơn</Button>
          </div>
        );
      }
    }
  ];
  const newRows: IBookRoom[] = bookingListData?.length > 0 ? bookingListData : rows
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value)
  }


  const handleSearchRoom = () => {
    if (valueInput !== "") {
      const arraySearch: IBookRoom[] = newRows.filter((item) => {
        return item.maPhong === Number(valueInput)
      })
      setArr(arraySearch)
    } else {
      setArr(newRows)
    }
  }
  return (
    <div className='manage-booked-room'>
      <Container fixed={true} className='mui-container-manage'>
        <div className="search-user">
          <TextField id="outlined-basic" label="Tìm phòng đặt qua mã phòng" variant="filled" className='input-search' onChange={handleChangeValue} />
          <button onClick={handleSearchRoom} ref={btn}>Tìm</button>
        </div>
        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={searchArr.length > 0 ? searchArr : newRows}
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
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <BookedRoomModal currentDataRoom={currentDataRoom} currentDataUser={currentDataUser} />
          </Modal>
        </Box>
      </Container>
    </div>
  )
}

export default ManageBookedRoom