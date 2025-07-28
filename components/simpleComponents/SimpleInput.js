import { View, TextInput, StyleSheet } from 'react-native';
import { forwardRef, useState, useEffect } from 'react';
import { colors } from '../../assets/colors';
import SimpleIcon from './SimpleIcon';

const SimpleInput = forwardRef(
    ({
        title,
        titleFontSize = 16,
        leftIcon,
        rightIcon,
        tintColor,
        IconStyle,
        textStyle,
        style,
        value,
        onChange,
        inputSize = 'Medium',
        disabled = false,
        onFocus,
        onBlur,
        error,
        timeToWaitInMilli = 500,
        ...props
    }, ref) => {
        const [isFocused, setIsFocused] = useState(false);
        const [delayedValue, setDelayedValue] = useState(value);
        const [timeoutId, setTimeoutId] = useState(null);

        const sizeStyles = inputStyles[inputSize];

        const getBorderColor = () => {
            if (disabled) return colors.disabledHighlighted;
            if (error) return colors.error;
            return isFocused ? colors.primaryHighlighted : colors.secondaryHighlighted;
        };

        const getBackgroundColor = () => (disabled ? colors.disabled : colors.white);

        const handleFocus = () => {
            onFocus?.();
            setIsFocused(true);
        };

        const handleBlur = (event) => {
            onBlur?.(event);
            setIsFocused(false);
        };

        const handleInputChange = (newValue) => {
            setDelayedValue(newValue);

            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            const newTimeoutId = setTimeout(() => {
                onChange?.(newValue);
                setTimeoutId(null);
            }, timeToWaitInMilli);

            setTimeoutId(newTimeoutId);
        };

        useEffect(() => {
            setDelayedValue(value);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        }, [value]);

        // Check if the input is empty to adjust the label position
        const isEmpty = !delayedValue;

        return (
            // Wrap the entire component with TouchableWithoutFeedback to dismiss the keyboard
            <View
                ref={ref}
                style={[
                    styles.container,
                    {
                        borderColor: getBorderColor(),
                        backgroundColor: getBackgroundColor(),
                        height: sizeStyles.height,
                        ...style,
                    },
                ]}
            >
                {rightIcon && (
                    <SimpleIcon
                        tintColor={tintColor || getBorderColor()}
                        src={rightIcon}
                        style={[IconStyle, styles.icon]}
                    />
                )}

                <TextInput
                    style={[
                        styles.input,
                        {
                            paddingLeft: leftIcon ? sizeStyles.paddingLeft : sizeStyles.padding,
                            paddingRight: rightIcon ? sizeStyles.paddingRight : sizeStyles.padding,
                            fontSize: sizeStyles.fontSize,
                            color: disabled ? colors.disabled : colors.text,
                            textAlign: 'right', // Right-to-left input
                            ...textStyle,
                        },
                    ]}
                    value={delayedValue}
                    onChangeText={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={title}
                    editable={!disabled}
                    {...props}
                />

                {leftIcon && (
                    <SimpleIcon
                        tintColor={tintColor || getBorderColor()}
                        src={leftIcon}
                        style={[IconStyle, styles.icon]}
                    />
                )}
            </View>
        );
    }
);

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 12,
        margin: 8,
        paddingHorizontal: 8,
    },
    input: {
        flex: 1,
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 0,
        fontFamily: 'Fredoka',
        outline: 'none',
    },
    icon: {
        width: 24,
        height: 24,
        marginHorizontal: 8,
    },
});

const inputStyles = {
    Small: {
        height: 24,
        fontSize: 12,
        padding: 8,
        transformFocused: [{ translateY: -10 }, { scale: 0.7 }],
    },
    Medium: {
        height: 48,
        fontSize: 16,
        padding: 8,
        transformFocused: [{ translateY: -15 }, { scale: 0.7 }],
    },
    Big: {
        height: 60,
        fontSize: 24,
        padding: 16,
        transformFocused: [{ translateY: -15 }, { scale: 0.7 }],
    },
};

export default SimpleInput;

export const inputSize = {
    SMALL: 'Small',
    MEDIUM: 'Medium',
    BIG: 'Big',
};
