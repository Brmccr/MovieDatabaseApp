import React from 'react';
import './FourColGrid.css';

const FourColGrid = (props) => {

    const renderThumbnails = () => {
        //mapping through all elements in the array, can modify with function and create new array
        const gridThumbnails = props.children.map( (element, i) => {
            return(
                <div key={i} className="movie-grid-element">
                    {element}
                </div>
            )
        })
        return gridThumbnails;
    }
    
    return(
        <div className="movie-grid">
            {/* // ternary will show loading - if not loading show h1 tag - otherwise show null */}
            {props.header && !props.loading ? <h1>{props.header}</h1> : null}
            <div className="movie-grid-content">
                {renderThumbnails()}
            </div>
        </div>
    )
}

export default FourColGrid;