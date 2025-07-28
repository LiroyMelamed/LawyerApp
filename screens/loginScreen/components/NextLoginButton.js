import PrimaryButton from "../../../components/styledComponent/buttons/PrimaryButton";

export default function NextLoginButton({ isProcessing, buttonText = 'להתחברות', leftIcon, rightIcon, onPress, style, ...props }) {
    const buttonStyle = {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        width: 240,
        ...style
    }
    return (
        <PrimaryButton
            isPerforming={isProcessing}
            children={buttonText}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            style={buttonStyle}
            onPress={onPress}
            {...props}
        />
    );
}