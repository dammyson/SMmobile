import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const RadioButton = ({ checked, onPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.radioCircle}
                onPress={() => { onPress() }}>
                {checked && <View style={styles.selectedRb} />}
            </TouchableOpacity>
        </View>
    )
}

export default RadioButton


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    radioText: {
        marginRight: 35,
        fontSize: 20,
        color: '#000',
        fontWeight: '700'
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#3740ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRb: {
        width: 12,
        height: 12,
        borderRadius: 50,
        backgroundColor: '#3740ff',
    },
    result: {
        marginTop: 20,
        color: 'white',
        fontWeight: '600',
        backgroundColor: '#F3FBFE',
    },
});