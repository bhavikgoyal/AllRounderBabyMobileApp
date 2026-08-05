import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NoInternetModal = ({ visible }) => {
    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={() => { }}>
            <View style={styles.backdrop}>
                <View style={styles.container}>
                    <Text style={styles.title}>No Internet Connection</Text>
                    <Text style={styles.message}>Please check your internet connection and try again.</Text>
                    <TouchableOpacity style={styles.button} onPress={() => { }} accessibilityLabel="no-internet-ok">
                        <Text style={styles.buttonText}>Try Again</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    container: { backgroundColor: '#fff', padding: 20, borderRadius: 8, width: '80%', alignItems: 'center' },
    title: { fontSize: 18, fontWeight: '700', marginBottom: 10, color: '#222' },
    message: { fontSize: 14, textAlign: 'center', marginBottom: 20, color: '#444' },
    button: { backgroundColor: '#1434A4', paddingHorizontal: 80, paddingVertical: 10, borderRadius: 6 },
    buttonText: { color: '#fff', fontWeight: '600' },
});

export default NoInternetModal;
