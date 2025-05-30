import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Dialog from "react-native-dialog";

export default function ConfirmationButton({ message, onYes, onCancel, button }) {
    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

    const handleCancel = () => {
        if (onCancel) onCancel();
        setIsConfirmationVisible(false);
    };

    const handleYes = () => {
        if (onYes) onYes();
        setIsConfirmationVisible(false);
    };

    return (
        <View>
            <TouchableOpacity
                onPress={() => setIsConfirmationVisible(true)}
                style={confirmationButtonStyles.confirmationButton}
            >
                {button}
            </TouchableOpacity>

            <Dialog.Container visible={isConfirmationVisible}>
                <Dialog.Title>Confirmation</Dialog.Title>
                <Dialog.Description>{message}</Dialog.Description>
                <Dialog.Button label="Cancel" onPress={handleCancel} />
                <Dialog.Button label="Yes" onPress={handleYes} />
            </Dialog.Container>
        </View>
    );
}

const confirmationButtonStyles = StyleSheet.create({
    confirmationButton: {
        paddingHorizontal: 5,
    },
});