import React, { useEffect, useState } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { colors } from '../../assets/colors';

const SimpleLoader = ({ style }) => {
    // Create Animated values for each dot to control opacity
    const [dot1] = useState(new Animated.Value(0));
    const [dot2] = useState(new Animated.Value(0));
    const [dot3] = useState(new Animated.Value(0));

    // Function to animate dots
    const animateDots = () => {
        Animated.sequence([
            // Animate first dot
            Animated.timing(dot1, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(dot1, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            // Animate second dot
            Animated.timing(dot2, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(dot2, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            // Animate third dot
            Animated.timing(dot3, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(dot3, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    };

    useEffect(() => {
        animateDots(); // Start the animation
        const interval = setInterval(animateDots, 900); // Re-run the animation every 900ms
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <View style={[styles.loaderContainer, style]}>
            <Animated.View
                style={[styles.dot, { opacity: dot1 }]}
            />
            <Animated.View
                style={[styles.dot, { opacity: dot2, marginLeft: 8 }]}
            />
            <Animated.View
                style={[styles.dot, { opacity: dot3, marginLeft: 8 }]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // height: '100%',
        // width: '100%',
        backgroundColor: colors.transparent, // Optional background color
    },
    dot: {
        width: 8,
        height: 8,
        backgroundColor: colors.text, // Set color for the dot
        borderRadius: 4, // Make it circular
    },
});

export default SimpleLoader;
