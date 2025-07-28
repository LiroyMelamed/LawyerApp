import React, { forwardRef } from 'react';
import { View } from 'react-native';

const SimpleContainer = forwardRef(({ children, style, ...rest }, ref) => {
    return (
        <View ref={ref} style={[style]} {...rest}>
            {children}
        </View>
    );
});

export default SimpleContainer;
