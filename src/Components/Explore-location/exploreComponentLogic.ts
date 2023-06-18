import { useEffect } from 'react';
import { getInspectOfSearchPage } from '../../redux/Location-slice/LocationSlice'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store'
const useGetInspectOfSearchPage = ()=>{
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(getInspectOfSearchPage())
    }, [])
    const mainState = useSelector((state: RootState) => state.sliceLocation.inspectOfSearchPage)
    return mainState
}

export default useGetInspectOfSearchPage