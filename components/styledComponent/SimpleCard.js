import React from 'react';
import { StyleSheet } from 'react-native';
import SimpleContainer from '../simpleComponents/SimpleContainer';
import { colors } from '../../assets/colors';

const SimpleCard = ({ style, children, ...props }) => {
    return (
        <SimpleContainer
            style={[styles.card, style]}
            {...props}
        >
            {children}
        </SimpleContainer>
    );
};

const styles = StyleSheet.create({
    card: {
        justifyContent: 'flex-end',
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: 16,
        margin: 8,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,

        elevation: 3,
    },
});

export default SimpleCard;
