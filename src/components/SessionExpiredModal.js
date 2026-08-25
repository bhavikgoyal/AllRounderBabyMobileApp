import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';

const SessionExpiredModal = ({ visible, onLogout }) => {
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setLoading(true);
            const result = onLogout && onLogout();
            if (result && typeof result.then === 'function') {
                await result;
            }
        } catch (e) {
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal visible={!!visible} transparent animationType="fade" onRequestClose={() => { }}>
            <View style={styles.backdrop}>
                <View style={styles.container} accessibilityRole="alert">
                    <Image source={require('../../img/info.png')} style={styles.icon} />
                    <Text style={styles.title}>Alert</Text>
                    <Text style={styles.message}>Please log in again to continue accessing your account.</Text>
                    <View style={styles.divider} />
                    <TouchableOpacity
                        style={[styles.button, loading && styles.buttonDisabled]}
                        onPress={handleLogout}
                        accessibilityLabel="session-expired-logout"
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Logout</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
    container: { width: '86%', backgroundColor: '#fff', borderRadius: 12, padding: 20, alignItems: 'center' },
    icon: { width: 56, height: 56, tintColor: '#F59E0B', marginBottom: 12 },
    title: { fontSize: 18, fontWeight: '700', marginBottom: 8, color: '#111' },
    message: { fontSize: 14, textAlign: 'center', color: '#444', marginBottom: 16 },
    divider: { height: 1, backgroundColor: '#eee', alignSelf: 'stretch', marginBottom: 16 },
    button: { backgroundColor: '#1434A4', paddingVertical: 12, paddingHorizontal: 18, borderRadius: 8, alignSelf: 'stretch', alignItems: 'center' },
    buttonText: { color: '#fff', fontWeight: '700' },
    buttonDisabled: { opacity: 0.7 },
});

export default SessionExpiredModal;
