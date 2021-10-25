import {setFetch, setRepos} from "../../reducers/repoReducer";


export const getRepos = (searchQuery = "stars:%3E1", currentPage, allPade) => {
    if(searchQuery === ''){
        searchQuery = "stars:%3E1";
    }
  return async (dispatch) =>{
      dispatch(setFetch(true));
      const response = await fetch(`https://api.github.com/search/repositories?q=${searchQuery}&sort=stars&per_page=${allPade}&page=${currentPage}`);
      const result = await response.json();
      dispatch(setRepos(result));
      dispatch(setFetch(false));
  }
}