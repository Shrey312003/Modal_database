import { Box } from "@mui/material";
import Explore from "../components/explore";
import FeaturedList from "../components/featured";
import{ Grid} from "@mui/material";

const ExplorePage = () => {
    return ( 
        <Box>
            <Grid container spacing={4}>
                <Grid item md={8} sx={12}>
                    <Explore></Explore>
                </Grid>

                <Grid item md={4} sx={12}>
                    <FeaturedList></FeaturedList>
                </Grid>
            
            </Grid>
        </Box>
    );
}
 
export default ExplorePage;