import * as React from 'react';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

interface IProps{
    buttonName: string,
    title: string,
    description: string | any
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "95%",
  height: "95%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  overflowY: "scroll",
  p: 4,
};

export default function AlertDialogSlide({buttonName, title, description} : IProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button sx={{color:"black", fontSize:"1.5rem", borderColor:"black", textTransform: "none"}} variant="outlined" onClick={handleOpen}>
        {`${buttonName}`}
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={style}>
          
            <Button sx={{color:"black", fontSize:"2rem"}} onClick={() => {setOpen(false)}}><i className="fa-solid fa-x"></i></Button>
         
          <DialogTitle sx={{color:"black", fontSize:"3rem", borderColor:"black"}}>{`${title}`}</DialogTitle>
          <DialogContent sx={{width:"100%"}}>
            <DialogContentText sx={{color:"black", fontSize:"1.5rem", width:"100%"}} id="alert-dialog-slide-description">
              {typeof description === "string" ? `${description}`: description}
            </DialogContentText>
          </DialogContent>
        </Box>
      </Modal>

    </div>
  );
}


