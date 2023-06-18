
import { NavLink } from 'react-router-dom';
//MUI UI
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
//scss
import './exploreComponent.scss'
import useGetInspectOfSearchPage from './exploreComponentLogic';
//interface redux
import { ILocationItem } from '../../redux/Location-slice/LocationSlice'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function ExploreLocation() {
  const result: ILocationItem[] = useGetInspectOfSearchPage()
  return (
    <div className='explore-location'>
      <h1>Khám phá những đặc điểm nổi bật gần đây</h1>
      <Box sx={{ flexGrow: 1 }} className='mui-box'>
        <Grid container spacing={2} className='mui-grid'>
          {
            result.map((itemReturn : ILocationItem) => {
              return (
                <Grid item xs={3} className='mui-grid-item' key={itemReturn.id}>
                  <Item className='mui-item'>
                    <NavLink to={`${itemReturn.id}`}>
                    <div className="explore-location-item">
                      <img src={itemReturn.hinhAnh} alt="..." />
                      <div className="explore-location-item-text">
                        <p>{itemReturn.tenViTri}</p>
                        <span>{`${itemReturn.tinhThanh}, ${itemReturn.quocGia}`}</span>
                      </div>
                    </div>
                    </NavLink>
                  </Item>
                </Grid>
              )
            })
          }
        </Grid>
      </Box>
    </div>
  )
}

export default ExploreLocation