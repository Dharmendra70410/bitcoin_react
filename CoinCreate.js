import { useEffect } from "react";
import { FetchData } from "./slicer1";
import { useDispatch ,useSelector} from "react-redux";
import CoinCard from "./CoinCard";

export default function CoinCreate(){

    const dispatch= useDispatch();
    const {data, loading, error}=useSelector((state)=>state.slice1);

    useEffect(()=>{
        dispatch(FetchData(20))
    },[])

    ///display the 2o user information
    if(loading){
        return <h1> Data is loading</h1>
    }
    if(error){
        return <h1>Error has Occured</h1>
    }
    return(
        <>
        <div style={{display:"flex" , flexWrap:'wrap', justifyContent:'center'}}>
            {
                data.map((value)=><CoinCard key={value.id} coin={value}></CoinCard>)
            }
        </div>
        </>
    )
}