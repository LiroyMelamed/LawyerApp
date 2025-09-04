import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Keyboard, Platform, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import SimpleInput from '../components/simpleComponents/SimpleInput';
import SimpleIcon from '../components/simpleComponents/SimpleIcon';
import { colors } from '../assets/colors';
import SimpleDatePicker from '../components/simpleComponents/SimpleDatePicker';
import { customersApi } from '../api/customersApi';
import useAutoHttpRequest from '../hooks/useAutoHttpRequest';
import * as FileSystem from 'expo-file-system';
import useHttpRequest from '../hooks/useHttpRequest';
import SimpleLoader from '../components/simpleComponents/SimpleLoader';
import PrimaryButton from '../components/styledComponent/buttons/PrimaryButton';
import { icons } from '../assets/icons/icons';

const ProfileScreen = () => {
    const [profile, setProfile] = useState({
        profilePic: null,
        profilePicBase64: null,
        name: '',
        email: '',
        companyName: '',
        phoneNumber: '',
        dateOfBirth: '',
    });

    const onSuccessSave = () => {
        Alert.alert(
            "הצלחה",
            "פרופיל התעדכן בהצלחה",
            [{ text: "אישור" }]
        );
    };

    const { isPerforming, performRequest } = useHttpRequest(customersApi.updateCurrentCustomer, onSuccessSave, null)
    const { isPerforming: isFetching } = useAutoHttpRequest(customersApi.getCurrentCustomer, {
        onSuccess: (data) => {
            setProfile((prevProfile) => ({
                ...prevProfile,
                name: data.Name,
                email: data.Email,
                companyName: data.CompanyName,
                phoneNumber: data.PhoneNumber,
                dateOfBirth: data.DateOfBirth ? new Date(data.DateOfBirth) : null,
                profilePic: data.ProfilePicUrl || null,
            }));
        },
        onFailure: (error) => {
            console.error("Error fetching customers:", error);
        }
    });

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permission.granted === false) return;

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
        });

        // Add a robust check to ensure the user did not cancel and assets exist
        if (result.canceled || !result.assets || result.assets.length === 0) {
            return;
        }

        const imageUri = result.assets[0].uri;

        const base64Image = await FileSystem.readAsStringAsync(imageUri, { encoding: FileSystem.EncodingType.Base64 });
        setProfile((prevProfile) => ({
            ...prevProfile,
            profilePic: imageUri,
            profilePicBase64: base64Image
        }));
    };

    const handleSave = () => {
        const payload = {
            Name: profile.name,
            Email: profile.email,
            PhoneNumber: profile.phoneNumber,
            CompanyName: profile.companyName,
            dateOfBirth: profile.dateOfBirth,
            profilePicBase64: profile.profilePicBase64,
        };

        performRequest(payload);
    };

    if (isFetching) {
        return <SimpleLoader />
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                        <View style={styles.header}>
                            <View style={styles.profilePicContainer}>
                                <Image
                                    source={
                                        profile.profilePicBase64
                                            ? { uri: `data:image/jpeg;base64,${profile.profilePicBase64}` }
                                            : profile.profilePic
                                                ? profile.profilePic.startsWith('data:image')
                                                    ? { uri: profile.profilePic } // Already base64 from DB
                                                    : { uri: `data:image/jpeg;base64,${profile.profilePic}` } // Fallback assume base64 stored as string
                                                : icons.ProfileDefaultIcon
                                    }
                                    style={styles.profilePic}
                                />

                                <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
                                    <SimpleIcon src={icons.EditIcon} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.name}>{profile.name}</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <View style={styles.form}>
                        <Text style={styles.sectionTitle}>מסך פרופיל</Text>

                        <SimpleInput
                            title="שם לקוח"
                            value={profile.name}
                            onChange={(value) => setProfile((prevProfile) => ({ ...prevProfile, name: value }))}
                        />

                        <SimpleInput
                            title="מייל"
                            value={profile.email}
                            onChange={(value) => setProfile((prevProfile) => ({ ...prevProfile, email: value }))}
                        />

                        <SimpleInput
                            title="מספר פלאפון"
                            value={profile.phoneNumber}
                            onChange={(value) => setProfile((prevProfile) => ({ ...prevProfile, phoneNumber: value }))}
                        />

                        <SimpleInput
                            title="שם חברה"
                            value={profile.companyName}
                            onChange={(value) => setProfile((prevProfile) => ({ ...prevProfile, companyName: value }))}
                        />

                        <SimpleDatePicker
                            title="תאריך לידה"
                            value={profile.dateOfBirth}
                            onChange={(value) => setProfile((prevProfile) => ({ ...prevProfile, dateOfBirth: value }))}
                        />

                        <PrimaryButton
                            style={styles.saveButton}
                            onPress={handleSave}
                            isPerforming={isPerforming}
                        >
                            <Text style={styles.saveText}>שמור</Text>
                        </PrimaryButton>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f7f7f7' },
    header: {
        alignItems: 'center',
        paddingVertical: 40,
        backgroundColor: colors.primary,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        position: 'relative',
    },
    profilePicContainer: {
        width: 150,
        height: 150,
        borderRadius: 500,
        borderWidth: 3,
        borderColor: '#fff',
        marginBottom: 10,
    },
    profilePic: {
        width: '100%',
        height: '100%',
        borderRadius: 500,
        overflow: 'hidden',
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: '#fff',
        padding: 3,
        borderRadius: 12,
        zIndex: 1000
    },
    name: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
    },
    form: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    sectionTitle: {
        color: colors.primaryHighlighted,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 4,
        fontWeight: '500',
    },
    saveButton: {
        marginTop: 20,
        justifyContent: 'center'
    },
    saveText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
