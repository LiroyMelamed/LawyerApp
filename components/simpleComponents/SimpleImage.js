import React from 'react';
import { Image } from 'react-native';

export default function SimpleImage({ src, style, tintColor = null, resizeMode = 'contain', ...props }) {
    const imageStyle = {
        ...style,
        resizeMode,
        tintColor,
    };

    return (
        <Image
            source={typeof src === 'string' ? { uri: src } : src}
            style={imageStyle}
            {...props}
        />
    );
}
