import Home from './views/Home'
import Movies from './views/Movies'
import Movie from './views/Movie'
import Search from './views/Search'
import Pagination from './views/Pagination'
import Bookmark from './views/Bookmark'

export const routes = [
    {
        path:'/',
        element:<Home/>,
        exact:true,
        auth:false
    },
    {
        path:'/fimler',
        element:<Movies/>,
        exact:true,
        auth:false
    },
    {
        path:'/:type/:movie_id',
        element:<Movie />,
        exact:true,
        auth:false
    },{
        path:'/search',
        element:<Search />,
        exact:true,
        auth:false
    },
    {
        path:'/populer',
        element:<Pagination name="popular" />,
        exact:true,
        auth:false
    },
    {
        path:'/gosterimdekiler',
        element:<Pagination name="on_vision" />,
        exact:true,
        auth:false
    },
    {
        path:'/yakinda',
        element:<Pagination name="movie_soon" />,
        exact:true,
        auth:false
    }
    ,
    {
        path:'/populer-tv',
        element:<Pagination name="tv_series" />,
        exact:true,
        auth:false
    },{
        path:'/yer-imleri',
        element:<Bookmark/>,
        exact:true,
        auth:false
    }
];