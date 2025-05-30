import { useEffect, useState, useRef } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from "expo-file-system";
import ConfirmationButton from "../components/ConfirmationButton";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { get_file_name, format_bytes } from "../App";

export default function FileScreen({ route }) {
    const { path } = route.params || {};
    const navigation = useNavigation();

    const [fileContents, setFileContents] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const originalContents = useRef("");

    useEffect(() => {
        const loadFile = async () => {
            try {
                const contents = await FileSystem.readAsStringAsync(path);
                setFileContents(contents);
                originalContents.current = contents;
            } catch (error) {
                Alert.alert("Error", "Failed to load file contents");
            } finally {
                setIsLoading(false);
            }
        };

        loadFile();
    }, [path]);

    useEffect(() => {
        setHasUnsavedChanges(fileContents !== originalContents.current);
    }, [fileContents]);

    const save = async () => {
        try {
            setIsSaving(true);
            await FileSystem.writeAsStringAsync(path, fileContents);
            originalContents.current = fileContents;
            setHasUnsavedChanges(false);
            Alert.alert("Success", "File saved successfully");
        } catch (error) {
            Alert.alert("Error", "Failed to save file");
        } finally {
            setIsSaving(false);
        }
    };

    const info = async () => {
        try {
            const information = await FileSystem.getInfoAsync(path);
            Alert.alert(
                "File Information",
                `Name: ${file_name}\n` +
                `Size: ${format_bytes(information.size)}\n` +
                `Last modified: ${new Date(information.modificationTime).toLocaleString()}`
            );
        } catch (error) {
            Alert.alert("Error", "Failed to get file information");
        }
    };

    const handleDeleteFile = async () => {
        try {
            await FileSystem.deleteAsync(path);
            navigation.goBack();
        } catch (error) {
            Alert.alert("Error", "Failed to delete file");
        }
    };

    const file_name = get_file_name(path);

    if (isLoading) {
        return (
            <SafeAreaView style={[fileScreenStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={fileScreenStyles.container}>
            <View style={fileScreenStyles.filePanel}>
                <Text style={fileScreenStyles.fileNameText}>
                    {file_name} {hasUnsavedChanges && "*"}
                </Text>
                <View style={fileScreenStyles.filePanelButtons}>
                    <TouchableOpacity style={fileScreenStyles.button} onPress={info}>
                        <Feather size={35} name="info" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={fileScreenStyles.button}
                        onPress={save}
                        disabled={isSaving || !hasUnsavedChanges}
                    >
                        <Feather
                            size={35}
                            name="save"
                            color={(!hasUnsavedChanges || isSaving) ? "gray" : "black"}
                        />
                    </TouchableOpacity>

                    <ConfirmationButton
                        message={`Are you sure you want to delete the file "${file_name}"?`}
                        button={<Feather size={35} name="file-minus" />}
                        onYes={handleDeleteFile}
                    />
                </View>
            </View>

            <TextInput
                style={fileScreenStyles.textInput}
                onChangeText={setFileContents}
                value={fileContents}
                multiline={true}
                autoFocus={true}
                placeholder="Start typing..."
                textAlignVertical="top"
            />
        </SafeAreaView>
    );
}

const fileScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
    },

    textInput: {
        fontSize: 16,
        flex: 1,
        padding: 10,
        textAlignVertical: 'top',
    },

    filePanel: {
        flexDirection: "row",
        backgroundColor: "lightgray",
        alignItems: "center",
        paddingVertical: 10,
    },

    fileNameText: {
        fontSize: 20,
        paddingHorizontal: 10,
        fontWeight: "bold",
    },

    filePanelButtons: {
        marginLeft: "auto",
        flexDirection: "row",
    },

    button: {
        paddingHorizontal: 5,
    },
});