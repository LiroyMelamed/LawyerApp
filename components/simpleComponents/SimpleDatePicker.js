import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { forwardRef, useState, useCallback } from 'react';
import { colors } from '../../assets/colors';
import SimpleIcon from './SimpleIcon';

const SimpleDatePicker = forwardRef(({
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
    mode = 'date',
    display = Platform.OS === 'ios' ? 'default' : 'spinner',
    minimumDate,
    maximumDate,
    inputSize = 'Medium',
    disabled = false,
    error,
    onPress,
    ...props
}, ref) => {
    const [showPicker, setShowPicker] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const sizeStyles = inputStyles[inputSize];

    const formattedDate = value instanceof Date && !isNaN(value)
        ? value.toLocaleDateString('he-IL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
        : '';

    const handleDateChange = useCallback((event, selectedDate) => {
        if (Platform.OS === 'android' && event.type === 'dismissed') {
            setShowPicker(false);
            setIsFocused(false);
            return;
        }

        setShowPicker(false);
        setIsFocused(false);

        if (selectedDate) {
            onChange?.(selectedDate);
        }
    }, [onChange]);

    const showDatePicker = useCallback(() => {
        if (disabled) return;
        setShowPicker(true);
        setIsFocused(true);
        onPress?.();
    }, [disabled, onPress]);

    return (
        <View
            style={[
                styles.container,
                {
                    borderColor: disabled
                        ? colors.disabledHighlighted
                        : error
                            ? colors.error
                            : isFocused
                                ? colors.primaryHighlighted
                                : colors.secondaryHighlighted,
                    backgroundColor: disabled ? colors.disabled : colors.white,
                    height: sizeStyles.height,
                },
                isFocused && styles.focusedShadow,
                style,
            ]}
        >
            <TouchableOpacity
                ref={ref}
                style={[
                    styles.inputDisplay,
                    {
                        fontSize: sizeStyles.fontSize,
                        color: disabled ? colors.disabled : colors.text,
                        paddingHorizontal: sizeStyles.padding,
                        textAlign: 'right',
                    },
                    textStyle,
                ]}
                onPress={showDatePicker}
                disabled={disabled}
                {...props}
            >
                <Text style={[styles.displayText, { fontSize: sizeStyles.fontSize, color: disabled ? colors.disabled : colors.text }]}>
                    {formattedDate || title}
                </Text>
            </TouchableOpacity>

            {rightIcon && (
                <SimpleIcon
                    tintColor={tintColor || colors.primaryHighlighted}
                    src={rightIcon}
                    style={[styles.icon, IconStyle]}
                />
            )}

            {leftIcon && (
                <SimpleIcon
                    tintColor={tintColor || colors.primaryHighlighted}
                    src={leftIcon}
                    style={[styles.icon, IconStyle]}
                />
            )}

            {showPicker && (
                <DateTimePicker
                    value={value || new Date()}
                    mode={mode}
                    display={display}
                    onChange={handleDateChange}
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                />
            )}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 12,
        margin: 8,
        paddingHorizontal: 8,
    },
    focusedShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    inputDisplay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    displayText: {
        textAlign: 'right',
        paddingVertical: 0,
    },
    icon: {
        width: 24,
        height: 24,
    },
});

export const inputStyles = {
    Small: {
        height: 40,
        fontSize: 12,
        padding: 8,
        labelTop: 14,
    },
    Medium: {
        height: 48,
        fontSize: 16,
        padding: 8,
        labelTop: 16,
    },
    Big: {
        height: 56,
        fontSize: 20,
        padding: 8,
        labelTop: 20,
    },
};

export default SimpleDatePicker;
