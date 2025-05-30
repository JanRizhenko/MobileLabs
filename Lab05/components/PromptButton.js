import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Dialog from "react-native-dialog";

export default function PromptButton({ message, initialValue = "", onDone, onCancel, button }) {
    const [isPromptVisible, setIsPromptVisible] = useState(false);
    const [inputValue, setInputValue] = useState(initialValue);

    const handleCancel = () => {
        if (onCancel) onCancel();
        setInputValue(initialValue);
        setIsPromptVisible(false);
    };

    const handleDone = () => {
        if (onDone) onDone(inputValue);
        setInputValue(initialValue);
        setIsPromptVisible(false);
    };

    const handleShow = () => {
        setInputValue(initialValue);
        setIsPromptVisible(true);
    };

    return (
        <View>
            <TouchableOpacity
                onPress={handleShow}
                style={promptButtonStyles.promptButton}
            >
                {button}
            </TouchableOpacity>

            <Dialog.Container visible={isPromptVisible}>
                <Dialog.Title>{message}</Dialog.Title>
                <Dialog.Input
                    onChangeText={setInputValue}
                    selectTextOnFocus={true}
                    autoFocus={true}
                    style={{ fontSize: 18 }}
                    value={inputValue}
                    placeholder="Enter name..."
                />
                <Dialog.Button label="Cancel" onPress={handleCancel} />
                <Dialog.Button label="Done" onPress={handleDone} />
            </Dialog.Container>
        </View>
    );
}

const promptButtonStyles = StyleSheet.create({
    promptButton: {
        paddingHorizontal: 5,
    },
});