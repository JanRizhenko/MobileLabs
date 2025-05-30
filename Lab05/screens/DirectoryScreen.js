import { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, Alert } from "react-native";
import { View, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import ConfirmationButton from "../components/ConfirmationButton.js";
import PromptButton from "../components/PromptButton.js";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import * as FileSystem from "expo-file-system";
import FileItem from "../components/FileItem";
import { get_file_name, root_path } from "../App.js";

export default function DirectoryScreen({ route }) {
    const { path } = route.params || {};
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    const reload_files = async () => {
        try {
            setIsLoading(true);
            const fileList = await FileSystem.readDirectoryAsync(path);
            setFiles(fileList.sort());
        } catch (error) {
            Alert.alert("Error", "Failed to read directory contents");
            setFiles([]);
        } finally {
            setIsLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            reload_files();
        }, [path])
    );

    const directory_name = get_file_name(path);

    const handleCreateDirectory = async (directory_name) => {
        if (!directory_name.trim()) {
            Alert.alert("Error", "Directory name cannot be empty");
            return;
        }

        if (/[<>:"/\\|?*]/.test(directory_name)) {
            Alert.alert("Error", "Directory name contains invalid characters");
            return;
        }

        try {
            const new_directory_path = path + directory_name;
            await FileSystem.makeDirectoryAsync(new_directory_path);
            await reload_files();
        } catch (error) {
            Alert.alert("Error", "Failed to create directory");
        }
    };

    const handleCreateFile = async (file_name) => {
        if (!file_name.trim()) {
            Alert.alert("Error", "File name cannot be empty");
            return;
        }

        if (/[<>:"/\\|?*]/.test(file_name)) {
            Alert.alert("Error", "File name contains invalid characters");
            return;
        }

        try {
            const new_file_path = path + file_name;
            await FileSystem.writeAsStringAsync(new_file_path, "");
            await reload_files();
        } catch (error) {
            Alert.alert("Error", "Failed to create file");
        }
    };

    const handleDeleteDirectory = async () => {
        try {
            await FileSystem.deleteAsync(path);
            navigation.goBack();
        } catch (error) {
            Alert.alert("Error", "Failed to delete directory");
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={directoryStyles.directoryPanel}>
                <Text style={directoryStyles.directoryNameText}>{directory_name}</Text>

                <View style={directoryStyles.directoryPanelButtons}>
                    <TouchableOpacity onPress={reload_files} disabled={isLoading}>
                        <MaterialCommunityIcons
                            size={35}
                            name="reload"
                            color={isLoading ? "gray" : "black"}
                        />
                    </TouchableOpacity>

                    {path !== root_path && (
                        <ConfirmationButton
                            message={`Are you sure you want to delete the directory "${directory_name}"?`}
                            button={<Feather size={35} name="folder-minus" />}
                            onYes={handleDeleteDirectory}
                        />
                    )}

                    <PromptButton
                        initialValue=""
                        message="Enter the new directory's name"
                        onDone={handleCreateDirectory}
                        button={<Feather size={35} name="folder-plus" />}
                    />

                    <PromptButton
                        initialValue=""
                        message="Enter the new file's name"
                        onDone={handleCreateFile}
                        button={<Feather size={30} name="file-plus" />}
                    />
                </View>
            </View>

            <FlatList
                data={files}
                renderItem={({ item }) => (
                    <FileItem path={path} file_name={item} onUpdate={reload_files} />
                )}
                keyExtractor={(item) => item}
                refreshing={isLoading}
                onRefresh={reload_files}
                contentContainerStyle={directoryStyles.listContainer}
            />
        </SafeAreaView>
    );
}

const directoryStyles = StyleSheet.create({
    directoryPanel: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "lightgray",
    },

    directoryPanelButtons: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        flex: 1,
    },

    directoryNameText: {
        fontSize: 20,
        fontWeight: "bold",
    },
});