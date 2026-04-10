import React, { useState, useRef, useEffect } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, useColorScheme, Image, TextInput, Platform, Alert, ToastAndroid, useWindowDimensions, Keyboard,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import sendOtpEmail from './utils/emailSend';
import sendWhatsAppOtp from './utils/whatsappSend';
import checkWhatsappNumber from './utils/whatsappNumberExist';
import verifyOtp from './utils/Verify';
import loginByOtp from './utils/loginByOtp';
import getDeviceKey from './utils/deviceKey';
import getMessage from './utils/getMessage';
import { CommonActions } from '@react-navigation/native';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ADMIN_CONTACT_URL = 'https://allrounderbaby.com/UserQuestion';
const LoginOTP = ({ navigation }) => {
    const isDarkMode = useColorScheme() === 'dark';
    const [identifier, setIdentifier] = useState('');
    const [loading, setLoading] = useState(false);
    const [otpVisible, setOtpVisible] = useState(false);
    const [otp, setOtp] = useState('');
    const [adminMessage, setAdminMessage] = useState(null);
    const [whatsappMessage, setWhatsappMessage] = useState('');
    const [serverFullNumber, setServerFullNumber] = useState(null);
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [otpTimer, setOtpTimer] = useState(0);
    const [canResend, setCanResend] = useState(true);
    const otpTimerRef = useRef(null);
    const whatsappTimerRef = useRef(null);
    const [otpStatusMessage, setOtpStatusMessage] = useState('');
    const [otpStatusIsError, setOtpStatusIsError] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [otpVerifiedMessage, setOtpVerifiedMessage] = useState('');
    const otpLength = 6;
    const otpInputsRef = useRef([]);

    useEffect(() => {
        if (otpVisible) {
            setOtp('');
            otpInputsRef.current = otpInputsRef.current.slice(0, otpLength);
        }
    }, [otpVisible]);

    useEffect(() => {
        return () => {
            if (otpTimerRef.current) clearInterval(otpTimerRef.current);
            if (whatsappTimerRef.current) clearTimeout(whatsappTimerRef.current);
        };
    }, []);

    useEffect(() => {
        if (!whatsappMessage) return undefined;
        if (whatsappTimerRef.current) clearTimeout(whatsappTimerRef.current);
        whatsappTimerRef.current = setTimeout(() => {
            setWhatsappMessage('');
            whatsappTimerRef.current = null;
        }, 80000);
        return () => {
            if (whatsappTimerRef.current) {
                clearTimeout(whatsappTimerRef.current);
                whatsappTimerRef.current = null;
            }
        };
    }, [whatsappMessage]);

    const startOtpTimer = (seconds = 60) => {
        if (otpTimerRef.current) clearInterval(otpTimerRef.current);
        setOtpTimer(seconds);
        setCanResend(false);
        otpTimerRef.current = setInterval(() => {
            setOtpTimer((s) => {
                if (s <= 1) {
                    clearInterval(otpTimerRef.current);
                    otpTimerRef.current = null;
                    setCanResend(true);
                    return 0;
                }
                return s - 1;
            });
        }, 1000);
    };

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

    const responseIsSuccess = (resp) => {
        if (!resp) return false;
        const body = resp.data ?? resp.result ?? resp;
        if (typeof body.success !== 'undefined') return Boolean(body.success);
        if (typeof body.IsSuccess !== 'undefined') return Boolean(body.IsSuccess);
        if (typeof body.isSuccess !== 'undefined') return Boolean(body.isSuccess);
        if (typeof body.code !== 'undefined') return String(body.code) === '200';
        if (typeof body.Code !== 'undefined') return String(body.Code) === '200';
        if (typeof resp.ok !== 'undefined') return Boolean(resp.ok);
        if (typeof resp.status !== 'undefined') return Number(resp.status) === 200;
        return false;
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
        setAdminMessage(null);
        setWhatsappMessage('');
        try {
            if (isValidEmail(id)) {
                // clear any previous server-provided WhatsApp number when using email
                setServerFullNumber(null);
                const resp = await sendOtpEmail(id);
                console.log('sendOtpEmail response', resp);
                const ok = responseIsSuccess(resp);
                if (ok) {
                    setOtpVisible(true);
                    startOtpTimer(60);
                    showToast(getMessage(resp) || 'OTP sent to your email.');
                } else {
                    console.log('sendOtpEmail failed', resp);
                    const msg = getMessage(resp) || 'Failed to send OTP to email.';
                    if (resp && (resp.status === 400 || (resp.result && (resp.result.code === 400 || resp.result.Code === 400)))) {
                        setAdminMessage(msg);
                    }
                    showToast(msg);
                }
            } else if (isValidWhatsAppNumber(id)) {
                const normalized = id.replace(/[\s\-()]/g, '');
                const existResp = await checkWhatsappNumber(normalized);
                console.log('checkWhatsappNumber response', existResp);
                const exists = Boolean(existResp && existResp.exists);
                if (!exists) {
                    const serverMsg = getMessage(existResp) || existResp?.message;
                    const uiMsg = serverMsg || 'The entered WhatsApp number is not registered with our system. Please verify the number or contact support for assistance.';

                    setWhatsappMessage(uiMsg);
                    setServerFullNumber(null);
                    return;
                }
                let targetNumber = normalized;
                if (existResp && existResp.data) {
                    const parsed = existResp.data;
                    targetNumber = parsed.Data || parsed.data || parsed || normalized;
                }
                const resp = await sendWhatsAppOtp(targetNumber);
                console.log('sendWhatsAppOtp response', resp);
                const ok = responseIsSuccess(resp);
                if (ok) {
                    setWhatsappMessage('');
                    // store the server-provided full number for later verification/login
                    setServerFullNumber(targetNumber || null);
                    setOtpVisible(true);
                    startOtpTimer(60);
                    showToast(getMessage(resp) || 'OTP sent to your WhatsApp.');
                } else {
                    console.log('sendWhatsAppOtp failed', resp);
                    const msg = getMessage(resp) || 'Failed to send OTP to WhatsApp.';
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
        const id = identifier?.trim();
        if (digitsOnly.length !== otpLength) {
            showToast(`Please enter the ${otpLength}-digit OTP.`);
            return;
        }
        if (!id) {
            showToast('Please enter registered email/WhatsApp number.');
            return;
        }
        Keyboard.dismiss();
        setVerifyLoading(true);
        try {
            const apiIdentifier = isValidEmail(id) ? id : (serverFullNumber || id);
            console.log('Verifying OTP for identifier:', apiIdentifier);
            const resp = await verifyOtp(null, apiIdentifier, digitsOnly);
            console.log('verifyOtp response', resp);
            const ok = responseIsSuccess(resp);
            const message = getMessage(resp);
            if (ok) {
                setOtpVerified(true);
                setOtpVerifiedMessage(message || 'OTP verified.');
                setOtpStatusMessage(message || 'OTP verified.');
                setOtpStatusIsError(false);
                showToast(message || 'OTP verified.');
                try {
                    let localDeviceKey = await getDeviceKey();
                    const loginResp = await loginByOtp(apiIdentifier, localDeviceKey);
                    console.log('loginByOtp response', loginResp);

                    const data = loginResp && loginResp.data ? loginResp.data : null;

                    if (!loginResp || !loginResp.ok) {
                        const msg = getMessage(loginResp) || `Request failed with status ${loginResp?.status || 0}`;
                        if (loginResp?.status === 400 || data?.code === 400) {
                            // show admin message in UI instead of toast
                            setAdminMessage(msg);
                            if (typeof setPasswordError === 'function') setPasswordError(msg);
                            return;
                        }
                        if (loginResp?.status === 401 || data?.code === 401) {
                            const errMsg = data?.message || '❗Invalid credentials.';
                            if (typeof setPasswordError === 'function') setPasswordError(errMsg);
                            showToast(errMsg);
                            return;
                        }
                        Alert.alert('Error', msg);
                        if (typeof setPasswordError === 'function') setPasswordError(msg);
                        showToast(msg);
                        return;
                    }

                    if (data?.code === 200) {
                        const {
                            firstName,
                            lastName,
                            emailAddress,
                            phoneNumber,
                            deviceKey: serverDeviceKey,
                            token,
                            userID
                        } = data.data || {};
                        const finalDeviceKey = serverDeviceKey || localDeviceKey;
                        const sessionId = Math.random().toString(36).substring(2, 15);
                        const items = [
                            ['token', token || ''],
                            ['userId', String(userID || '')],
                            ['deviceKey', finalDeviceKey || ''],
                            ['sessionId', sessionId]
                        ];
                        if (firstName && lastName) {
                            items.push(['Name', `${firstName} ${lastName}`]);
                        }
                        if (emailAddress) {
                            items.push(['userEmail', emailAddress]);
                        }
                        if (phoneNumber) {
                            items.push(['phoneNumber', phoneNumber]);
                        }
                        await AsyncStorage.multiSet(items);
                        if (typeof rememberMe !== 'undefined' && rememberMe) {
                            if (typeof keychainAvailable !== 'undefined' && keychainAvailable) {
                                const userForKeychain = (typeof trimmedU !== 'undefined' && trimmedU) ? trimmedU : id;
                                const passForKeychain = (typeof trimmedP !== 'undefined' && trimmedP) ? trimmedP : (token || '');
                                try {
                                    await Keychain.setGenericPassword(userForKeychain, passForKeychain, {
                                        service: 'loginCredentials'
                                    });
                                } catch (e) {
                                    console.warn('Keychain save failed', e);
                                }
                            }
                            try { await AsyncStorage.setItem('rememberMePreference', 'true'); } catch (e) { /* ignore */ }
                        }
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: 'Home' }]
                            })
                        );
                    } else {
                        const msg = getMessage(loginResp) || 'Login failed after OTP verification.';
                        showToast(msg);
                    }
                } catch (le) {
                    console.error('loginByOtp error', le);
                    showToast('Login failed after OTP verification.');
                }
            } else {
                setOtpVerified(false);
                setOtpVerifiedMessage('');
                setOtpStatusMessage(message || 'Invalid OTP.');
                setOtpStatusIsError(true);
                showToast(message || 'Invalid OTP.');
            }
        } catch (err) {
            setOtpVerified(false);
            setOtpVerifiedMessage('');
            setOtpStatusMessage('Failed to verify OTP.');
            setOtpStatusIsError(true);
            showToast('Failed to verify OTP. Please try again.');
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
                        <View style={styles.whatsapperrorContainer}>
                            <Text style={styles.whatsappMessageText}>{whatsappMessage}</Text>
                        </View>
                        <TouchableOpacity
                            style={[styles.button, (!canResend || loading) && styles.buttonDisabled]}
                            onPress={handleSendOTP}
                            disabled={!canResend || loading}
                        >
                            <Text style={[styles.buttonText, (!canResend || loading) && styles.buttonTextDisabled]}>{loading ? 'Sending...' : (canResend ? 'Resend OTP' : `Resend in ${otpTimer}s`)}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleVerifyOTP} disabled={verifyLoading}>
                            <Text style={[styles.buttonText, verifyLoading && styles.buttonTextDisabled]}>{verifyLoading ? 'Verifying...' : 'Verify OTP'}</Text>
                        </TouchableOpacity>
                        {otpStatusMessage ? (
                            <Text style={otpStatusIsError ? styles.errorText : styles.otpInfo}>{otpStatusMessage}</Text>
                        ) : null}
                    </>
                ) : (
                    <>
                        {whatsappMessage ? (
                            <View style={styles.whatsapperrorContainer}>
                                <Text style={styles.whatsappMessageText}>{whatsappMessage}</Text>
                            </View>
                        ) : null}
                        <TouchableOpacity
                            style={[styles.button, (loading || !identifier.trim()) && styles.buttonDisabled]}
                            onPress={handleSendOTP}
                            disabled={loading || !identifier.trim()}
                        >
                            <Text style={[styles.buttonText, (loading || !identifier.trim()) && styles.buttonTextDisabled]}>{loading ? 'Sending...' : 'Send OTP'}</Text>
                        </TouchableOpacity>
                    </>
                )}
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 12 }}>
                    <Text style={styles.backLink}>Close</Text>
                </TouchableOpacity>
                {adminMessage ? (
                    <View style={styles.adminContactRowContainer}>
                        <Text style={styles.adminMessageText}>{adminMessage}</Text>
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
    otpInfo: { color: '#28a745', marginTop: 6, fontSize: 13, fontWeight: '600', alignSelf: 'flex-start', marginLeft: '5%' },
    adminContactRowContainer: { marginTop: 12, alignItems: 'center' },
    adminContactLink: { color: '#1434A4', textDecorationLine: 'underline', fontWeight: '700', marginTop: 6 },
    adminMessageText: { color: '#dc3545', textAlign: 'center', marginHorizontal: '5%', fontSize: 13, fontWeight: '600' },
    whatsapperrorContainer: { marginTop: 8, width: '90%', alignItems: 'center' },
    whatsappMessageText: { color: '#b0453a', textAlign: 'center', marginHorizontal: '5%', fontSize: 13, fontWeight: '600' },
});

export default LoginOTP;