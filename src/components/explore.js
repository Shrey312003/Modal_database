import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Chip, Stack, Avatar, CardMedia } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useFetch from '../hooks/useFetch';
import {CircularProgress} from '@mui/material';
import { Link } from 'react-router-dom';

const Explore = () => {
    const { id } = useParams();

    //   const [modal,setModal] = useState(null);

    const url = `https://my-json-server.typicode.com/Shrey312003/Modal_database/posts/${id}`;

    const {data,loading,error} = useFetch(url);

    // const val1 = data.filter((da)=>{
    //     return da.id == id
    // })

    //   setModal(val);
    const [val,setVal] = useState(null);

    useEffect(()=>{
        if(data){
            setVal(data);
            console.log(data);
        }
    },[data])

    useEffect(() => {
        if (val) {
            // Increment views and send the updated views to the server
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

    // console.log('Public URL:', process.env.PUBLIC_URL + val.pic);

    return (
    <Box sx={{ marginTop:"10px", display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '20px' }}>
        {(loading) && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress />
            </div>
        )} 
        {!loading && error && <div>Error: {error.message}</div>}
        {!loading && val && 
         (
            <Card sx={{ width: '100%', maxWidth: 1000 }}>
            <CardMedia
                component="img"
                height="240"
                image={`${process.env.PUBLIC_URL}/${val.pic}`}
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
                <Link> {val.link} </Link>
                </Typography>

                <Typography variant="body1" paragraph>
                {val.body}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Chip label={`Type: ${val.type}`} color="primary" />
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

