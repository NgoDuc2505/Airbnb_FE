
import './detail.scss'
import '/src/Components/UtilityIcon/utility.scss'
import { IComment, ILocationItem, IRoomDetail } from '../../constant/constant'
import AlertDialogSlide from '../Dialog/dialog';
import {BanLa, BanUi, Bep, DieuHoa, DoXe, HoBoi, MayGiat, Tivi, Wifi}  from '../UtilityIcon/UtilityIcon';
import DisabledOptions from './guestComponent';
import { Comment, CommentBox, CommentSlider } from './commentComponent';
import { Divider } from 'antd';

interface IProps{
    dataDetail: IRoomDetail | any,
    location: ILocationItem | undefined,
    comment: IComment[]
}
function Detail({dataDetail, location, comment}:IProps) {
    const currentLocation = `${location?.tenViTri} - ${location?.tinhThanh}, ${location?.quocGia}`
    const textSplit = dataDetail.moTa !== undefined ? dataDetail.moTa.split(/\r?\n/) : dataDetail.moTa;
    const tienNghi = (text: string) => {
        return (
            <div className={`${text}`}>
                <div className='col-md-6 col-sm-12' style={{display: dataDetail.banLa ?"block":"none"}}>
                    <BanLa/>
                </div>
                <div className='col-md-6 col-sm-12' style={{display: dataDetail.banUi ?"block":"none"}}>
                    <BanUi/>
                </div>
                <div className='col-md-6 col-sm-12' style={{display: dataDetail.bep ?"block":"none"}}>
                    <Bep/>
                </div>
                <div className='col-md-6 col-sm-12' style={{display: dataDetail.dieuHoa ?"block":"none"}}>
                    <DieuHoa/>
                </div>
                <div className='col-md-6 col-sm-12' style={{display: dataDetail.doXe ?"block":"none"}}>
                    <DoXe/>
                </div>
                <div className='col-md-6 col-sm-12' style={{display: dataDetail.hoBoi ?"block":"none"}}>
                    <HoBoi/>
                </div>
                <div className='col-md-6 col-sm-12' style={{display: dataDetail.mayGiat ?"block":"none"}}>
                    <MayGiat/>
                </div>
                <div className='col-md-6 col-sm-12' style={{display: dataDetail.tivi ?"block":"none"}}>
                    <Tivi/>
                </div>
                <div className='col-md-6 col-sm-12' style={{display: dataDetail.wifi ?"block":"none"}}>
                    <Wifi/>
                </div> 
            </div>)     
    }
    const averageStar = Math.ceil(comment.reduce((total, next) => total + next.saoBinhLuan,0) / comment.length);
    
  return (
    <div className='detail-page'>
      <h1 className='detail-heading'>{dataDetail.tenPhong}</h1>
      {/* --------------------------------------heading -------------------------------*/}
      <div className='d-flex justify-content-between align-content-center'>
        <div className='detail-sub-heading'>
            <i className="fa-solid fa-star"></i>
            <p className='rating'>{averageStar}</p>
            <p>·</p>
            <p className='onDetail'>({comment.length} đánh giá)</p>
            <p>·</p>
            <p className='onDetail'>{currentLocation}</p>
        </div>
        <div className='detail-saveShare'>
            <div className='share'>
                <i className="fa-solid fa-arrow-up-from-bracket"></i>
                <span className='onDetail'>Chia sẻ</span>
            </div>
            <div className='save'>
                <i className="fa-regular fa-heart"></i>
                <span className='onDetail'>Lưu</span>
            </div>
        </div>
      </div>
      {/* --------------------------------------END heading -------------------------------*/}
      {/* -------------------------------------- IMG -------------------------------*/}
      <img className="detail-img" src={`${dataDetail.hinhAnh}`} alt="" />
      {/* -------------------------------------- END IMG -------------------------------*/}
      <section className='detail-main-section'>
        {/* -------------------------------------- Description -------------------------------*/}
        <div className='detail-left'>
            <div className='detail-left-heading'>
                <div>
                    <h2>Toàn bộ căn hộ Condo</h2>
                    <p>{dataDetail.khach} khách · {dataDetail.phongNgu} phòng ngủ · {dataDetail.phongTam} phòng tắm</p>
                </div>
                <img className="avatar" src="/src/assets/Image/carousel-img.jpg" alt="" />
            </div>
            <hr />
            <div className='my-4'>
                {textSplit && textSplit.map((text: string, index: number) => { 
                    return ( 
                        <div key={index} className='detail-description d-flex align-items-center my-3'>
                            <div className='detail-icon'><i className={`fa-sharp fa-solid fa-${index}`} ></i></div>
                            <div><span>{text}</span></div>
                        </div>
                    )
                })}
            </div>
            <hr />
            <div className='detail-decription-more'>
                <div className='detail-translate'>
                    <h3>Dịch sang Tiếng Việt</h3>
                    <i className="fa-solid fa-language"></i>
                </div>
                <p className='detail-describe'>{dataDetail.moTa}</p>
                <AlertDialogSlide buttonName={`Hiển Thị Thêm >`} title={"About this space"} description={dataDetail.moTa}/>
            </div>
            <hr />
            <div className='detail-sleep'>
                <h2>Nơi bạn ngủ</h2>
                <img src="/src/assets/Image/bed.jpg" alt="" />
                <h3>Giường</h3>
                <p>{dataDetail.giuong} cái giường</p>
            </div>
            <hr />
            <div className='detail-utility'>
                <h2>Tiện Nghi</h2>
                {tienNghi("row")}
                <AlertDialogSlide buttonName={`Hiển Thị Các Tiện Nghi`} title={"Tiện nghi"} description={tienNghi("none")}/>
            </div>
        </div>
        {/* -------------------------------------- END Description -------------------------------*/}
        <div className='detail-right'>
            <section className='detail-purchase'>
                <h1>${dataDetail.giaTien}<span> / đêm</span></h1>
                <div className='detail-sub-heading yeet'>
                    <i className="fa-solid fa-star"></i>
                    <p className='rating'>{averageStar}</p>
                    <p>·</p>
                    <p className='onDetail'>({comment.length} đánh giá)</p>
                </div>
                <DisabledOptions khachMax={dataDetail.khach}/>
            </section>
        </div>
      </section>
      <hr />
        {/* -------------------------------------- Comment display -------------------------------*/}
      <section className='detail-comment'>
        <div className='detail-comment-rating'>
            <i className="fa-solid fa-star"></i>
            <h1>{averageStar}</h1>
            <p>·</p>
            <h1 className='rating-comment'>{comment.length} đánh giá</h1>
        </div>
            
        <div className='detail-comment-slider'>
            <CommentSlider classes={"row"}/>
            
        </div>

        <div className='detail-comment-section'>
            {
                comment && comment.slice(0, 5).map((currentComment: IComment) => { 
                    return ( 
                        <Comment currentComment={currentComment} limit={true}/> 
                    )
                })
            }

        <AlertDialogSlide 
            buttonName={`Hiển Thị ${comment.length} Đánh Giá`} 
            title={`★ ${averageStar} · ${comment.length} đánh giá`} 
            description={
                <div>
                    {comment && comment.map((currentComment: IComment) => { 
                        return ( 
                            <Comment currentComment={currentComment} limit={false}/> 
                        )
                    })}
                </div>
        }/>


        </div>
        </section>
        {/* -------------------------------------- END Comment display -------------------------------*/}
        <hr />
         {/* --------------------------------------  Comment -------------------------------*/}
        <div className='my-5'>
            <h1>Phần Bình Luận</h1>
            <CommentBox/>
        </div>

       
    </div>
  )
}

export default Detail