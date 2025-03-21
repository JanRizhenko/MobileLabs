import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

import placeholder from '@/assets/images/placeholder.png';

const newsData = [
    { id: '1', newsTitle: 'Заголовок новини', date: 'Дата новини', description: 'Короткий текст новини' },
    { id: '2', newsTitle: 'Заголовок новини', date: 'Дата новини', description: 'Короткий текст новини' },
    { id: '3', newsTitle: 'Заголовок новини', date: 'Дата новини', description: 'Короткий текст новини' },
    { id: '4', newsTitle: 'Заголовок новини', date: 'Дата новини', description: 'Короткий текст новини' },
    { id: '5', newsTitle: 'Заголовок новини', date: 'Дата новини', description: 'Короткий текст новини' },
    { id: '6', newsTitle: 'Заголовок новини', date: 'Дата новини', description: 'Короткий текст новини' },
    { id: '7', newsTitle: 'Заголовок новини', date: 'Дата новини', description: 'Короткий текст новини' },
    { id: '8', newsTitle: 'Заголовок новини', date: 'Дата новини', description: 'Короткий текст новини' },
];

const Index = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>News</Text>

            <ScrollView style={styles.scrollView}>
                {newsData.map((item) => (
                    <View key={item.id} style={styles.newsItem}>
                        <Image source={placeholder} style={styles.newsImage} />
                        <View style={styles.newsContent}>
                            <Text style={styles.newsTitle}>{item.newsTitle}</Text>
                            <Text style={styles.newsDate}>{item.date}</Text>
                            <Text style={styles.newsDescription}>{item.description}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
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
        marginVertical: 10,
    },
    scrollView: {
        flex: 1,
        marginLeft: 45,
    },
    newsItem: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    newsImage: {
        width: 60,
        height: 60,
        marginRight: 10,
        backgroundColor: '#f0f0f0',
    },
    newsContent: {
        flex: 1,
    },
    newsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    newsDate: {
        fontSize: 12,
        color: '#888',
        marginVertical: 2,
    },
    newsDescription: {
        fontSize: 14,
        color: '#444',
    },
});

export default Index;