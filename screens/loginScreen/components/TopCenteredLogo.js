import { StyleSheet } from "react-native";
import { colors } from "../../../assets/colors";
import { images } from "../../../assets/images/images";
import SimpleContainer from "../../../components/simpleComponents/SimpleContainer";
import SimpleImage from "../../../components/simpleComponents/SimpleImage";
import { Text32 } from "../../../components/specializedComponents/text/AllTextKindFile";

export default function TopCenteredLogo({ logoSrc = images.Logos.FullLogoBlack, logoWidth = 100, style }) {
    const ContainerStyle = StyleSheet.create({
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginTop: 20,
        ...style, // Spread the additional styles passed via props
    });


    return (
        <SimpleContainer style={ContainerStyle}>
            <SimpleImage
                src={logoSrc}
                tintColor={colors.text}
                style={{ maxHeight: 50, width: '100%' }}
            />

            <Text32 style={{ marginTop: 60, textAlign: 'center', alignSelf: 'center' }}>כל המידע על התיק שלך במקום אחד!</Text32>
        </SimpleContainer>
    );
}
