import * as React from 'react';
import { useState } from 'react'
import './manage.scss'
//mui ui
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
//component
import AddRoom from '../Admin-add-room-popup/AddRoom';
//const
import { ACCESS_TOKEN, IRoomDetail } from '../../constant/constant';
//modal
import DetailRoom from '../Admin-add-room-popup/DetailRoom';
import RoomUpdateModal from '../Admin-add-room-popup/RoomUpdateModal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getRoomByPhanTrang } from '../../redux/Admin-slice/AdminRoomSlice';
import swal from 'sweetalert';
import { axiosInterceptorWithCybertoken } from '../../services/services';
import { getLocal } from '../../utils/utils';

const initState: IRoomDetail = {
    id: 0,
    tenPhong: "NewApt D1 - Cozy studio - NU apt - 500m Bui Vien!",
    khach: 3,
    phongNgu: 1,
    giuong: 1,
    phongTam: 1,
    moTa: "Tự nhận phòng cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.",
    giaTien: 28,
    mayGiat: true,
    banLa: true,
    tivi: true,
    dieuHoa: false,
    wifi: true,
    bep: false,
    doXe: true,
    hoBoi: true,
    banUi: true,
    maViTri: 1,
    hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/phong3.jpg"
}
function ManageRoom() {
    const dispatch  = useDispatch<AppDispatch>()
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(1)
    const [searchKey, setSearchKey] = React.useState("")
    const refSearch = React.useRef<HTMLInputElement>();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

        
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Mã phòng', width: 90, align: 'center' },
        { field: 'tenPhong', headerName: 'Tên phòng', width: 300, headerAlign:'center' },
        {
            field: 'hinhAnh', headerName: 'Hình ảnh', width: 130, renderCell: (params) => {
                return <Avatar alt="Remy Sharp" src={params.row.hinhAnh} />
            }, align: 'center' , headerAlign:'center'
        },
        {
            field: 'maViTri',
            headerName: 'Mã địa điểm',
            type: 'number',
            width: 100,
            align: 'center'
        },
        {
            field: 'khach',
            headerName: 'Tối đa khách',
            type: 'number',
            width: 100,
            align: 'center'
        },
        {
            field: "action",
            headerName: "Action",
            headerAlign:'center',
            align:'center',
            width: 300,
            sortable: false,
            renderCell: (params) => {
                const [show, setShow] = useState<boolean>(false)
                const [showUpdate,setShowUpdate] = useState<boolean>(false)
                const handleShow = () => setShow(true);
                const handleShowOff = () => setShow(false)
                const onClick = (e: React.MouseEvent) => {
                    e.stopPropagation()
                    handleShow()
                    console.log(e, params)
                };
                const onClick2 = (e: React.MouseEvent) => {
                    e.stopPropagation()
                    setShowUpdate(true)
                    console.log(e, params.row.id)
                };
                const onClick3 = (e: React.MouseEvent) => {
                    e.stopPropagation()
                    try{ 
                        swal({
                          title: "Bạn có chắc chắn muốn xóa phòng này?",
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
                              text: `Tên phòng với id ${params.row.id} đã bị xóa`,
                              icon: 'success'
                            }).then(async() => {
                                await axiosInterceptorWithCybertoken.delete(`/api/phong-thue/${params.row.id}`, {
                                    headers: {
                                        token: getLocal(ACCESS_TOKEN)
                                    }
                                });
                                dispatch(getRoomByPhanTrang({pageIndex: page, keywords: searchKey ? searchKey: ""}))
                            });
                          } else {
                            swal("Hủy thành công",  `Tên phòng với id ${params.row.id} chưa bị xóa`, "error");
                          }
                        })
                        
                      } catch(error) { 
                        console.log(error)
                        swal("Thất bại, bạn không có quyền để xóa phòng này", {
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
                            onClose={handleShowOff}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <DetailRoom handleCloseModal={handleShowOff} data={params.row} handleUpdate={()=>{setShowUpdate(true)}} />
                        </Modal>
                        <Modal
                            open={showUpdate}
                            onClose={()=>{setShowUpdate(false)}}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <RoomUpdateModal pageIndex={page} roomdata={params.row} handleCloseUpdate={()=>{setShowUpdate(false)}}/>
                        </Modal>
                    </div>
                );
            }
        }
    ];

    const rows = [
        {
            id: 2,
            tenPhong: "NewApt D1 - Cozy studio - NU apt - 500m Bui Vien!",
            khach: 3,
            phongNgu: 1,
            giuong: 1,
            phongTam: 1,
            moTa: "Tự nhận phòng\r\nTự nhận phòng bằng khóa thông minh.\r\nDinh Long là Chủ nhà siêu cấp\r\nChủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.",
            giaTien: 28,
            mayGiat: true,
            banLa: true,
            tivi: true,
            dieuHoa: false,
            wifi: true,
            bep: false,
            doXe: true,
            hoBoi: true,
            banUi: true,
            maViTri: 1,
            hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/phong1.jpg"
        },
        {
            id: 1,
            tenPhong: "NewApt D1 - Cozy studio - NU apt - 500m Bui Vien!",
            khach: 3,
            phongNgu: 1,
            giuong: 1,
            phongTam: 1,
            moTa: "Tự nhận phòng\r\nTự nhận phòng bằng khóa thông minh.\r\nDinh Long là Chủ nhà siêu cấp\r\nChủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.",
            giaTien: 28,
            mayGiat: true,
            banLa: true,
            tivi: true,
            dieuHoa: false,
            wifi: true,
            bep: false,
            doXe: true,
            hoBoi: true,
            banUi: true,
            maViTri: 1,
            hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/phong1.jpg"
        },
        {
            id: 22,
            tenPhong: "STUDIO MỚI NETFLIX MIỄN PHÍ/ĐỖ XE MIỄN PHÍ",
            khach: 2,
            phongNgu: 1,
            giuong: 1,
            phongTam: 1,
            moTa: "Không gian riêng để làm việc\r\nMột khu vực chung có Wi-fi, phù hợp để làm việc.\r\nTự nhận phòng\r\nTự nhận phòng bằng khóa thông minh.\r\nKim Nam là Chủ nhà siêu cấp\r\nChủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.",
            giaTien: 21,
            mayGiat: true,
            banLa: true,
            tivi: true,
            dieuHoa: true,
            wifi: true,
            bep: true,
            doXe: false,
            hoBoi: false,
            banUi: false,
            maViTri: 1,
            hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/phong2.png"
        },
        {
            id: 3,
            tenPhong: "Phòng sang trọng với ban công tại D.1 - 200m đến Bitexco",
            khach: 2,
            phongNgu: 1,
            giuong: 1,
            phongTam: 1,
            moTa: "Emmy là Chủ nhà siêu cấp\r\nChủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.\r\nTrải nghiệm nhận phòng tuyệt vời\r\n100% khách gần đây đã xếp hạng 5 sao cho quy trình nhận phòng.\r\nHủy miễn phí trước 28 thg 9.",
            giaTien: 17,
            mayGiat: true,
            banLa: true,
            tivi: true,
            dieuHoa: false,
            wifi: false,
            bep: false,
            doXe: true,
            hoBoi: true,
            banUi: true,
            maViTri: 1,
            hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/phong3.png"
        },
        {
            id: 4,
            tenPhong: "Closer home!!!!",
            khach: 4,
            phongNgu: 2,
            giuong: 2,
            phongTam: 2,
            moTa: "Hieu là Chủ nhà siêu cấp\r\nChủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.\r\nĐịa điểm tuyệt vời\r\n100% khách gần đây đã xếp hạng 5 sao cho vị trí này.\r\nTrải nghiệm nhận phòng tuyệt vời\r\n100% khách gần đây đã xếp hạng 5 sao cho quy trình nhận phòng.",
            giaTien: 28,
            mayGiat: true,
            banLa: true,
            tivi: true,
            dieuHoa: true,
            wifi: true,
            bep: false,
            doXe: false,
            hoBoi: false,
            banUi: false,
            maViTri: 2,
            hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/phong4.png"
        },
        {
            id: 5,
            tenPhong: "Toàn bộ quê hương phải của Gi ngay trung tâm Cần Thơ",
            khach: 4,
            phongNgu: 2,
            giuong: 2,
            phongTam: 2,
            moTa: "Giang là Chủ nhà siêu cấp\r\nChủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.\r\nĐịa điểm tuyệt vời\r\n94% khách gần đây đã xếp hạng 5 sao cho vị trí này.\r\nTrải nghiệm nhận phòng tuyệt vời\r\n94% khách gần đây đã xếp hạng 5 sao cho quy trình nhận phòng.",
            giaTien: 25,
            mayGiat: true,
            banLa: true,
            tivi: true,
            dieuHoa: true,
            wifi: false,
            bep: false,
            doXe: true,
            hoBoi: false,
            banUi: true,
            maViTri: 2,
            hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/phong5.png"
        }

    ];


    
    const dataRetrieve = useSelector((state: RootState)=>state.sliceRoomAdmin.currentRoombyPhanTrang)
    const newRows = dataRetrieve.data ? dataRetrieve.data : rows 

    React.useEffect(() => { 
        dispatch(getRoomByPhanTrang({pageIndex: page, keywords: searchKey}))
      }, [page, searchKey])

    const handleChangePagination = (e: React.ChangeEvent<unknown>, page: number) => {
        setPage(page)
    }
    return (
        <div className='manage-user'>
            <Container fixed={true} className='mui-container-manage'>
                <Button className='button-add-admin' onClick={handleOpen}>Thêm phòng +</Button>
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
                    <AddRoom pageIndex={page} handleCloseModal={handleClose} />
                </Modal>
                <DataGrid
                    className='mui-grid-user'
                    rows={newRows}
                    columns={columns}
                    checkboxSelection
                    hideFooterPagination={true}
                    hideFooter={true}
                    sx={{ fontSize: '1.4rem' }}

                />
                <Pagination onChange={handleChangePagination} count={Math.ceil(dataRetrieve.totalRow/dataRetrieve.pageSize)} variant="outlined" sx={{ marginTop: '1rem', marginRight: '5%', justifyContent: 'flex-end', display: 'flex' }} />
            </Container>
        </div>
    )
}

export default ManageRoom