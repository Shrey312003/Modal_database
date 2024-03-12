import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // Empty heart icon
import FavoriteIcon from '@mui/icons-material/Favorite'; // Filled heart icon
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function MediaCard({ card_data }) {
    const navigate = useNavigate();
    const [liked, setLiked] = React.useState(false); // State to track if the item is likedc
    const url = `https://my-json-server.typicode.com/Shrey312003/Modal_database/posts/${card_data.id}`

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    };

    const handleExplore = (id) => {
        navigate(`/explore/${id}`);
    };

    
    const likeUpdate = (flag) => {
        let updatedVal;
        if(flag){
            updatedVal = { ...card_data, likes: card_data.likes + 1 };
        }

        else{
            updatedVal = { ...card_data, likes: card_data.likes };
        }
        
        axios.put(url, updatedVal)
        .then(resp => {
            console.log('Likes updated', resp.data);
        })
        .catch(error => {
            console.error('Error updating views', error);
        });
    }
    

    
    const toggleLike = () => {

        if(!liked){
            likeUpdate(true);
        }
        else{
            likeUpdate(false);
        }
        setLiked(!liked); // Toggle the liked state
    };

    return (
        <Card sx={{ width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <CardMedia
                sx={{ height: "200px" }}
                image={card_data.pic}
                title={card_data.title}
            />
            <CardContent sx={{ flex: '1' }}>
                <Typography gutterBottom variant="h5" component="div">
                    {card_data.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {truncateText(card_data.body, 300)}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                
                <Button size="small" onClick={() => handleExplore(card_data.id)}>View</Button>
                <IconButton onClick={toggleLike} color="error">
                    {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
            </CardActions>
        </Card>
    );
}
