import * as React from 'react';
import { useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Container from '@mui/material/Container';
import './manage.scss'
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import AddRoom from '../Admin-add-room-popup/AddRoom';
import DetailRoom from '../Admin-add-room-popup/DetailRoom';
import { IRoomDetail } from '../../constant/constant'

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
            const [data, setData] = useState<IRoomDetail>(initState)
            const handleShow = () => setShow(true);
            const handleShowOff = () => setShow(false)
            const onClick = (e: React.MouseEvent) => {
                e.stopPropagation()
                handleShow()
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
                        onClose={handleShowOff}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <DetailRoom handleCloseModal={handleShowOff} data={params.row} />
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

function ManageRoom() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChangePagination = (e: React.ChangeEvent<unknown>, page: number) => {
        console.log(e, page)
    }
    return (
        <div className='manage-user'>
            <Container fixed={true} className='mui-container-manage'>
                <Button className='button-add-admin' onClick={handleOpen}>Thêm phòng +</Button>
                <div className="search-user">
                    <TextField id="outlined-basic" label="Tìm phòng" variant="filled" className='input-search' />
                    <button>Tìm</button>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <AddRoom handleCloseModal={handleClose} />
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

export default ManageRoom