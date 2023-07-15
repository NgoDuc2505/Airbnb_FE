//react
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
//mui ui
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import './manage.scss'
//components
import AddNewLocation from '../Admin-location-popup/AddNewLocation';
import UpdateLocation from '../Admin-location-popup/UpdateLocation';
//swal
import swal from 'sweetalert';
//store redux
import { getLocationByPhanTrang } from '../../redux/Admin-slice/AdminLocationSlice';
import { AppDispatch, RootState } from '../../redux/store';
//const
import { ILocationItem } from '../../constant/constant';
//services
import { axiosInterceptor } from '../../services/services';

function ManageLocation() {
    const dispatch  = useDispatch<AppDispatch>()
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(1)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [show, setShow] = React.useState(false)
    const [paramsId,setParamsId]= React.useState<number>()
    const [searchKey, setSearchKey] = React.useState("")
    const refSearch = React.useRef<HTMLInputElement>();
    const [paramsData,setParamsData] = React.useState<ILocationItem>({id:-1,hinhAnh:'',quocGia:'',tenViTri:'',tinhThanh:''})
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
                    setParamsId(params.row.id)
                    setParamsData(params.row)
                };
                const onClick3 = (e: React.MouseEvent) => {
                    e.stopPropagation()
                    try{ 
                        swal({
                          title: "Bạn có chắc chắn muốn xóa địa điểm này?",
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
                              text: `Người địa điểm với tên ${params.row.tenViTri} đã bị xóa`,
                              icon: 'success'
                            }).then(async() => {
                                await axiosInterceptor.delete(`/api/vi-tri/${params.row.id}`);
                                dispatch(getLocationByPhanTrang({pageIndex: page,keywords:""}))
                            });
                          } else {
                            swal("Hủy thành công",  `Vị trí ${params.row.tenViTri} chưa bị xóa`, "error");
                          }
                        })
                        
                      } catch(error) { 
                        console.log(error)
                        swal("Thất bại, xóa thất bại!", {
                          icon: "error",
                        });
                      }
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
    ]
    const dataRetrieve = useSelector((state: RootState)=>state.sliceLocationAdmin.currentLocationbyPhanTrang)
    const newRows = dataRetrieve.data ? dataRetrieve.data : rows 

    React.useEffect(() => { 
        dispatch(getLocationByPhanTrang({pageIndex: page, keywords: searchKey}))
      }, [page, searchKey])
    const handleChangePagination = (e: React.ChangeEvent<unknown>, page: number) => {
        setPage(page)
        return e.target
     }
    return (
        <div className='manage-location'>
            <Container fixed={true} className='mui-container-manage'>
                <Button className='button-add-admin' onClick={handleOpen}>Thêm mới vị trí</Button>
                <div className="search-user">
                    <TextField inputRef={refSearch} id="outlined-basic" label="Tìm theo tên" variant="outlined" className='input-search' />
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
                    <AddNewLocation handleClose={handleClose} pageIndex={page}/>
                </Modal>
                <Modal
                    open={show}
                    onClose={()=>{setShow(false)}}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <UpdateLocation handleClose={()=>{setShow(false)}} id={paramsId} pageIndex={page} data={paramsData}/>
                </Modal>
                <DataGrid
                    className='mui-grid-user'
                    rows={newRows}
                    columns={columns}
                    checkboxSelection
                    hideFooterPagination={true}
                    hideFooter={true}
                    sx={{ fontSize: '1.4rem', height: 475 }}
                />
                <Pagination onChange={handleChangePagination} count={Math.ceil(dataRetrieve.totalRow/dataRetrieve.pageSize)} variant="outlined" sx={{ marginTop: '1rem', marginRight: '5%', justifyContent: 'flex-end', display: 'flex' }} />
            </Container>
        </div>
    )
}

export default ManageLocation