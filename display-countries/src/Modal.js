import React from 'react'
import './Modal.css';

const Modal = props => {
    if (!props.show){
        return null
    }
    return(
        <div className="Modal" onClick={props.onClose}>
        <div className="Modal-Content" onClick={e => e.stopPropagation()}>
            <div className = "Modal-Header">
            <button className = "Close" onClick={props.onClose}> X </button>
            </div>
            <div className="Modal-Body">
                <img className="Modal-image" src={props.flag} alt="flag" /> 
                <p className="Modal-title">{props.name}</p>
                <p className="Modal-text">Alpha 2 code: {props.alpha2code}</p>
                <p className="Modal-text">Capital: {props.capital}</p>
                <p className="Modal-text">Region: {props.region}</p>
                <p className="Modal-text">Population: {props.population}</p>
                <p className="Modal-text">Latlng: {props.latlng}</p>
                <p className="Modal-text">Area: {props.area}</p>
                <p className="Modal-text">Timezone: {props.timezone}</p>
                <p className="Modal-text">Neighbour countries: {props.borders.map(border => border + " ")} </p>
                <p className="Modal-text">Currencies: {props.currencies.map(currency => currency.name + "  " + currency.symbol)}</p>
                <p className="Modal-text">Official languages: {props.languages.map(language => language.name )} </p>
            </div>
        </div>
    </div>
        
    )
}

export default Modal;