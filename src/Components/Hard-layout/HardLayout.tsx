
import './hardLayout.scss'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const themeCustom = createTheme({
  breakpoints: {
    values: {
      xs: 480,
      sm: 576,
      md: 768,
      lg: 1200,
      xl: 1536,
    },
  },
});

function HardLayout() {
  return (
    <div className='feature-sub'>
      <h1>Ở bất cứ đâu </h1>
      <ThemeProvider theme={themeCustom}>
        <Box sx={{ flexGrow: 1 }} className='mui-box'>
          <Grid container spacing={2} className='mui-grid'>
            <Grid item md={3} sm={6} xs={6}  className='mui-grid-item'>
              <Item className='mui-item'>
                <div className="feature-sub-item">
                  <img src="/src/assets/Image/home-ocean.jpg" alt="..." />
                  <p>Toàn bộ nhà</p>
                </div>
              </Item>
            </Grid>
            <Grid item md={3} sm={6} xs={6} className='mui-grid-item'>
              <Item className='mui-item'>
                <div className="feature-sub-item">
                  <img src="/src/assets/Image/unique.jpg" alt="..." />
                  <p>Chỗ ở độc đáo</p>
                </div>
              </Item>
            </Grid>
            <Grid item md={3} sm={6} xs={6} className='mui-grid-item'>
              <Item className='mui-item'>
                <div className="feature-sub-item">
                  <img src="/src/assets/Image/maxresdefault.jpg" alt="..." />
                  <p>Trang trại vè thiên nhiên</p>
                </div>
              </Item>
            </Grid>
            <Grid item md={3} sm={6} xs={6} className='mui-grid-item'>
              <Item className='mui-item'>
                <div className="feature-sub-item">
                  <img src="/src/assets/Image/dog-on-bed-photopin-740w.jpg" alt="..." />
                  <p>Cho phép mang theo thú cưng</p>
                </div>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </div>
  )
}

export default HardLayout