import React from 'react';
import './Cards.css';

export const Card = (props) =>{ 
    return (
      <div key={props.name} className="Card">
        <img className="Card-image" src={props.flag} alt="flag" />
        <div className="Card-body">
          <h5 className="Card-title">{props.name}</h5>
          <p className="Card-text">Capital: {props.capital}</p>
          <p className="Card-text">Region: {props.region}</p>
          <p className="Card-text">Population: {props.population}</p>
        </div>
      </div>
    )
}

export default Card;