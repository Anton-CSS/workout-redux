import React, {useEffect, useState} from 'react';
import './maim.scss';
import {useDispatch, useSelector} from "react-redux";
import {getRepos} from "../actions/repos";
import Repo from "./repo/Repo";
import {setCurrentPage} from "../../reducers/repoReducer";
import {createPages} from "../../createPages";

const Main = () => {
    const dispatch = useDispatch();
    const repos = useSelector(state => state.repos.items);
    const isLoading = useSelector(state => state.repos.isLoading);
    const page = useSelector(state => state.repos.currentPage);
    const allPage = useSelector(state => state.repos.allPage);
    const totalCount = useSelector(state => state.repos.totalCount);
    const [searchValue, setSearchValue] = useState('');
    const pagesCount = Math.ceil(totalCount / allPage)
    let pages = [];
    createPages(pages, pagesCount, page);
    useEffect(()=>{
        dispatch(getRepos(searchValue, page, allPage));
},[page ]);
    const searchHandler = () => {
        dispatch(setCurrentPage(1));
        dispatch(getRepos(searchValue, page, allPage));
    }

    return (
        <div>
            <div className={'search'}>
                <input
                    value={searchValue}
                    type="text"
                    onChange={(e)=>setSearchValue(e.target.value)}
                    className={'search-input'}
                    placeholder={'Input repo name'}
                />
                <button onClick={()=>searchHandler()} className={'search-btn'}>Search</button>
            </div>
            {isLoading === false ?
            repos.map(repo =><Repo key={repo.id} repos={repo}/>)
            :
            <div className={'fetching'}></div>}
            <div className="pages">
                {pages.map((item, index) => <span
                    key={index}
                    className={page === item ? 'current-page': 'page'}
                onClick={()=> dispatch(setCurrentPage(item))}
                >{item}</span>)}
            </div>
        </div>
    );
};

export default Main;