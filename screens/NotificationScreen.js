import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, Platform, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Image } from "react-native";
import { colors } from "../assets/colors";
import { notificationApi } from "../api/notificationApi";
import { Ionicons } from '@expo/vector-icons'; // For the filter icon (adjust if you use a different icon library)
import { icons } from '../assets/icons/icons'; // Assuming you have an icons file similar to ProfileScreen
import useAutoHttpRequest from '../hooks/useAutoHttpRequest'; // Import useAutoHttpRequest
import useHttpRequest from '../hooks/useHttpRequest'; // Import useHttpRequest

export default function NotificationScreen() {
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState(null);

    // Callback for successful notification fetch
    const onSuccessFetchNotifications = useCallback((data) => {
        // Sort notifications by CreatedAt (newest first)
        const sortedNotifications = data.sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt));
        setNotifications(sortedNotifications);
        setError(null); // Clear any previous errors on success
    }, []);

    // Callback for failed notification fetch
    const onFailureFetchNotifications = useCallback((err) => {
        console.error("Failed to fetch notifications:", err);
        setError("שגיאה בטעינת ההתראות. אנא נסה שוב.");
        setNotifications([]); // Clear notifications on error
    }, []);

    // useAutoHttpRequest for fetching notifications on component mount and refresh
    const { isPerforming: isFetching, performRequest: refetchNotifications, isRefreshing } = useAutoHttpRequest(
        notificationApi.getNotifications,
        {
            onSuccess: onSuccessFetchNotifications,
            onFailure: onFailureFetchNotifications,
            initialData: [], // Provide initialData to avoid undefined issues
            shouldPerformInitialRequest: true, // Ensure it fetches on mount
            isRefreshing: true // Use this to control the RefreshControl state
        }
    );

    // Callback for successful mark-as-read operation
    const onSuccessMarkAsRead = useCallback((response, notificationId) => {
        // Optimistically update UI
        setNotifications(prevNotifications =>
            prevNotifications.map(notif =>
                notif.NotificationId === notificationId ? { ...notif, IsRead: true } : notif
            )
        );
    }, []);

    // Callback for failed mark-as-read operation
    const onFailureMarkAsRead = useCallback((err) => {
        console.error("Failed to mark as read:", err);
        // Optionally show an error to the user
    }, []);

    // useHttpRequest for marking a notification as read
    const { isPerforming: isMarkingAsRead, performRequest: markNotificationAsReadRequest } = useHttpRequest(
        notificationApi.markNotificationAsRead,
        onSuccessMarkAsRead,
        onFailureMarkAsRead
    );

    // Function to trigger marking a notification as read
    const handleMarkAsRead = (id) => {
        markNotificationAsReadRequest(id, id); // Pass id twice: once for API, once for onSuccess callback
    };

    // Handle pull-to-refresh
    const onRefreshTrigger = useCallback(() => {
        refetchNotifications(); // Trigger the auto-request to refetch
    }, [refetchNotifications]);

    const renderItem = ({ item }) => (
        <View style={[styles.notificationItem, item.IsRead && styles.readNotificationItem]}>
            <View style={styles.notificationContent}>
                {!item.IsRead && <View style={styles.unreadIndicator} />}
                <View style={styles.textContainer}>
                    <Text style={styles.notificationTitle}>{item.Title || "התראה חדשה"}</Text>
                    <Text style={styles.notificationMessage}>{item.Message}</Text>
                    <Text style={styles.notificationTimestamp}>
                        {new Date(item.CreatedAt).toLocaleDateString('he-IL', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </Text>
                </View>
            </View>
            {!item.IsRead && (
                <TouchableOpacity
                    style={styles.markAsReadButton}
                    onPress={() => handleMarkAsRead(item.NotificationId)}
                    disabled={isMarkingAsRead} // Disable button while request is pending
                >
                    {isMarkingAsRead ? (
                        <ActivityIndicator size="small" color={colors.white} />
                    ) : (
                        <Text style={styles.markAsReadButtonText}>סמן כנקרא</Text>
                    )}
                </TouchableOpacity>
            )}
        </View>
    );

    if (isFetching && notifications.length === 0) { // Show full loader only on initial fetch if no data
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
                <Text style={styles.headerTitle}>התראות</Text>
                {/* Optional filter icon - functionality not implemented here */}
                <TouchableOpacity style={styles.filterIconContainer}>
                    <Ionicons name="options-outline" size={28} color={colors.white} />
                </TouchableOpacity>
            </View>
            <View style={styles.contentContainer}>
                {notifications.length === 0 && !isFetching ? ( // Only show no notifications if not fetching and list is empty
                    <View style={styles.noNotificationsContainer}>
                        <Text style={styles.noNotificationsText}>אין לך התראות כרגע.</Text>
                    </View>
                ) : (
                    <FlatList
                        data={notifications}
                        keyExtractor={(item) => item.NotificationId.toString()}
                        renderItem={renderItem}
                        contentContainerStyle={styles.flatListContent}
                        refreshControl={
                            <RefreshControl refreshing={isRefreshing} onRefresh={onRefreshTrigger} colors={[colors.primary]} />
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20,
        backgroundColor: colors.primary, // Primary color from ProfileScreen
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        position: 'relative',
        marginBottom: 20, // Space between header and content
    },
    headerTitle: {
        fontSize: 26, // Larger font size for title
        fontWeight: "bold",
        color: colors.white, // White color for title
        flex: 1, // Allow title to take available space
        textAlign: 'center', // Center the title
        marginRight: -38, // Adjust to center if filter icon pushes it
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
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
        width: '100%',
    },
    unreadIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.accent, // Use accent color for unread indicator
        marginRight: 10,
        marginTop: 5,
    },
    textContainer: {
        flex: 1,
    },
    notificationTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.primary,
        marginBottom: 5,
    },
    notificationMessage: {
        fontSize: 16,
        color: colors.text,
        marginBottom: 5,
    },
    notificationTimestamp: {
        fontSize: 12,
        color: colors.gray,
        alignSelf: 'flex-end',
        marginTop: 5,
    },
    markAsReadButton: {
        backgroundColor: colors.secondary, // Use a secondary color for the button
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        alignSelf: 'flex-end',
        marginTop: 5,
    },
    markAsReadButtonText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: "bold",
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
