import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Chip, Stack, Avatar, CardMedia, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useFetch from '../hooks/useFetch';
import { CodeBlock } from "react-code-blocks";

//Get the complete data of the model
const Explore = () => {
    const { id } = useParams(); //get the id from url
    const url = `https://my-json-server.typicode.com/Shrey312003/Modal_database/posts/${id}`;
    const { data, loading, error } = useFetch(url);

    const [val, setVal] = useState(null); //views update 

    useEffect(() => {
        if (data) {
            setVal(data);
            console.log(data);
        }
    }, [data])

    useEffect(() => {
        if (val) {
            const updatedVal = { ...val, views: val.views + 1 };
            axios.put(url, updatedVal)
                .then(resp => {
                    console.log('Views updated', resp.data);
                })
                .catch(error => {
                    console.error('Error updating views', error);
                });
        }
    }, [val, url]);

    return (
        <Box sx={{ 
            marginTop: theme => theme.spacing(1), // Adjust the numeric value based on your navbar's height
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: 'calc(100vh - theme.spacing(8))', // Subtract the same value to maintain full height minus navbar and gap
            padding: '20px',
        }}>
            {loading && (
                <CircularProgress />
            )}
            {!loading && error && <div>Error: {error.message}</div>}
            {!loading && val && (
                <Card sx={{ 
                    width: '100%', 
                    maxWidth: '1000px', 
                    mx: 'auto',
                    boxShadow: 3, 
                    p: {
                        xs: 1, 
                        sm: 2, 
                        md: 3 
                    },
                }}>
                    <CardMedia
                        component="img"
                        height="300"
                        image={val.pic}
                        alt={val.title}
                    />
            <CardContent>
                <Typography variant="h4" gutterBottom>
                {val.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                By {val.author}
                </Typography>

                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Link 
                <a href={val.link}> {val.link} </a>
                </Typography>

                <Typography variant="body1" paragraph>
                {val.body}
                </Typography>

                <Box sx={{margin:"2% 0 2% 0 "}}>
                    <CodeBlock
                        text={val.code}
                        language='python'
                        showLineNumbers={false}
                    />
                    
                </Box>
                
                <Chip label={`Type: ${val.type}`} color="primary" />

                <Stack direction="row" spacing={1} sx={{ mb: 2 , marginTop:"2%"}}>
                <Chip icon={<Avatar sx={{ width: 24, height: 24 }}>👍</Avatar>} label={`${val.likes} Likes`} />
                <Chip icon={<Avatar sx={{ width: 24, height: 24 }}>👁️</Avatar>} label={`${val.views} Views`} />
                </Stack>
            </CardContent>
            </Card>
        )}
        
    </Box>
    );
};

export default Explore;

