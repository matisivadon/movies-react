import React from 'react'
import './header.css'

const Header = ({setFavorite}) => {
  return (
    <div className='header-container'>
        <h3 className='header-title'>Peliculas</h3>
        <div className='header-options'>
            <button className='header-button' onClick={()=>setFavorite(false)}>Todos</button>
            <button className='header-button'onClick={()=>setFavorite(true)}>Favoritos</button>
        </div>

    </div>
  )
}

export default Header