export const CYBER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBETiAxNCIsIkhldEhhblN0cmluZyI6IjMwLzA5LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc1OTE5MDQwMDAwMCIsIm5iZiI6MTczMDMwNzYwMCwiZXhwIjoxNzU5MzM4MDAwfQ.GrRla-sxIVNDlvW31gwz3E8bgmwF0p9amVYgZ3K0OBE'
export const ACCESS_TOKEN = 'accessToken'
export const BASE_URL = 'https://airbnbnew.cybersoft.edu.vn'
export const ACCESS_USER_ID = 'accessUserById'
export const PAGE_SIZE = 2; 
export interface IRoomDetail {
    id: number,
    tenPhong: string,
    khach: number,
    phongNgu: number,
    giuong: number,
    phongTam: number,
    moTa: string,
    giaTien: number,
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

export interface ILocationItem {
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
export interface IProfile extends IValuesLogin {
    id: number,
    name: string,
    phone:string,
    birthday: string,
    avatar: string,
    gender: boolean,
    role:string,
}

export interface IComment{ 
    ngayBinhLuan: string,
    noiDung: string,
    saoBinhLuan: number,
    tenNguoiBinhLuan: string, 
    avatar: string
}

export interface ICommentId extends IComment{
    id: number,
    maPhong: number
}

export interface IBookRoom{ 
    id: number,
    maPhong: number,
    ngayDen: string,
    ngayDi: string,
    soLuongKhach: number,
    maNguoiDung: number
}

export interface IValueUpdate{ 
    name: string,
    email: string,
    phone: string,
    birthday: string,
    role: string,
    gender: boolean,
}


export const regex = {
    nameByVietnamese: /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/,
    password: /^.*(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^& "]).*$/,
}

