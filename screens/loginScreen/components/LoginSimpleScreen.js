import React from 'react';
import SimpleScreen from '../../../components/simpleComponents/SimpleScreen';
import SimpleContainer from '../../../components/simpleComponents/SimpleContainer';
import { images } from '../../../assets/images/images'; // Make sure this is correctly imported
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';

export default function LoginSimpleScreen({
    unScrollableTopComponent,
    unScrollableBottomComponent,
    children,
    style,
}) {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <SafeAreaView>
                <SimpleScreen
                    imageBackgroundSource={images.AppBackground}
                    style={{ width: '100%', padding: 20, justifyContent: 'center', ...style }}
                >
                    <SimpleContainer
                        style={{
                            display: 'flex',
                            height: '100%',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        {unScrollableTopComponent}
                        <SimpleContainer style={{ flex: 1 }}>
                            {children}
                        </SimpleContainer>
                        {unScrollableBottomComponent}
                    </SimpleContainer>
                </SimpleScreen>
            </SafeAreaView>
        </KeyboardAvoidingView>

    );
}
