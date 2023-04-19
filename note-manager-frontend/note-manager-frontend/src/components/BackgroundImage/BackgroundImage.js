import React from 'react';

const BackgroundImage = ({ children }) => {
    return (
        <div style={{ backgroundImage: 'url(../../assests/noteImage.jpg)', height: '100vh',width : '100vw', backgroundSize: 'cover', backgroundPosition: 'center',backgroundRepeat: 'no-repeat',zIndex:'2' }}>
            { children }
        </div>
    );
}

export default BackgroundImage;