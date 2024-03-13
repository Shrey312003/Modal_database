import { Box } from "@mui/material";
import Explore from "../components/explore";
import FeaturedList from "../components/featured";
import{ Grid} from "@mui/material";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import dataSlice from "../store/dataSlice";
import useFetch from "../hooks/useFetch";

const ExplorePage = () => {
    const { data, loading, error } = useFetch("https://my-json-server.typicode.com/Shrey312003/Modal_database/posts");

    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {
            dispatch(dataSlice.actions.setData({ data: data}));
        }
    }, [data, dispatch]);

    return ( 
        <Box>
            <Grid container spacing={4}>
                <Grid item md={8} sx={12}>
                    <Explore></Explore>
                </Grid>

                <Grid item md={4} sx={12}>
                    <FeaturedList data={data} loading={loading} error={error}></FeaturedList>
                </Grid>
            
            </Grid>
        </Box>
    );
}
 
export default ExplorePage;