import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './createMovieModal.css'
import { TextField } from '@mui/material';
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const CreateMovieModal = ({open, handleClose, setIsMovieCreated}) => {

  let initialValues = {
    name: '',
    description: '',
    createdAd: '',
    img: ''
  }

  const onSubmit = (data) => {
    let movie = {
      name: data.name,
      description: data.description,
      img: data.img,
      createdAt: data.createdAt,
      isLiked: false

    }
    axios.post('http://localhost:8080/movies', movie)
      .then(res => {
        handleClose()
        setIsMovieCreated(true)
      })
      .catch(err => console.log(err))
  }

  const {handleChange, handleSubmit} = useFormik({
    initialValues,
    // validationSchema,
    onSubmit
  })

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form action='' className='form-modal' onSubmit={handleSubmit}>
          <Typography variant='h6' color='primary'>Agregar película</Typography>
          <TextField id="outlined-basic" label="Título de la película" variant="outlined" name='name'onChange={handleChange} fullWidth/>
          <TextField id="outlined-basic" label="Descripción" variant="outlined" name='description' onChange={handleChange} fullWidth/>
          <TextField id="outlined-basic" label="Adjuntar URL de la imagen" variant="outlined" name='img' onChange={handleChange} fullWidth/>
          <TextField id="outlined-basic" label="Fecha de creación" variant="outlined" name='createdAt' onChange={handleChange} fullWidth/>
          <Button type='submit' variant='contained' color='primary'>Agregar</Button>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default CreateMovieModal