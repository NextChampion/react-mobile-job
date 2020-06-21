import React from 'react';

import image from './APPIcon.png'
import './logo.css';

class Logo extends React.Component {
    render() {
        return (
            <div className="logo-container">
                <img src={image} alt=""></img>
            </div>
        )
    }
}

export default Logo;