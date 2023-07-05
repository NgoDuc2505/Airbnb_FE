import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Container from '@mui/material/Container';
import './manage.scss'
import AdminRegister from '../Admin-register-popup/AdminRegister';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
//Modal
import PersonModal from '../Admin-register-popup/PersonDetailModal';
import PersonUpdateModal from '../Admin-register-popup/PersonUpdateModal';
import { useDispatch, useSelector } from 'react-redux';
import { getUserByPhanTrang } from '../../redux/Admin-slice/AdminSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { IProfile } from '../../constant/constant';


function ManageLocation() {
  return (
    <div>ManageLocation</div>
  )
}

export default ManageLocation