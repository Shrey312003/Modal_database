import ModelList from "../components/models_list";
import FeaturedList from "../components/featured";
import { Grid } from "@mui/material";
import useFetch from "../hooks/useFetch";
import {CircularProgress} from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import dataSlice from "../store/dataSlice";

//Home page of the website
const Home = () => {
    const { data, loading, error } = useFetch("https://my-json-server.typicode.com/Shrey312003/Modal_database/posts");
    //Data is fetched and sent to different compoenents

    const dispatch = useDispatch();
    //Data is also added to redux store in case it is needed
    useEffect(() => {
        if (data) {
            dispatch(dataSlice.actions.setData({ data: data}));
        }
    }, [data, dispatch]);


    return ( 
        <>
        {loading && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress />
            </div>
        )}
        {error && <div>Error: {error.message}</div>}
        {!loading && data && (
            <div >
                <Grid container spacing={4}> 
                {/* //Grid is used from material ui */}
                    <Grid item md={8} sm = {8} xs={12}>
                        <ModelList data={data} loading={loading} error={error}></ModelList> 
                        {/* //Modals displayed on home page */}
                        
                    </Grid>

                    <Grid item md={4} sm = {12} xs={12}>
                        <FeaturedList data={data} loading={loading} error={error}></FeaturedList> 
                        {/* // Featured wall modals */}
                    </Grid>
                </Grid>
            </div>
        )}
        </>
     );
}
 
export default Home;