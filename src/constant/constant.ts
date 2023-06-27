export const CYBER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCDEkMOgIE7hurVuZyAwNyIsIkhldEhhblN0cmluZyI6IjA0LzExLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5OTA1NjAwMDAwMCIsIm5iZiI6MTY2OTQ4MjAwMCwiZXhwIjoxNjk5MjAzNjAwfQ.z53DwWShTQ-NYmv_cyVwxzyaarjOV3xiMrElt3gwl8M'
export const ACCESS_TOKEN = 'accessToken'
export const BASE_URL = 'https://airbnbnew.cybersoft.edu.vn'


export interface IRoomDetail{
    id: number,
    tenPhong:string,
    khach: number,
    phongNgu: number,
    giuong: number,
    phongTam: number,
    moTa: string,
    giaTien:  number,
    mayGiat: boolean,
    banLa: boolean,
    tivi: boolean,
    dieuHoa: boolean,
    wifi: boolean,
    bep: boolean,
    doXe: boolean,
    hoBoi: boolean,
    banUi: boolean,
    maViTri: number,
    hinhAnh: string,
}

export interface ILocationItem{
    hinhAnh: string,
    id: number,
    quocGia: string,
    tenViTri: string,
    tinhThanh: string
}
export interface IValuesLogin {
    email: string,
    password: string,
}
export interface IValues extends IValuesLogin {
    checkPassword: string,
    user: string,
    name: string,
    email: string,
    phone: string,
    birthday: string,
    role: string,
    gender: boolean,
  }


export interface IComment{ 
    ngayBinhLuan: string,
    noiDung: string,
    saoBinhLuan: number,
    tenNguoiBinhLuan: string, 
    avatar: string
}


export const regex = {
    nameByVietnamese: /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/,
    password: /^.*(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^& "]).*$/,
}

