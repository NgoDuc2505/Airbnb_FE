export const setLocal = (key:string,data: any)=>{
    return localStorage.setItem(key,JSON.stringify(data))
}

export const getLocal = (key:string) =>{
    if(localStorage.getItem(key) !== null){
        return JSON.parse(localStorage.getItem(key) || '{}')
    }
}

export const deleteKey = (key:string)=>{
    return localStorage.removeItem(key)
}