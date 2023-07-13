//react
import { Suspense } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as React from 'react';
//css
import './admin.scss'
//mui-ui
import Drawer from '@mui/material/Drawer';
import AdminSideBar from './AdminSideBar'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
//utils
import { deleteKey } from '../../utils/utils'
//const
import { ACCESS_TOKEN, ACCESS_USER_ID } from '../../constant/constant'
//swal
import swal from 'sweetalert';
//redux
import { setDefaultProfile } from '../../redux/user-slice/UserSlice'
import { useScrollTop } from '../../hooks/useScrollTop';
import { SkeletonAdmin } from '../../Components/Skeleton/Skeleton';

type Anchor = 'left';

function AdminTemplate() {
  useScrollTop()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [state, setState] = React.useState({
    left: false,
  });
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout= ()=>{
    deleteKey(ACCESS_TOKEN),
    deleteKey(ACCESS_USER_ID)
    dispatch(setDefaultProfile())
    navigate('/')
    swal("Đã đăng xuất thành công!", {icon: "success"})
  }

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState({ [anchor]: open });
      };

      const handleCloseSideBar = ()=>{
        setState({ left: false });
      }
  return (
    <div className='admin-template'>
      <Box sx={{ flexGrow: 1, display: 'fl' }}>
        <AppBar className='menu-bar-header' position="static" sx={{ backgroundColor: 'white' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="secondary"
              aria-label="menu"
              sx={{ mr: 2 }}
              className='mui-iconBtn'
              onClick={toggleDrawer('left', true)}
            >
              {/*  open sidebar */}
              <i className="fa-solid fa-bars"></i>
            </IconButton>
            <Typography variant="h6" component="div" color="black" sx={{ flexGrow: 1, fontSize: '2rem' }}>
              Manage System - AirBnb
            </Typography>
            {(
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="secondary"
                  className='mui-iconBtn'
                >
                  {/* <AccountCircle /> */}
                  <i className="fa-regular fa-user"></i>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose} sx={{ fontSize: '1.6rem' }}> <NavLink to={'/Detail/profile'}>Profile</NavLink> </MenuItem>
                  <hr />
                  <MenuItem onClick={handleLogout} sx={{ fontSize: '1.6rem' }}>Log out</MenuItem>

                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>


      {/*sidebar content*/}
      <Drawer
        anchor={'left'}
        open={state['left']}
        onClose={toggleDrawer('left', false)}
      >
        <AdminSideBar handleCloseSideBar={handleCloseSideBar} />
      </Drawer>
      <Suspense fallback={<SkeletonAdmin/>}>
        <Outlet></Outlet>
      </Suspense>
    </div>
  )
}

export default AdminTemplate