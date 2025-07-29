import { forwardRef, useState } from "react";
import { colors } from "../../../assets/colors";
import { buttonSizes } from "../../../styles/buttons/buttonSizes";
import TextButtonWithTwoOptionalIcons from "../../specializedComponents/buttons/TextButtonWithTwoOptionalIcons";
import SimpleLoader from "../../simpleComponents/SimpleLoader";

const ICON_SIZE = 12;

const GenericButton = forwardRef(({
    children,
    disabled,
    size = buttonSizes.LARGE,

    backgroundColor = colors.transparent,
    pressedBackgroundColor = colors.transparent,
    disabledBackgroundColor = colors.transparent,

    contentColor = colors.white,
    pressedContentColor = colors.SideBarSelected,
    disabledContentColor = colors.disabled,

    hasBorder = false,
    leftIcon,
    rightIcon,

    holdPressed = false,
    onPress,
    onPressIn,
    onPressOut,

    shadowColor = colors.transparent,
    isPerforming = false,
    style: customStyle = {},
    ...props
}, ref) => {
    const [isPressed, setIsPressed] = useState(false);

    function handlePressIn(event) {
        if (isPressable()) {
            setIsPressed(true);
            onPressIn?.(event);
        }
    }

    function handlePressOut(event) {
        if (isPressable()) {
            setIsPressed(false);
            onPressOut?.(event);
        }
    }

    function handlePress(event) {
        if (isPressable()) {
            setIsPressed(false);
            onPress?.(event);
        }
    }

    function isPressable() {
        return !disabled && !isPerforming;
    }

    function isButtonPressed() {
        return holdPressed || isPressed;
    }

    function getContentColor() {
        if (disabled) {
            return disabledContentColor;
        }
        if (isButtonPressed()) {
            return pressedContentColor;
        }
        return contentColor;
    }

    function getBackgroundColor() {
        if (disabled) {
            return disabledBackgroundColor;
        }
        if (isButtonPressed()) {
            return pressedBackgroundColor;
        }
        return backgroundColor;
    }

    const buttonStyle = {
        ...styles.button,
        height: getButtonHeightBySize(size),
        backgroundColor: getBackgroundColor(),
        borderWidth: hasBorder ? 1 : 0,
        borderStyle: 'solid',
        borderColor: getContentColor(),
        boxShadow: disabled ? 'none' : `0px 2px 6px ${shadowColor}`,
        paddingHorizontal: size === buttonSizes.SMALL ? 8 : 16, // Add horizontal padding
        paddingVertical: size === buttonSizes.SMALL ? 4 : 8,   // Add vertical padding
        ...customStyle,
    };

    const textStyle = {
        ...styles.text,

        color: getContentColor(),
        fontSize: size === buttonSizes.SMALL ? 12 : 14,
    };

    return (
        <TextButtonWithTwoOptionalIcons
            {...props}
            ref={ref}
            onMouseDown={handlePressIn}
            onMouseUp={handlePressOut}
            onPress={handlePress}
            style={buttonStyle}
            textStyle={textStyle}
            leftIcon={isPerforming ? null : leftIcon}
            leftIconSize={ICON_SIZE}
            leftIconTintColor={getContentColor()}
            rightIcon={isPerforming ? null : rightIcon}
            rightIconSize={ICON_SIZE}
            rightIconTintColor={getContentColor()}
        >
            {isPerforming ? <SimpleLoader color={getContentColor()} /> : children}
        </TextButtonWithTwoOptionalIcons>
    );
});

const styles = {
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 130,
        width: 'auto',
    },
    text: {
        textAlign: 'center',
        marginHorizontal: 4,
    },
};

function getButtonHeightBySize(buttonSize) {
    switch (buttonSize) {
        case buttonSizes.LARGE:
            return 40;
        case buttonSizes.MEDIUM:
            return 32;
        case buttonSizes.SMALL:
            return 24;
        default:
            return 40;
    }
}

export default GenericButton;
