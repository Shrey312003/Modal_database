import { Box, Card, CardMedia, CardContent, Typography, Grid, Paper } from "@mui/material";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

//Featured wall
const FeaturedList = ({data:articles,loading,error}) => {

    // const { data: articles } = useFetch("https://my-json-server.typicode.com/Shrey312003/Modal_database/posts");


    let articlesByViews = [];   //Sort articles by views
    let articlesByLikes = [];   //Sort articles by likes

    //function to sort
    if (articles && Array.isArray(articles)) {
        articlesByViews = [...articles].sort((a, b) => b.views - a.views);
        articlesByLikes = [...articles].sort((a, b) => b.likes - a.likes);
    }

    return (
        <Paper elevation={3} sx={{ margin: "20px", borderRadius: "20px", padding: "20px" }}>
            <Box sx={{ marginBottom: "20px", borderBottom: "2px solid black", paddingBottom: "20px" }}>
                <Typography variant="h6" sx={{margin:"1% 0 1% 0"}}>
                    Featured by Views
                </Typography>
                <Grid container spacing={2}>
                    {articlesByViews.map((article, index) => (
                        index < 2 && (
                            <Grid item key={article.id} xs={12}>
                                <Card sx={{ display: 'flex', alignItems: 'center', height: '150px'}}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: "40%", margin:"0 1% 0 2%" }}
                                        alt={article.title}
                                        image={article.pic}
                                        
                                    />
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography variant="subtitle1">
                                            <Link 
                                            style={{ textDecoration: 'none', color: 'inherit' }} 
                                            to ={`/explore/${article.id}`}
                                            >
                                                {article.title}
                                            </Link>
                                            
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Author: {article.author}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Views: {article.views}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    ))}
                </Grid>
            </Box>

            <Box>
                <Typography variant="h6" sx={{margin:"1% 0 1% 0"}}>Featured by Likes</Typography>
                <Grid container spacing={2}>
                    {articlesByLikes.map((article, index) => (
                        index < 2 && (
                            <Grid item key={article.id} xs={12}>
                                <Card sx={{ display: 'flex', alignItems: 'center', height: '150px' }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: "40%", margin:"0 1% 0 2%" }}
                                        image={article.pic}
                                        alt={article.title}
                                        
                                    />
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography variant="subtitle1">
                                            <Link 
                                            style={{ textDecoration: 'none', color: 'inherit' }}
                                            to ={`/explore/${article.id}`}
                                            >
                                                {article.title}
                                            </Link>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Author: {article.author}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Likes: {article.likes}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    ))}
                </Grid>
            </Box>
        </Paper>
    );
};

export default FeaturedList;
