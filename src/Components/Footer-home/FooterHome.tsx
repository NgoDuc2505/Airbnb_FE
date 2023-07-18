
import './footerHome.scss'
//MUI UI
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

function FooterHome() {
    return (
        <div className="footer">
            <Container maxWidth="xl">
                <Box sx={{ flexGrow: 1 }} className='mui-box' >
                    <Grid container spacing={2} className='mui-grid'>
                        <Grid item xs={3} className='mui-grid-item'>
                            <Item className='mui-item'>
                                <p>Giới thiệu</p>
                                <ul>
                                    <li><a href="">Phương thức hoạt động</a></li>
                                    <li><a href="">Trang tin tức</a></li>
                                    <li><a href="">Nhà đầu tư</a></li>
                                    <li><a href="">Airbnb Plus</a></li>
                                    <li><a href="">Airbnb Lux</a></li>
                                    <li><a href="">Airbnb for work</a></li>
                                    <li><a href="">Hotel tonight</a></li>
                                    <li><a href="">Hosting</a></li>
                                    <li><a href="">Cơ hội nghề nghiệp</a></li>
                                    <li><a href="">Nhà sáng lập</a></li>
                                </ul>
                            </Item>
                        </Grid>
                        <Grid item xs={3} className='mui-grid-item'>
                            <Item className='mui-item'>
                                <p>Cộng đồng</p>
                                <ul>
                                    <li><a href="">Sự đa dạng</a></li>
                                    <li><a href="">Tính tiện nghi</a></li>
                                    <li><a href="">Đối tác</a></li>
                                    <li><a href="">Airbnb Org</a></li>
                                    <li><a href="">Chỗ ở</a></li>
                                    <li><a href="">Giới thiệu</a></li>
                                </ul>
                            </Item>
                        </Grid>
                        <Grid item xs={3} className='mui-grid-item'>
                            <Item className='mui-item'>
                                <p>Đón tiếp khách</p>
                                <ul>
                                    <li><a href="">Cho thuê</a></li>
                                    <li><a href="">Trải nghiệm</a></li>
                                    <li><a href="">Trải nghiệm trực tuyến</a></li>
                                    <li><a href="">Airbnb Org</a></li>
                                    <li><a href="">Trung tâm tài nguyên</a></li>
                                    <li><a href="">Trung tâm cộng đồng</a></li>
                                </ul>
                            </Item>
                        </Grid>
                        <Grid item xs={3} className='mui-grid-item'>
                            <Item className='mui-item'><p>Đón tiếp khách</p>
                                <ul>
                                    <li><a href="">Ứng phó Covid-19 vừa qua</a></li>
                                    <li><a href="">Trung tâm trợ giúp</a></li>
                                    <li><a href="">Trải nghiệm trực tuyến</a></li>
                                    <li><a href="">Hỗ trợ khu dân cư</a></li>
                                    <li><a href="">Tin cậy và an toàn</a></li>
                                </ul>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
                <div className="sub-footer">
                    <div className="left-sub-footer">
                        <p>© 2023 Airbnb, Inc. All rights reserved . <a href="">Quyền riêng tư</a> . <a href="">Điều khoản</a> . <a href="">Hồ sơ trang web</a></p>
                    </div>
                    <div className="right-sub-footer">
                    <i className="fa-solid fa-globe"></i>
                    <p>Tiếng Việt</p>
                    <p>$</p>
                    <p>VND</p>
                    <i className="fa-brands fa-facebook-f"></i>
                    <i className="fa-brands fa-twitter"></i>
                    <i className="fa-brands fa-instagram"></i>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default FooterHome