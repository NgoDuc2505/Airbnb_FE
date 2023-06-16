import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './modalLocation.scss'

const style = {
    position: 'absolute',
    top: '30%',
    left: '37%',
    transform: 'translate(-50%, -50%)',
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
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
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
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Địa điểm khả dụng: <input type="text" value={value} onChange={(e) => { handleChange(e) }} />
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="location-item">
                            <i className="fa-solid fa-location-dot"></i>
                            <p>Thành phố Hồ Chí Minh</p>
                        </div>
                        <div className="location-item">
                            <i className="fa-solid fa-location-dot"></i>
                            <p>Cần Thơ</p>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}