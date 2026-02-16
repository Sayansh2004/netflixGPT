const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer' 
    }
};


export const IMG_CDN_URL="https://image.tmdb.org/t/p/w500/";