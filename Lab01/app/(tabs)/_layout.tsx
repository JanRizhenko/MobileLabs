import React, { useEffect } from "react";
import { Tabs, useRouter, useSegments } from "expo-router";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";

// @ts-ignore
import ztuLogo from "@/assets/images/ztuLogo.png";
// @ts-ignore
import homeIcon from "@/assets/images/home.png";
// @ts-ignore
import galleryIcon from "@/assets/images/gallery.png";
// @ts-ignore
import profileIcon from "@/assets/images/profile.png";

export default function TabLayout() {
    const router = useRouter();
    const segments = useSegments();
    const theme = useTheme();

    const activeTab = segments.length > 1 ? segments[1] : "index";

    const navigateToTab = (tabName: string) => {
        if (tabName === "index") {
            // @ts-ignore
            router.push("/");
        } else {
            // @ts-ignore
            router.push(`/(tabs)/${tabName}` as const);
        }
    };

    const dynamicStyles = {
        tabBarContainer: {
            backgroundColor: theme.dark ? "#000000" : "#000000",
        },
        footer: {
            backgroundColor: theme.dark ? "#000000" : "#000000",
        },
        tabIcon: {
            tintColor: theme.dark ? "#ffffff" : "#ffffff",
        },
        activeTabIcon: {
            tintColor: "#0066cc",
        },
        tabBarLabel: {
            color: theme.dark ? "#ffffff" : "#ffffff",
        },
        activeTabLabel: {
            color: "#0066cc",
        },
        footerText: {
            color: theme.dark ? "#ffffff" : "#ffffff",
        },
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.ztuImg} source={ztuLogo} resizeMode="contain" />
                <Text style={styles.title}>FirstMobileApp</Text>
            </View>

            <View style={[styles.tabBarContainer, dynamicStyles.tabBarContainer]}>
                <TouchableOpacity
                    style={styles.tabItem}
                    onPress={() => navigateToTab("index")}
                >
                    <Image
                        source={homeIcon}
                        style={[
                            styles.tabIcon,
                            dynamicStyles.tabIcon,
                            activeTab === "index" && dynamicStyles.activeTabIcon
                        ]}
                    />
                    <Text
                        style={[
                            styles.tabBarLabel,
                            dynamicStyles.tabBarLabel,
                            activeTab === "index" && dynamicStyles.activeTabLabel
                        ]}
                    >
                        Home
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.tabItem}
                    onPress={() => navigateToTab("gallery")}
                >
                    <Image
                        source={galleryIcon}
                        style={[
                            styles.tabIcon,
                            dynamicStyles.tabIcon,
                            activeTab === "gallery" && dynamicStyles.activeTabIcon
                        ]}
                    />
                    <Text
                        style={[
                            styles.tabBarLabel,
                            dynamicStyles.tabBarLabel,
                            activeTab === "gallery" && dynamicStyles.activeTabLabel
                        ]}
                    >
                        Gallery
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.tabItem}
                    onPress={() => navigateToTab("profile")}
                >
                    <Image
                        source={profileIcon}
                        style={[
                            styles.tabIcon,
                            dynamicStyles.tabIcon,
                            activeTab === "profile" && dynamicStyles.activeTabIcon
                        ]}
                    />
                    <Text
                        style={[
                            styles.tabBarLabel,
                            dynamicStyles.tabBarLabel,
                            activeTab === "profile" && dynamicStyles.activeTabLabel
                        ]}
                    >
                        Profile
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.tabsContainer}>
                <Tabs
                    screenOptions={{
                        headerShown: false,
                        tabBarStyle: { display: "none" },
                    }}
                >
                    <Tabs.Screen name="index" />
                    <Tabs.Screen name="gallery" />
                    <Tabs.Screen name="profile" />
                </Tabs>
            </View>

            <View style={[styles.footer, dynamicStyles.footer]}>
                <Text style={[styles.footerText, dynamicStyles.footerText]}>
                    Риженко Ян Віталійович, ІПЗ-23-1
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    header: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingTop: 40,
        paddingBottom: 10,
        backgroundColor: "white",
    },
    ztuImg: {
        maxWidth: "25%",
        height: 45,
    },
    title: {
        flex: 1,
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
    },
    tabBarContainer: {
        flexDirection: "row",
        height: 60,
        justifyContent: "space-around",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#dddddd",
    },
    tabItem: {
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        width: "33%",
    },
    tabIcon: {
        width: 28,
        height: 28,
    },
    tabBarLabel: {
        textAlign: "center",
        fontSize: 12,
        marginTop: 3,
        width: "100%",
    },
    tabsContainer: {
        flex: 1,
    },
    footer: {
        height: 40,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderTopWidth: 1,
        borderTopColor: "#dddddd",
    },
    footerText: {
        width: "100%",
        textAlign: "center",
        fontSize: 12,
    },
});