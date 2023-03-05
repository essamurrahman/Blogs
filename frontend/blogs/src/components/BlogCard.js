import { Link, Navigate, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';
import './BlogCard.css';

function BlogCard (props){
    // const params = useParams();
    return (
        <>
        <div className="cards">
            <div className="heading-cards">
                <h1 className='heading-cards'>{props.title}</h1>
                <p>{props.userId}</p>
            </div>
            <div className="para-cards">
                <p>
                    {props.content}
                </p>
                <Link to={props.id} id={props.id} title={props.title} content={props.content}>
                    <button className="btnCards"
                    //   onclick={ViewHandler}
                    >View</button>
                    </Link>              
                <button className="btnCards">Delete</button>
             </div>
        </div>
        </>
    );
};

export default BlogCard;
