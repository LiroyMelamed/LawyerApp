import { images } from "../../../assets/images/images";
import SimpleContainer from "../../../components/simpleComponents/SimpleContainer";
import SimpleImage from "../../../components/simpleComponents/SimpleImage";
import { Text32 } from "../../../components/specializedComponents/text/AllTextKindFile";

export default function TopCenteredLogoOtp({ logoSrc = images.Logos.FullLogoBlack, logoWidth = 100, style }) {
    const ContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginTop: 40,
        ...style,
    };

    return (
        <SimpleContainer style={ContainerStyle}>

            <SimpleImage
                src={logoSrc}
                style={{ maxHeight: 50, alignSelf: 'center' }}
            />

            <Text32 style={{ marginTop: 60, textAlign: 'center', alignSelf: 'center' }}>הקלד את הקוד שקיבלת בהודעה</Text32>

        </SimpleContainer>
    );
}
