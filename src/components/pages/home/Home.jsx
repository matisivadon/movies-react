import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Header from '../../common/header/Header'
import CardMovie from '../../common/cardMovie/CardMovie'
import CreateMovieModal from '../../common/createMovieModal/CreateMovieModal'
import confetti from 'canvas-confetti'
import './home.css'
import Button from '@mui/material/Button'

const Home = () => {

    const [movies, setMovies] = useState([])
    const [dispatchLike, setDispatchLike] = useState(false)
    const [favorite, setFavorite] = useState(false)
    const [open, setOpen] = useState(false)
    const [isMovieCreated, setIsMovieCreated] = useState(false)
    const [isMovieDeleted, setIsMovieDeleted] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    useEffect(() => {
        axios.get('http://localhost:8080/movies')
            .then(res => setMovies(res.data))
            .catch(err => console.log(err))

            setDispatchLike(false)
            setIsMovieCreated(false)
            setIsMovieDeleted(false)
    }, [dispatchLike, isMovieCreated, isMovieDeleted])


    const handleLike = (movie) => {

        if(!movie.isLiked) {
            confetti({
                zIndex: 999,
                particleCount: 200,
                spred:160,
                angle: -100,
                origin: {
                    x: 0.5,
                    y:0.2
                }
            })
        }

        axios.patch(`http://localhost:8080/movies/${movie.id}`, {isLiked: !movie.isLiked})
            .then(res => setDispatchLike(true))
            .catch(err => console.log(err))
    }

    const moviesFiltered = movies.filter(movie => movie.isLiked)

    const deleteMovieById = (id) => {
        axios.delete(`http://localhost:8080/movies/${id}`)
            .then(res => setIsMovieDeleted(true))
            .catch(err => console.log(err))
    }

  return (
    <>
        <Header setFavorite={setFavorite}/>
        <Button onClick={handleOpen}>Agregar Pelicula</Button>
        <CreateMovieModal open={open} handleClose={handleClose} setIsMovieCreated={setIsMovieCreated}/>
        <div className='container-cards'>
            {
                !favorite? (
                    movies.map((movie) => {
                        return(
                            <CardMovie movie={movie} key={movie.id} handleLike={handleLike} deleteMovieById={deleteMovieById} />
                        )
                      })  
                ) : (
                    moviesFiltered.map((movie) => {
                        return(
                            <CardMovie movie={movie} key={movie.id} handleLike={handleLike} deleteMovieById={deleteMovieById} />
                        )
                      })  
                )
            } 
        </div>
    </>
  )
}

export default Home