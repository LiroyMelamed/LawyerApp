import React, { forwardRef } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../assets/colors'; // Assuming you have your color constants

const SimpleButton = forwardRef(
  ({ style, textStyle, onPress, disabled, onPressIn, onPressOut, children, ...props }, ref) => {

    function handlePress(event) {
      if (!disabled) {
        onPress?.(event);
      }
    }

    return (
      <TouchableOpacity
        {...props}
        style={[styles.button, disabled && styles.buttonDisabled, style]} // Apply styles, including the disabled style
        onPress={handlePress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        disabled={disabled}
        ref={ref}
      >
        <Text style={[styles.buttonText, textStyle]}>{children}</Text>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.transparent, // Transparent background
    borderWidth: 1,
    borderColor: colors.primary, // Border color (default)
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: colors.disabled, // Disabled button color
    borderColor: colors.disabled, // Disabled border color
  },
  buttonText: {
    color: colors.primary, // Text color
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SimpleButton;
