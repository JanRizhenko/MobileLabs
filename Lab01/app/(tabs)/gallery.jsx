import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Text, Dimensions } from 'react-native';

const Gallery = () => {
    const [numColumns, setNumColumns] = useState(2);
    const placeholders = Array(10).fill(null).map((_, index) => index.toString());

    const updateLayout = () => {
        const { width } = Dimensions.get('window');
        setNumColumns(width > 768 ? 3 : 2);
    };

    useEffect(() => {
        updateLayout();
        const subscription = Dimensions.addEventListener('change', updateLayout);

        return () => subscription.remove();
    }, []);

    const cardWidth = `${(80 / numColumns) - 4}%`;

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Gallery</Text>

            <ScrollView contentContainerStyle={styles.galleryGrid}>
                {placeholders.map((id) => (
                    <View
                        key={id}
                        style={[
                            styles.galleryCard,
                            { width: cardWidth }
                        ]}
                    >
                        <Image
                            source={require('../../assets/images/placeholder.png')}
                            style={styles.placeholderImage}
                            resizeMode="cover"
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default Gallery;

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
    galleryGrid: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        padding: 5,
    },
    galleryCard: {
        aspectRatio: 1,
        margin: '2%',
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        overflow: 'hidden',
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
    },
});