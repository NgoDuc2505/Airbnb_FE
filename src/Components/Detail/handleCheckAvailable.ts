import { useSelector } from 'react-redux'
import { IBookRoom } from '../../constant/constant'
import { RootState } from '../../redux/store'



const useCheckAvailableCount = (idRoom: string | undefined, dateStart: string, dateEnd: string, idBook?: string | undefined) => {
  const months: { [key: string]: string } = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  }
  let startDayUser: string[] = []
  let endDayUser: string[] = []
  let availableCount = 0
  const data: IBookRoom[] = useSelector((state: RootState) => state.sliceBookingAdmin.listBooking)
  const dataRoomBooking: IBookRoom[] = data.filter((item: IBookRoom) => { return item.maPhong === Number(idRoom) })
  const startDay = String(dateStart).split(' ')
  const endDay = String(dateEnd).split(' ')
  // console.log(dataRoomBooking, startDay, endDay, idBook)
  dataRoomBooking.forEach((item: IBookRoom)=>{
    startDayUser = item.ngayDen.slice(0,10).split('-')
    endDayUser = item.ngayDi.slice(0,10).split('-')
    if(startDayUser[0] === startDay[3] && endDayUser[0] === endDay[3]){

      if(months[startDay[1]] === startDayUser[1] && months[endDay[1]] === endDayUser[1]){

        if(Number(startDayUser[2]) > Number(endDay[2]) || Number(endDayUser[2]) < Number(startDay[2])){

          availableCount +=0
        }else{
          if(idBook){
            if(Number(idBook) === Number(item.id)){
              availableCount += 0
            }else{
              availableCount += 1
            }
          }else{
            availableCount += 1
          }

        }
      }
    }
  })
  return availableCount
}

export default useCheckAvailableCount