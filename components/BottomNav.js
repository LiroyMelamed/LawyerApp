import { ActionSheetIOS, Image, TouchableOpacity, Linking, StyleSheet } from "react-native";
import { icons } from "../assets/icons/icons";
import { View, Text } from "react-native";
import { colors } from "../assets/colors";
import { ScreenNames } from '../navigation/screenNames';

export const BottomNav = ({ activeTab, canGoBack, navigation }) => {
    const handleTabPress = (tab) => {
        if (tab === "צור קשר") {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ["ביטול", "התקשר", "שלח הודעה", "פתח וואטסאפ"],
                    cancelButtonIndex: 0,
                },
                (buttonIndex) => {
                    if (buttonIndex === 1) {
                        Linking.openURL("tel:036565004");
                    } else if (buttonIndex === 2) {
                        Linking.openURL("sms:0559199044");
                    } else if (buttonIndex === 3) {
                        Linking.openURL("https://wa.me/972559199044");
                    }
                }
            );
            return;
        }
        navigation(tab);
    };

    const NavItem = ({ name, icon, isCenter }) => {
        const isCurrentActiveTab = activeTab === name || (isCenter && activeTab === ScreenNames.Home);
        const iconStyle = isCenter ? styles.centerIcon : styles.icon;
        const containerStyle = isCenter ? styles.centerButton : styles.navItemContainer;
        const shouldBeActiveVisually = isCurrentActiveTab && !["צור קשר", "חזור"].includes(name);

        return (
            <TouchableOpacity onPress={() => handleTabPress(name)} style={containerStyle}>
                <View
                    style={[
                        shouldBeActiveVisually && !isCenter && styles.activeIconCircle,
                        isCenter && styles.centerIconWrapper,
                    ]}
                >
                    <Image
                        source={icon}
                        style={[
                            iconStyle,
                            shouldBeActiveVisually && !isCenter && styles.activeIcon,
                            isCenter && isCurrentActiveTab && styles.activeIconCenter,
                            name === "חזור" && !canGoBack && activeTab == "מסך הבית" && { opacity: 0.2 }
                        ]}
                    />
                </View>
                {!isCenter && (
                    <Text style={[styles.label, shouldBeActiveVisually && styles.activeLabel]}>
                        {name}
                    </Text>
                )}
                {isCenter && (
                    <Text style={[styles.label, isCurrentActiveTab && styles.activeLabel, { marginTop: 5 }]}>
                    </Text>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.footer}>
            <NavItem name="צור קשר" icon={icons.ContactIcon} />
            <NavItem name={ScreenNames.Notifications} icon={icons.NotificationIcon} />
            <NavItem name="center" icon={icons.Logo} isCenter />
            <NavItem name={ScreenNames.Profile} icon={icons.ProfileIcon} />
            <NavItem name="חזור" icon={icons.BackIcon} />
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 15,
        paddingBottom: 20,
        height: 80,
        paddingTop: 10,
    },
    navItemContainer: {
        alignItems: "center",
        flex: 1,
        paddingVertical: 5,
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: "contain",
    },
    label: {
        marginTop: 4,
        fontSize: 12,
        color: colors.text,
    },
    activeLabel: {
        color: colors.primaryHighlighted,
        fontWeight: "600",
    },
    activeIcon: {
        tintColor: colors.primaryHighlighted,
    },
    activeIconCenter: {
        tintColor: colors.white,
    },
    activeIconCircle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#e5ecff",
        borderRadius: 300,
    },
    centerButton: {
        marginTop: -45,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
    },
    centerIconWrapper: {
        backgroundColor: colors.primary,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 10,
    },
    centerIcon: {
        width: 28,
        height: 28,
        tintColor: colors.white,
        resizeMode: "contain",
    },
});
