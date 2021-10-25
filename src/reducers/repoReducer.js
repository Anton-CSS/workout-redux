const SET_REPOS = 'SET_REPOS';
const SET_FETCH = 'SET_FETCH';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

const defaultState ={
    items:[],
    isLoading: true,
    currentPage: 1,
    allPage: 10,
    totalCount: 0
}

export default function repoReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_REPOS:{
            return {...state, items: action.payload.items, isLoading: false, totalCount: action.payload.total_count}
        }
        case SET_FETCH:{
            return {...state, isLoading: action.payload}
        }
        case SET_CURRENT_PAGE:{
            return {...state, currentPage: action.payload}
        }
        default:{
            return state;
        }
    }
}

export const setRepos = (repos) => ({type: SET_REPOS, payload: repos});
export const setFetch = (bool) => ({type: SET_FETCH, payload: bool});
export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, payload: page});
