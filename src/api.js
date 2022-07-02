

const language = 'tr';
const default_type = 'movie'

export class API { 
     static c;
     constructor(value){
        this.value = value
     }
     static skeleton(value) {
         if( ! API.c){
            API.c =  new API(value);
         }
         return API.c;
    }
    static get(){
        return API.c;
    }
    static language(){
        if( ! API.c){
            API.c =  new API(language);
         }
        return API.c.value.toLowerCase();
    }
}



export const PopulerUrl = (page = 1,type=default_type) => process.env.REACT_APP_API_SERVER + `${type}/popular?api_key=${process.env.REACT_APP_API_KEY}&language=${API.language()}&page=${page}`
export const UpComing = (page = 1) => process.env.REACT_APP_API_SERVER + `movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=${API.language()}&page=${page}`
export const TrendUrl = (page = 1) => process.env.REACT_APP_API_SERVER + `trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&language=${API.language()}&page=${page}`
export const MovieUrl = (id,type=default_type) => process.env.REACT_APP_API_SERVER + `${type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=${API.language()}`
export const VideoUrl = (id,type=default_type) => process.env.REACT_APP_API_SERVER + `${type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=${API.language()}&page=1`
export const SimilarUrl = (id,type=default_type) => process.env.REACT_APP_API_SERVER + `${type}/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=${API.language()}&page=1`

export const RecommendationUrl = (id,type=default_type) => process.env.REACT_APP_API_SERVER + `${type}/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=${API.language()}&page=1`

export const SearchUrl = (query) => process.env.REACT_APP_API_SERVER + `search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=${API.language()}&include_adult=false&page=1&query=${query}`



export function ImageUrl_500(path){
    return `https://image.tmdb.org/t/p/w500${path}`;
}
export function ImageUrl_Original(path){
    return `https://image.tmdb.org/t/p/original${path}`;
}