// import {FaHeart, FaRegHeart} from 'react-icons/fa'
import React, {useEffect, useState} from 'react'

import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'
import axios from 'axios'




    const Movie =({item, fetchUrl }) => {
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("");
    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            console.log(request.data.results)
            return request;
        }

        fetchData();
    }, [fetchUrl])

    const opts = {
      
        playerVars: {
            autoplay: 1,
        }
    }

    const handleClick = (item) => {
        if(trailerUrl){
            setTrailerUrl("");
        } else {
            movieTrailer(item?.title || "")
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            })
            .catch(() => console.log('Temporary Unavailable'))
        }
    }

  return (
    <div className=' w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
    <img className='w-full h-28 ' 
     src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path} `} alt={item?.title}/>
   
   <div className='absolute top-0 left-0 w-full h-32	  hover:bg-black/80 opacity-0 hover:opacity-100 text-white style="
    height: 100px;'  onClick = {() => handleClick(item)}>
       
   

       <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center top-48 items-center h-full text-center'   >
        {item?.title}
       <br></br>
       Date: {item?.release_date}
       <br></br>
       Rate: {item?.vote_average}  
       {/* <img 
                        
                        onClick = {() => handleClick(item)}
                        className = {`object-contain	 w-20 h-5 mx-3  hover:block  transition-transform  `}
                        src = {`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`} 
                        alt = {item?.name} /> */}
       </p>
       
   </div>
  

 
   {trailerUrl && <YouTube videoId = {trailerUrl} opts = {opts} className='   h-full  w-full '/> }
   </div>
  )
}

export default Movie