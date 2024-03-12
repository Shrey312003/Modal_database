import ModelList from "../components/models_list";
import FeaturedList from "../components/featured";
import { Grid } from "@mui/material";

const Home = () => {
    return ( 
        <div style={{marginTop:"10px"}}>
            <Grid container spacing={4}>
                <Grid item md={8} sx={12}>
                    <ModelList></ModelList>
                </Grid>

                <Grid item md={4} sx={12}>
                    <FeaturedList></FeaturedList>
                </Grid>
            
            </Grid>
            {/* <ModelList></ModelList>
            <FeaturedList></FeaturedList> */}
        </div>
     );
}
 
export default Home;