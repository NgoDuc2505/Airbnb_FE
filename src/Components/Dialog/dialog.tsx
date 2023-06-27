import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IProps{
    buttonName: string,
    title: string,
    description: string | any
}

export default function AlertDialogSlide({buttonName, title, description} : IProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button sx={{color:"black", fontSize:"1.5rem", borderColor:"black", textTransform: "none"}} variant="outlined" onClick={handleClickOpen}>
        {`${buttonName}`}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{width: "auto", height: "auto"}}
        
      >
        <DialogActions sx={{marginRight: "auto", marginTop: "1rem"}} >
          <Button sx={{color:"black", fontSize:"2rem"}} onClick={handleClose}><i className="fa-solid fa-x"></i></Button>
        </DialogActions>
        <DialogTitle sx={{color:"black", fontSize:"3rem", borderColor:"black"}}>{`${title}`}</DialogTitle>
        <DialogContent sx={{width:"600px"}}>
          <DialogContentText sx={{color:"black", fontSize:"1.5rem", width:"100%"}} id="alert-dialog-slide-description">
            {typeof description === "string" ? `${description}`: description}
          </DialogContentText>
        </DialogContent>
       
      </Dialog>
    </div>
  );
}