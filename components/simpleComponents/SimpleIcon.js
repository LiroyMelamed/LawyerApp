import React from 'react';
import { Image } from 'react-native';

const SimpleIcon = ({ src, size = 24, tintColor, style, ...rest }) => {
    const iconStyle = {
        width: size,
        height: size,
        tintColor,
        ...style,
    };

    return <Image source={typeof src === 'string' ? { uri: src } : src} style={iconStyle} {...rest} />;
};

export default SimpleIcon;
