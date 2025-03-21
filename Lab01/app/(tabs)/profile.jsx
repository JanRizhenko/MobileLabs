import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const Profile = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Registration</Text>

            <View style={styles.formContainer}>
                <Text style={styles.label}>Електронна пошта</Text>
                <TextInput
                    style={styles.input}
                    placeholder=""
                />

                <Text style={styles.label}>Пароль</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    placeholder=""
                />

                <Text style={styles.label}>Пароль (ще раз)</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    placeholder=""
                />

                <Text style={styles.label}>Прізвище</Text>
                <TextInput
                    style={styles.input}
                    placeholder=""
                />

                <Text style={styles.label}>Ім'я</Text>
                <TextInput
                    style={styles.input}
                    placeholder=""
                />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Зареєструватися</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
    },
    formContainer: {
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Profile;