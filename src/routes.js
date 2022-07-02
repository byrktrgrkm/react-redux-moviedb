import Home from './views/Home'
import Movies from './views/Movies'
import Movie from './views/Movie'
import Search from './views/Search'
import Pagination from './views/Pagination'

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
        element:<Pagination name="Popüler" />,
        exact:true,
        auth:false
    },
    {
        path:'/gosterimdekiler',
        element:<Pagination name="Gösterimdekiler" />,
        exact:true,
        auth:false
    },
    {
        path:'/yakinda',
        element:<Pagination name="Yakında" />,
        exact:true,
        auth:false
    }
    ,
    {
        path:'/populer-tv',
        element:<Pagination name="Popüler Tv Programları" />,
        exact:true,
        auth:false
    }
];