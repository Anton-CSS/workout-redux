import React, {useEffect, useState} from 'react';
import './card.scss';
import {useParams} from "react-router-dom";
import {getCurrentRepo} from "../actions/repos";

const Card = (props) => {
    const {username, reponame} = useParams();
    const [repo, setRepo] = useState({});
    useEffect(  () =>{
       getCurrentRepo(username, reponame, setRepo);
    },[]);

    return (
        <div>
            <button onClick={()=> props.history.goBack()} className={'back-btn'}>BACK</button>
            {repo.name ?
                <div className="card">
                    <img src={repo.owner.avatar_url} alt=""/>
                    <div className="name">{repo.name}</div>
                    <div className="stars">{repo.stargazers_count}</div>
                </div>
                :
                null
            }
        </div>
    );
};

export default Card;