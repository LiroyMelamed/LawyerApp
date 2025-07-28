import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors } from '../../assets/colors'; // Assuming you have your colors defined

const SimpleText = ({
    size = 16,
    bold = false,
    color = colors.text,
    children,
    style,
    ...props
}) => {
    return (
        <Text
            style={[
                styles.text,
                { fontSize: size, fontWeight: bold ? 'bold' : 'normal', color: color },
                style, // Additional custom styles passed via props
            ]}
            {...props} // Spread other props (like onPress, etc.)
        >
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        margin: 0,              // Ensure there's no default margin
        textAlign: 'right',      // Align text to the right
        writingDirection: 'rtl', // Right-to-left text support
    },
});

export default SimpleText;
