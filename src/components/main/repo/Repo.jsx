import React from 'react';
import './repo.scss';
import {NavLink} from "react-router-dom";

const Repo = ({repos}) => {
    const {name, stargazers_count, updated_at, html_url} = repos;
    return (
        <div className="repo">
            <div className="repo-header">
                <div className="repo-header-name"><NavLink to={`/card/${repos.owner.login}/${name}`}>{name}</NavLink></div>
                <div className="repo-header-stars">{stargazers_count}</div>
            </div>
            <div className="repo-last-commit">{updated_at}</div>
            <a href={html_url} className="repo-link">Ссылка на репозиторий</a>
        </div>
    );
};

export default Repo;