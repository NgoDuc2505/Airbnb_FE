import * as React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './modalLocation.scss'

//interface redux
import { ILocationItem } from '../../constant/constant'
import { RootState } from '../../redux/store'
import useGetInspectOfSearchPage from '../Explore-location/exploreComponentLogic';

const style = {
    position: 'absolute',
    top: '20%',
    left: '24%',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    border: 'unset',
    boxShadow: 24,
    p: 3,
};
type TProps = {
    children: JSX.Element,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
}

export default function BasicModal({ children, value, setValue }: TProps) {
    const [open, setOpen] = React.useState(false);
    const [list, setList] = React.useState<ILocationItem[]>([]);
    const stateData = useSelector((state: RootState) => state.sliceLocation.inspectOfSearchPage)
    const stateDataLocation = useGetInspectOfSearchPage()
    const listData = (stateData.length > 0 ? [...stateData] : [...stateDataLocation])
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        const revertValueInput = e.target.value.toLowerCase().trim()
        const findResultList = listData.filter((item: ILocationItem) => {
            return (item.tinhThanh.toLowerCase().includes(revertValueInput))
        })
        setList(findResultList)
    }

    return (
        <div className='modal-location'>
            <button onClick={handleOpen} className='btn-modal'>{children}</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='mui-box-location'>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Địa điểm khả dụng: <input type="text" value={value} onChange={(e) => { handleChange(e) }} />
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {list.map((item: ILocationItem) => {
                            return (
                                <NavLink to={`/${item.id}`}>
                                <div className="location-item">
                                    <i className="fa-solid fa-location-dot"></i>
                                    <p>{`${item.tenViTri}, ${item.tinhThanh}`}</p>
                                </div>
                                </NavLink>
                            )
                        })}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}