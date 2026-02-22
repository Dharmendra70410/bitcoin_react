//Create AsyncThunk
import { createAsyncThunk ,createSlice} from "@reduxjs/toolkit";


//api for Cryptocurrency
//https://api.coingecko.com/api/v3/coins/markets?
//vs_currency=usd&ids=bitcoin,ethereum,litecoin

//https://api.coingecko.com/api/v3/coins/markets?
//vs_currency=usd&order=market_cap_desc&per_page=20

//let say FetchData(20)
// as funtion called 1.{type:' coin/fetch/pending ', payload: undeifined}
//after data comes 2.1.{type:' coin/fetch/fulfilled ', payload: data}
//if error{ 3.{type:' coin/fetch/rejected',  payload: error.message }



//{type: "Coin/fetch", payload :args}
const FetchData=createAsyncThunk(
    //action create karo
    //action (type: , payload)
    'Coin/fetch', //type slicename/functio

    async(args, thunkAPI)=>{

       try {
          const response= await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${args}`)
            const data=await response.json();
            return data; //yaha se data payload mei jayega
       
        }

        catch(error){

            return rejectWithValue (error.message)

        }

    }

)
const slicer1=createSlice({
    name:"slice1",
    initialState :{data:[] , loading:false, error:null},
   
    reducers:{},
    
    extraReducers: (builder)=>{
        builder
        .addCase(FetchData.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(FetchData.fulfilled, (state,action)=>{
            state.data=action.payload;
            state.loading=false;
        })
        .addCase(FetchData.rejected, (state, action)=>{
            state.error=action.payload;
            state.loading=false;
        })

    }

})

//type :"slice1/Increment"
//type :"slice1/Decrement"

//type "Coin/Fetch/pending"
// type "Coin/Fetch/fullfiled"
// type "Coin/Fetch/rejected"

export default slicer1.reducer;
export {FetchData};