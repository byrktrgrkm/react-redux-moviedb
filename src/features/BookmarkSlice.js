import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: localStorage.getItem('bookmarks.data'),
  perPage:parseInt(localStorage.getItem('bookmarks.perpage')),
  perPageSettings:{
    default:8,
    min:4,
    max:10
  }
};


if(initialState.data){
    try{
        initialState.data = JSON.parse(initialState.data)
    }catch{
        console.error("bookmarks is not json formatted");
    }
}

if( ! initialState.data || ! Array.isArray(initialState.data) ){
    initialState.data = [];
}

if( !Number.isInteger(initialState.perPage))
    initialState.perPage = initialState.perPageSettings.default
else if(initialState.perPage < initialState.perPageSettings.min || initialState.perPage > initialState.perPageSettings.max)
    initialState.perPage = initialState.perPageSettings.default


export const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    setPerPage: (state,action) =>{
        const perpage = action.payload;
        if(
            [
                Number.isInteger(perpage),
                perpage >= state.perPageSettings.min,
                perpage <= state.perPageSettings.max
            ].every(p => p === true)
        
        ){
            state.perPage = perpage;
            localStorage.setItem('bookmarks.perpage',perpage)
        }
    },
    addBookmark: (state,action) => {
        const data = action.payload;

        const id = data.id;
        if( id && state.data.length  > 0){

            const status = state.data.find(item => item.id === id) !== undefined;
            if(status){
                return;
            }
        } 
        state.data = [...state.data,data]
        localStorage.setItem("bookmarks.data",JSON.stringify(state.data))

    },
    deleteBookmark: (state,action) => {
        const id = action.payload;
        state.data = state.data.filter(item => item.id !== id);
        localStorage.setItem("bookmarks.data",JSON.stringify(state.data))
    },
    
   
  },
});

export const { addBookmark,deleteBookmark,setPerPage } = bookmarkSlice.actions;

export const selectBookmarks = (state) => state.bookmark.data;
export const selectBookmarksPerpage = (state) => state.bookmark.perPage;

export default bookmarkSlice.reducer;

export const bookmarkContains = (data,id) =>{
    return data.find(i => i.id == id) !== undefined
}