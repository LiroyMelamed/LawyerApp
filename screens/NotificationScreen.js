import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, Platform, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Image } from "react-native";
import { colors } from "../assets/colors";
import { notificationApi } from "../api/notificationApi";
import { Ionicons } from '@expo/vector-icons'; // For the filter icon (adjust if you use a different icon library)
import { icons } from '../assets/icons/icons'; // Assuming you have an icons file similar to ProfileScreen
import useAutoHttpRequest from '../hooks/useAutoHttpRequest'; // Import useAutoHttpRequest
import useHttpRequest from '../hooks/useHttpRequest'; // Import useHttpRequest
import PrimaryButton from "../components/styledComponent/buttons/PrimaryButton";
import { buttonSizes } from "../styles/buttons/buttonSizes";
import { Text12, TextBold24 } from "../components/specializedComponents/text/AllTextKindFile";

export default function NotificationScreen() {
    const [notifications, setNotifications] = useState([]);
    const [isMarkingId, setIsMarkingId] = useState('')
    const [error, setError] = useState(null);

    const onSuccessFetchNotifications = (data) => {
        console.log('dataaaaaaaaaaaaaaaa', data);

        const sortedNotifications = data.sort((a, b) => new Date(b.createdat) - new Date(a.createdat));
        setNotifications(sortedNotifications);
        setError(null);
    };

    const onFailureFetchNotifications = (err) => {
        console.error("Failed to fetch notifications:", err);
        setError("שגיאה בטעינת ההתראות. אנא נסה שוב.");
        setNotifications([]);
    };

    const { isPerforming: isFetching, performRequest: refetchNotifications } = useAutoHttpRequest(
        notificationApi.getNotifications,
        {
            onSuccess: onSuccessFetchNotifications,
            onFailure: onFailureFetchNotifications,
        }
    );

    const onSuccessMarkAsRead = (data) => {
        const updatedId = data?.notificationid;
        if (!updatedId) return;

        setNotifications(prevNotifications =>
            prevNotifications.map(notif =>
                notif.notificationid === updatedId ? { ...notif, isread: true } : notif
            )
        );
        setIsMarkingId('');
    };

    const onFailureMarkAsRead = (err) => {
        console.error("Failed to mark as read:", err);
    };

    const { isPerforming: isMarkingAsRead, performRequest: markNotificationAsReadRequest } = useHttpRequest(
        notificationApi.markNotificationAsRead,
        onSuccessMarkAsRead,
        onFailureMarkAsRead
    );

    const handleMarkAsRead = (id) => {
        setIsMarkingId(id)
        markNotificationAsReadRequest(id);
    };

    const onRefreshTrigger = () => {
        refetchNotifications();
    };

    const renderItem = ({ item }) => (
        <View style={[styles.notificationItem, item.isread && styles.readNotificationItem]}>
            <View style={styles.notificationContent}>
                {!item.isread && <View style={styles.unreadIndicator} />}
                <View style={styles.textContainer}>
                    <Text style={styles.notificationTitle}>{item.title || "התראה חדשה"}</Text>
                    <Text style={styles.notificationMessage}>{item.message}</Text>
                    <Text style={styles.notificationTimestamp}>
                        {new Date(item.createdat).toLocaleDateString('he-IL', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </Text>
                </View>
            </View>
            {!item.isread && (
                <PrimaryButton
                    style={styles.markAsReadButton}
                    onPress={() => handleMarkAsRead(item.notificationid)}
                    size={buttonSizes.SMALL}
                >
                    {isMarkingAsRead && isMarkingId === item.notificationid ? (
                        <ActivityIndicator size="small" color={colors.white} />
                    ) : (
                        <Text12 style={{ color: colors.white }}>סמן כנקרא</Text12>
                    )}
                </PrimaryButton>
            )}
        </View>
    );

    if (isFetching && notifications.length === 0) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} style={styles.loadingIndicator} />
                <Text style={styles.loadingText}>טוען התראות...</Text>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={refetchNotifications}>
                    <Text style={styles.retryButtonText}>נסה שוב</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TextBold24 style={styles.headerTitle}>התראות</TextBold24>
            </View>
            <View style={styles.contentContainer}>
                {notifications.length === 0 && !isFetching ? (
                    <View style={styles.noNotificationsContainer}>
                        <Text style={styles.noNotificationsText}>אין לך התראות כרגע.</Text>
                    </View>
                ) : (
                    <FlatList
                        data={notifications}
                        keyExtractor={(item) => item.notificationid.toString()}
                        extraData={notifications}
                        renderItem={renderItem}
                        contentContainerStyle={styles.flatListContent}
                        refreshControl={
                            <RefreshControl refreshing={isFetching} onRefresh={onRefreshTrigger} colors={[colors.primary]} />
                        }
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7', // Background color from ProfileScreen
    },
    header: {
        flexDirection: 'row',
        paddingVertical: 40,
        backgroundColor: colors.primary,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        position: 'relative',
        marginBottom: 20,
    },
    headerTitle: {
        color: colors.white, // White color for title
        flex: 1,
        textAlign: 'center',
    },
    filterIconContainer: {
        padding: 5,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20, // Apply horizontal padding to content
    },
    flatListContent: {
        paddingBottom: 80, // Ensure space for bottom navigation if any
    },
    notificationItem: {
        backgroundColor: "#fff", // White background for items
        padding: 15,
        borderRadius: 10,
        marginBottom: 12,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.15, // Slightly less opaque shadow
        shadowRadius: 1.8,
        elevation: 3, // Increased elevation for more pop
    },
    readNotificationItem: {
        backgroundColor: "#e0e0e0",
        opacity: 0.9, // Less opacity reduction for read items
    },
    notificationContent: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-start',
        marginBottom: 10,
        width: '100%',
    },
    unreadIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.primaryHighlighted,
        marginLeft: 8,
        marginTop: 8,
    },
    textContainer: {
        flex: 1,
    },
    notificationTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.primary,
        marginBottom: 5,
        justifyContent: 'flex-start',
        textAlign: 'right'
    },
    notificationMessage: {
        fontSize: 16,
        color: colors.text,
        marginBottom: 5,
        textAlign: 'right'
    },
    notificationTimestamp: {
        fontSize: 12,
        color: colors.gray,
        alignSelf: 'flex-end',
        marginTop: 5,
    },
    markAsReadButton: {
        alignSelf: 'flex-start',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
    },
    loadingIndicator: {
        marginBottom: 10,
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 16,
        color: colors.text,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        padding: 20,
    },
    errorText: {
        textAlign: 'center',
        fontSize: 16,
        color: colors.danger,
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 10,
        alignSelf: 'center',
    },
    retryButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    noNotificationsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50, // Add some vertical padding
    },
    noNotificationsText: {
        fontSize: 18,
        color: colors.gray,
    },
});
