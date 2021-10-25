import {setError, setFetch, setRepos} from "../../reducers/repoReducer";


export const getRepos = (searchQuery = "stars:%3E1", currentPage, allPade) => {
    if(searchQuery === ''){
        searchQuery = "stars:%3E1";
    }
  return async (dispatch) =>{
        try {
            dispatch(setFetch(true));
            const response = await fetch(`https://api.github.com/search11/repositories?q=${searchQuery}&sort=stars&per_page=${allPade}&page=${currentPage}`);
            const result = await response.json();
            dispatch(setRepos(result));
            dispatch(setFetch(false));
        } catch (e){
            dispatch(setError(true));
            dispatch(setFetch(false));
            // setTimeout(()=>{
            //     dispatch(setError(false));
            // }, 2000)
        }
  }
}

export  const getCurrentRepo = async (username, reponame, setRepo) =>{
        const response = await fetch(`https://api.github.com/repos/${username}/${reponame}`);
        const result = await response.json();
        setRepo(result);
}

