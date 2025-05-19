import React, { useEffect } from "react";
import { ABeeZee_400Regular, useFonts } from "@expo-google-fonts/abeezee";
import * as NavigationBar from "expo-navigation-bar";

import { Screens } from "./screens/Screens.js";
import { ThemeProvider } from "./ThemeContext.js";

export default function App() {
    const [fontsLoaded] = useFonts({
        ABeeZee_400Regular,
    });

    useEffect(() => {
        NavigationBar.setVisibilityAsync("hidden");
        NavigationBar.setBehaviorAsync("immersive-sticky");
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ThemeProvider>
            <Screens />
        </ThemeProvider>
    );
}
