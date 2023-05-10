import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button'



  

const CardMovie = ({movie, handleLike, deleteMovieById}) => {
    const {id, name, description, img, createdAt, isLiked} = movie


  return (
    <Card sx={{ width: 300, height: 500 }}>
      <CardHeader
        title= {name}
        subheader={createdAt}
      />
      <CardMedia
        component="img"
        height="194"
        image={img}
        alt="movies"
      />
      <CardContent sx={{ height: 150 }}>
        <Typography variant="body2" color="text.secondary">
         {description}
        </Typography>
      </CardContent>
      <CardActions sx={{display:'flex', justifyContent:'space-between'}}>
        <IconButton aria-label="add to favorites" onClick={()=> handleLike(movie)}>
          <FavoriteIcon color={isLiked? 'error' : 'disabled'} />
        </IconButton>
        <Button type='button' variant='contained' color='primary' onClick={ ()=>deleteMovieById(id) }>Eliminar</Button>
      </CardActions>
    </Card>
  )
}

export default CardMovie