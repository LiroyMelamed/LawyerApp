import React from 'react';
import SimpleContainer from './SimpleContainer';

export default function SimpleScreen({ children, imageBackgroundSource, style }) {

    const screenStyle = {
        ...styles.screen,
        backgroundImage: `url(${imageBackgroundSource})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const childrenContainerStyle = {
        ...styles.childrenContainer,
        width: '100%',
        ...style,

    };

    return (
        <SimpleContainer style={screenStyle}>
            <SimpleContainer style={childrenContainerStyle}>
                {children}
            </SimpleContainer>
        </SimpleContainer>
    );
}

const styles = {
    screen: {
        display: 'flex',
        flexDirection: 'row',
        height: '100dvh',
        width: '100dvw',
        position: 'relative',
    },
    childrenContainer: {
        display: 'flex',
    },
};