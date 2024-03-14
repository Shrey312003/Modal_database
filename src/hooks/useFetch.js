import axios from "axios";
import { useEffect, useState } from "react";

//Custom hook to fetch data
const useFetch = (url) => {

    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);


    useEffect(()=>{
        const fetch = async () => {
            try{
                const data1 = await axios.get(url);
                // console.log(data1);
                setData(data1.data);
                setLoading(false);
                setError(null);
            }

            catch(error){
                console.log(error);
                setError(error);
                setLoading(false);
            }
            
        }

        fetch();
    },[url])

    return {data,loading,error};
}
 
export default useFetch;