import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    useColorScheme,
    Image,
    TextInput,
    Platform,
    Alert,
    ToastAndroid,
    useWindowDimensions,
    Keyboard,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import sendOtpEmail from './utils/emailSend';
import sendWhatsAppOtp from './utils/whatsappSend';
import verifyOtp from './utils/Verify';
import loginByOtp from './utils/loginByOtp';
import getDeviceKey from './utils/deviceKey';
import { CommonActions } from '@react-navigation/native';
import { Linking } from 'react-native';

const ADMIN_CONTACT_URL = 'https://allrounderbaby.com/UserQuestion';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginOTP = ({ navigation }) => {
    const isDarkMode = useColorScheme() === 'dark';
    const [identifier, setIdentifier] = useState('');
    const [loading, setLoading] = useState(false);
    const [otpVisible, setOtpVisible] = useState(false);
    const [otp, setOtp] = useState('');
    const [adminMessage, setAdminMessage] = useState(null);
    const [verifyLoading, setVerifyLoading] = useState(false);
    const otpLength = 6;
    const otpInputsRef = useRef([]);

    useEffect(() => {
        if (otpVisible) {
            setOtp('');
            otpInputsRef.current = otpInputsRef.current.slice(0, otpLength);
        }
    }, [otpVisible]);

    const handleOtpChange = (text, idx) => {
        const digits = text.replace(/\D/g, '').split('');
        if (digits.length > 1) {
            const chars = Array.from({ length: otpLength }, (_, i) => (otp[i] ? otp[i] : ''));
            for (let i = 0; i < digits.length && idx + i < otpLength; i++) chars[idx + i] = digits[i];
            setOtp(chars.join('').slice(0, otpLength));
            const nextIndex = Math.min(otpLength - 1, idx + digits.length);
            const next = otpInputsRef.current[nextIndex];
            if (next) next.focus();
            return;
        }

        const char = digits[0] || '';
        const chars = Array.from({ length: otpLength }, (_, i) => (otp[i] ? otp[i] : ''));
        chars[idx] = char;
        setOtp(chars.join(''));
        if (char && idx < otpLength - 1) {
            const next = otpInputsRef.current[idx + 1];
            if (next) next.focus();
        }
    };

    const handleOtpKeyPress = ({ nativeEvent }, idx) => {
        if (nativeEvent.key === 'Backspace') {
            const chars = Array.from({ length: otpLength }, (_, i) => (otp[i] ? otp[i] : ''));
            if (!chars[idx] && idx > 0) {
                const prev = otpInputsRef.current[idx - 1];
                if (prev) prev.focus();
            } else {
                chars[idx] = '';
                setOtp(chars.join(''));
            }
        }
    };
    const { width } = useWindowDimensions();
    const isTabletLocal = width >= 600;

    const showToast = (msg) => {
        if (Platform.OS === 'android' && ToastAndroid && typeof ToastAndroid.show === 'function') {
            ToastAndroid.show(msg, ToastAndroid.SHORT);
        } else {
            Alert.alert('', msg);
        }
    };

    const isValidEmail = (str) => {
        if (!str) return false;
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str.trim());
    };

    const isValidWhatsAppNumber = (str) => {
        if (!str) return false;
        const s = str.replace(/[\s\-()]/g, '');
        return /^\+?\d{8,15}$/.test(s);
    };

    const isValidIdentifier = (str) => {
        if (!str) return false;
        const t = str.trim();
        return isValidEmail(t) || isValidWhatsAppNumber(t);
    };

    const handleSendOTP = async () => {
        const id = identifier?.trim();
        if (!id) {
            showToast('Please enter registered email/WhatsApp number.');
            return;
        }
        if (!isValidIdentifier(id)) {
            showToast('Please enter a valid email or WhatsApp number.');
            return;
        }
        Keyboard.dismiss();
        setLoading(true);
        try {
            if (isValidEmail(id)) {
                const resp = await sendOtpEmail(id);
                console.log('sendOtpEmail response', resp);
                const ok = resp && (resp.ok || resp.status === 200 || (resp.result && (resp.result.IsSuccess || resp.result.isSuccess || resp.result.code === 200)));
                if (ok) {
                    setOtpVisible(true);
                    showToast((resp && resp.result && resp.result.message) || 'OTP sent to your email.');
                } else {
                    console.log('sendOtpEmail failed', resp);
                    const msg = (resp && resp.result && resp.result.message) || resp?.error || 'Failed to send OTP to email.';
                    if (resp && (resp.status === 400 || (resp.result && (resp.result.code === 400 || resp.result.Code === 400)))) {
                        setAdminMessage(msg);
                    }
                    showToast(msg);
                }
            } else if (isValidWhatsAppNumber(id)) {
                const normalized = id.replace(/[\s\-()]/g, '');
                const resp = await sendWhatsAppOtp(normalized);
                console.log('sendWhatsAppOtp response', resp);
                const ok = resp && (resp.ok || resp.status === 200 || (resp.data && (resp.data.IsSuccess || resp.data.isSuccess || resp.data.code === 200)));
                if (ok) {
                    setOtpVisible(true);
                    showToast((resp && resp.data && resp.data.message) || 'OTP sent to your WhatsApp.');
                } else {
                    console.log('sendWhatsAppOtp failed', resp);
                    const msg = (resp && resp.data && resp.data.message) || resp?.error || 'Failed to send OTP to WhatsApp.';
                    if (resp && (resp.status === 400 || (resp.data && (resp.data.code === 400 || resp.data.Code === 400)))) {
                        setAdminMessage(msg);
                    }
                    showToast(msg);
                }
            }
        } catch (e) {
            showToast('Failed to send OTP.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        const digitsOnly = (otp || '').replace(/\D/g, '');
        if (digitsOnly.length !== otpLength) {
            showToast(`Please enter the ${otpLength}-digit OTP.`);
            return;
        }
        const id = identifier?.trim();
        if (!id) { showToast('Missing identifier.'); return; }
        Keyboard.dismiss();
        setVerifyLoading(true);
        try {
            const resp = await verifyOtp(null, id, digitsOnly);
            const ok = resp && (resp.ok || resp.status === 200 || (resp.data && (resp.data.IsSuccess || resp.data.isSuccess || resp.data.code === 200)));
            if (ok) {
                showToast((resp && resp.data && resp.data.message) || 'OTP verified.');
                try {
                    // proceed to login via LoginByOtp API
                    const devicekey = await getDeviceKey();
                    console.log('Calling loginByOtp with', id, devicekey);
                    const loginResp = await loginByOtp(id, devicekey);
                    console.log('loginByOtp response', loginResp);
                    const payload = loginResp && (loginResp.data || loginResp.data);
                    if (loginResp && loginResp.ok && payload && (payload.code === 200 || payload.code === '200') && (payload.Data || payload.data)) {
                        const user = payload.Data || payload.data;
                        const token = user.Token || user.token || (user.TokenString || user.tokenString) || null;
                        const userId = (user.UserID || user.userID || user.userId || user.userID) || (user.userId ? String(user.userId) : null);
                        const firstName = user.FirstName || user.firstName || '';
                        const lastName = user.LastName || user.lastName || '';
                        const emailAddress = user.EmailAddress || user.emailAddress || '';
                        const phoneNumber = user.PhoneNumber || user.phoneNumber || '';

                        const sessionId = Math.random().toString(36).substring(2, 15);
                        const items = [];
                        if (token) items.push(['token', token]);
                        if (userId) items.push(['userId', String(userId)]);
                        if (devicekey) items.push(['deviceKey', devicekey]);
                        items.push(['sessionId', sessionId]);
                        if (firstName && lastName) items.push(['Name', `${firstName} ${lastName}`]);
                        if (emailAddress) items.push(['userEmail', emailAddress]);
                        if (phoneNumber) items.push(['phoneNumber', phoneNumber]);
                        if (items.length > 0) await AsyncStorage.multiSet(items);
                        navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Home' }] }));
                    } else {
                        const msg = (loginResp && loginResp.data && (loginResp.data.message || loginResp.data.Message)) || loginResp?.error || 'Login by OTP failed.';
                        console.log('loginByOtp failure', loginResp);
                        if (loginResp && (loginResp.status === 400 || (loginResp.data && (loginResp.data.code === 400 || loginResp.data.Code === 400)))) {
                            setAdminMessage(msg);
                        }
                        showToast(msg);
                    }
                } catch (e) {
                    console.error('loginByOtp flow error', e);
                    showToast('Login failed after OTP verification.');
                }
            } else {
                const msg = (resp && resp.data && resp.data.message) || resp?.error || 'OTP verification failed.';
                showToast(msg);
            }
        } catch (e) {
            showToast('Failed to verify OTP.');
        } finally {
            setVerifyLoading(false);
        }
    };

    return (
        <KeyboardAwareScrollView
            style={[{ flex: 1, backgroundColor: isDarkMode ? '#2a3144' : '#FFFFFF' }]}
            contentContainerStyle={[styles.container, { paddingBottom: Platform.OS === 'ios' ? 120 : 80 }]}
            enableOnAndroid={true}
            extraScrollHeight={Platform.OS === 'ios' ? 20 : 200}
            enableAutomaticScroll={true}
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={true}
        >
            <Image source={require('../img/newlaunchscreen.png')} style={styles.logo} resizeMode="contain" />

            <View style={[styles.form, { paddingHorizontal: isTabletLocal ? 40 : 20 }]}>
                <Text style={[styles.label, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>Login ID</Text>
                <TextInput
                    value={identifier}
                    onChangeText={setIdentifier}
                    placeholder="Enter registered email/WhatsApp number"
                    placeholderTextColor="#a6a6a6"
                    style={styles.input}
                    keyboardType="default"
                    autoCapitalize="none"
                />
                {identifier.trim().length > 0 && !isValidIdentifier(identifier) && (
                    <Text style={styles.errorText}>Enter valid email or WhatsApp number</Text>
                )}

                {otpVisible ? (
                    <>
                        <Text style={[styles.label, { marginTop: 18, color: isDarkMode ? '#FFFFFF' : '#000000' }]}>Enter OTP</Text>
                        <View style={{ width: '90%', marginTop: 4 }}>
                            <View style={styles.otpRow}>
                                {Array.from({ length: otpLength }).map((_, i) => (
                                    <TextInput
                                        key={i}
                                        ref={(r) => (otpInputsRef.current[i] = r)}
                                        value={(otp && otp[i]) ? otp[i] : ''}
                                        onChangeText={(t) => handleOtpChange(t, i)}
                                        onKeyPress={(e) => handleOtpKeyPress(e, i)}
                                        keyboardType="number-pad"
                                        maxLength={1}
                                        style={styles.otpBox}
                                        placeholder="-"
                                        placeholderTextColor="#a6a6a6"
                                        textContentType="oneTimeCode"
                                        returnKeyType="done"
                                        autoFocus={false}
                                        blurOnSubmit={true}
                                    />
                                ))}
                            </View>
                        </View>

                        <TouchableOpacity style={styles.button} onPress={handleVerifyOTP} disabled={verifyLoading}>
                            <Text style={[styles.buttonText, verifyLoading && styles.buttonTextDisabled]}>{verifyLoading ? 'Verifying...' : 'Verify OTP'}</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <TouchableOpacity
                        style={[styles.button, (loading || !identifier.trim()) && styles.buttonDisabled]}
                        onPress={handleSendOTP}
                        disabled={loading || !identifier.trim()}
                    >
                        <Text style={[styles.buttonText, (loading || !identifier.trim()) && styles.buttonTextDisabled]}>{loading ? 'Sending...' : 'Send OTP'}</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 12 }}>
                    <Text style={styles.backLink}>Close</Text>
                </TouchableOpacity>
                {adminMessage ? (
                    <View style={styles.adminContactRowContainer}>
                        <TouchableOpacity onPress={() => Linking.openURL(ADMIN_CONTACT_URL)} hitSlop={{ top: 8, left: 8, bottom: 8, right: 8 }}>
                            <Text style={styles.adminContactLink}>Contact Admin</Text>
                        </TouchableOpacity>
                    </View>
                ) : null}
            </View>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1, alignItems: 'center', paddingTop: 36 },
    logo: { width: 180, height: 90, marginBottom: 18 },
    form: { width: '100%', maxWidth: 560, alignItems: 'center' },
    label: { alignSelf: 'flex-start', marginLeft: '5%', marginBottom: 8, fontSize: 14, fontWeight: '600' },
    input: { width: '90%', backgroundColor: '#f2f4f7', borderRadius: 8, height: 48, paddingHorizontal: 12, fontSize: 14, borderColor: '#e1e4e8', borderWidth: 1 },
    button: { marginTop: 20, width: '90%', backgroundColor: '#1434A4', paddingVertical: 14, borderRadius: 6, alignItems: 'center' },
    buttonDisabled: { backgroundColor: '#bdbdbd', opacity: 1 },
    buttonText: { color: '#FFFFFF', fontWeight: '700' },
    buttonTextDisabled: { color: '#e6e6e6' },
    backLink: { color: '#1434A4', textDecorationLine: 'underline', fontWeight: '700' },
    otpRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 6 },
    otpBox: { width: 44, height: 52, borderRadius: 8, borderWidth: 1, borderColor: '#e6e9ee', backgroundColor: '#fff', textAlign: 'center', fontSize: 18, fontWeight: '700', color: '#000' },
    errorText: { color: '#dc3545', marginTop: 6, fontSize: 13, fontWeight: '600', alignSelf: 'flex-start', marginLeft: '5%' },
});

export default LoginOTP;
