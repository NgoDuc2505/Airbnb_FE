import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import "./detail.scss"

interface IProps{
  khachMax: number,
}


export default function SelectVariants({khachMax} : IProps) {
  const [inputGuest, setInputGuest] = React.useState("1 guest");
  const [guest, setGuest] = React.useState(1);

  const handleChange = (event: SelectChangeEvent) => {
    setInputGuest(event.target.value);
  };

  const handleGuest = (index: number) => { 
    setGuest(guest + index)

  }
  return (
    <div>
      <FormControl variant="filled" sx={{color:"black", width:"100%", border:"solid 1px", padding:"0.5rem",borderRadius:"0 0 10px 10px"}}>
        <InputLabel id="demo-simple-select-filled-label" sx={{fontSize:"2rem", color:"black"}}>{guest} Guest</InputLabel>
        <Select
          sx={{backgroundColor:"white"}}
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          onChange={handleChange}
        >
              <div className='d-flex align-items-center justify-content-between'>
                <div className='ml-5 mt-4'>
                  <h3>Adults</h3>
                  <h5>Age 13+</h5>
                </div>
                <div className='d-flex align-items-center'>
                  <button disabled={guest === 1?true:false} id="decGuest" type="button" className='guest-Button' onClick={() => {handleGuest(-1)}}>-</button>
                  
                    <h2>{guest}</h2>
                
                  <button disabled={guest === khachMax?true:false} id="incGuest" type="button" className='guest-Button' onClick={() => {handleGuest(1)}}>+</button>
                </div>
              </div>
              <p className="guest-description">This place has a maximum of {khachMax} people</p>
              <button className="guest-close mb-4" style={{marginLeft:"80%"}}>Close</button>
        </Select>
      </FormControl>



      
    </div>
  );
}