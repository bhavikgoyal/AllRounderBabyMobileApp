import React, { useState, useRef, useEffect } from 'react';
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, useColorScheme, useWindowDimensions, StatusBar,
    Image, ToastAndroid, Platform, Keyboard
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import resetPasswordRequest from './utils/resetPasswordRequest';
import sendOtpEmail from './utils/emailSend';
import checkEmailExists from './utils/EmailExists';
import verifyOtp from './utils/Verify';
import getMessage from './utils/getMessage';
const NEW_LAUNCH_IMAGE = require('../img/newlaunchscreen.png');
const ForgotPassword = ({ navigation }) => {
    const isDarkMode = useColorScheme() === 'dark';
    const { width } = useWindowDimensions();
    const isTabletLocal = width >= 600;
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otpCode, setOtpCode] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);
    const [sendingOtp, setSendingOtp] = useState(false);
    const [otpVerifiedMessage, setOtpVerifiedMessage] = useState('');
    const [otpStatusMessage, setOtpStatusMessage] = useState('');
    const [otpStatusIsError, setOtpStatusIsError] = useState(false);
    const scrollRef = useRef(null);
    const passwordsMismatch = confirmPassword.length > 0 && newPassword !== confirmPassword;
    const dynamicStyles = {
        fieldset: { width: isTabletLocal ? 500 : '90%' },
        legend: { width: isTabletLocal ? 500 : '90%', fontSize: isTabletLocal ? 16 : 14 },
        input: { height: isTabletLocal ? 52 : 48, fontSize: isTabletLocal ? 16 : 14 },
        image: { height: isTabletLocal ? 160 : 130, width: isTabletLocal ? 500 : '90%', marginTop: 6, marginBottom: 20 },
        modalCard: { padding: isTabletLocal ? 28 : 20, borderRadius: 12 }
    };

    const showToast = (msg) => {
        if (Platform.OS === 'android' && ToastAndroid && typeof ToastAndroid.show === 'function') {
            ToastAndroid.show(msg, ToastAndroid.SHORT);
        } else {
            Alert.alert('', msg);
        }
    };
    const handleSendOtp = async () => {
        const identifier = email?.trim();
        if (!identifier) { showToast('Please enter your registered email.'); return; }
        if (!isValidEmail(identifier)) { showToast('Please enter a valid email address.'); return; }
        setSendingOtp(true);
        try {
            const existsRes = await checkEmailExists(identifier);
            const exists = Boolean(
                existsRes && (
                    existsRes.exists === true ||
                    existsRes.exists === 'true' ||
                    existsRes.ok === true ||
                    existsRes.status === 200
                )
            );
            if (!exists) {
                setSendingOtp(false);
                setOtpStatusMessage('Email not registered.');
                setOtpStatusIsError(true);
                showToast('Email not found. Please check or register.');
                return;
            }

            Keyboard.dismiss();
            const sendRes = await sendOtpEmail(identifier);
            const ok = responseIsSuccess(sendRes);
            if (!ok) {
                const errMsg = (sendRes && ((sendRes.result && (sendRes.result.message || sendRes.result.Message)) || (sendRes.data && (sendRes.data.message || sendRes.data.Message)) || sendRes.error || sendRes.message)) || 'Failed to send OTP. Please try again.';
                setSendingOtp(false);
                setOtpStatusMessage(String(errMsg));
                setOtpStatusIsError(true);
                showToast(String(errMsg));
                return;
            }
            setOtpStatusMessage('OTP sent to your email.');
            setOtpStatusIsError(false);
            setOtpSent(true);
            setOtpVerified(false);
            setOtpVerifiedMessage('');
            setOtpCode('');
            startOtpTimer(60);
            setSendingOtp(false);
        } catch (e) {
            setSendingOtp(false);
            setOtpStatusMessage('Failed to verify/send OTP.');
            setOtpStatusIsError(true);
            showToast('Failed to verify/send OTP. Please try again.');
        }
    };
    const isValidEmail = (str) => {
        if (!str) return false;
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str.trim());
    };
    const isValidIdentifier = (str) => {
        if (!str) return false;
        const t = str.trim();
        return isValidEmail(t);
    };
    const responseIsSuccess = (resp) => {
        if (!resp) return false;
        const body = resp.data ?? resp.result ?? resp;
        if (typeof body.IsSuccess !== 'undefined') return Boolean(body.IsSuccess);
        if (typeof body.isSuccess !== 'undefined') return Boolean(body.isSuccess);
        if (typeof body.success !== 'undefined') return Boolean(body.success);
        if (typeof body.code !== 'undefined') return String(body.code) === '200' || String(body.code) === '201';
        if (typeof body.Code !== 'undefined') return String(body.Code) === '200' || String(body.Code) === '201';
        if (typeof resp.ok !== 'undefined') return Boolean(resp.ok);
        if (typeof resp.status !== 'undefined') return Number(resp.status) === 200 || Number(resp.status) === 201;
        return false;
    };
    const [verifyingOtp, setVerifyingOtp] = useState(false);
    const otpLength = 6;
    const otpInputsRef = useRef([]);
    const [otpTimer, setOtpTimer] = useState(0);
    const [canResend, setCanResend] = useState(true);
    const otpTimerRef = useRef(null);
    useEffect(() => {
        if (otpSent) {
            setOtpCode('');
            otpInputsRef.current = otpInputsRef.current.slice(0, otpLength);
            setOtpVerifiedMessage('');
            setOtpStatusMessage('');
            setOtpStatusIsError(false);
        }
    }, [otpSent]);
    useEffect(() => {
        return () => {
            if (otpTimerRef.current) clearInterval(otpTimerRef.current);
        };
    }, []);

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
            const chars = Array.from({ length: otpLength }, (_, i) => (otpCode[i] ? otpCode[i] : ''));
            for (let i = 0; i < digits.length && idx + i < otpLength; i++) chars[idx + i] = digits[i];
            setOtpCode(chars.join('').slice(0, otpLength));
            const nextIndex = Math.min(otpLength - 1, idx + digits.length);
            const next = otpInputsRef.current[nextIndex];
            if (next) next.focus();
            return;
        }
        const char = digits[0] || '';
        const chars = Array.from({ length: otpLength }, (_, i) => (otpCode[i] ? otpCode[i] : ''));
        chars[idx] = char;
        setOtpCode(chars.join(''));
        if (char && idx < otpLength - 1) {
            const next = otpInputsRef.current[idx + 1];
            if (next) next.focus();
        }
    };
    const handleOtpKeyPress = ({ nativeEvent }, idx) => {
        if (nativeEvent.key === 'Backspace') {
            const chars = Array.from({ length: otpLength }, (_, i) => (otpCode[i] ? otpCode[i] : ''));
            if (!chars[idx] && idx > 0) {
                const prev = otpInputsRef.current[idx - 1];
                if (prev) prev.focus();
            } else {
                chars[idx] = '';
                setOtpCode(chars.join(''));
            }
        }
    };
    const handleVerifyOtp = async () => {
        const digitsOnly = (otpCode || '').replace(/\D/g, '');
        const identifier = email?.trim();
        if (digitsOnly.length !== otpLength) { Alert.alert('Validation', `Please enter the ${otpLength}-digit OTP.`); return; }
        if (!identifier) { showToast('Please enter your registered email.'); return; }
        Keyboard.dismiss();
        setVerifyingOtp(true);
        try {
            const resp = await verifyOtp(null, identifier, digitsOnly);
            const ok = responseIsSuccess(resp);
            const message = getMessage(resp);
            if (ok) {
                setOtpVerified(true);
                setOtpVerifiedMessage(message || 'OTP verified. You can now set a new password.');
                setOtpStatusMessage('OTP verified.');
                setOtpStatusIsError(false);
                showToast('OTP verified. You can now set a new password.');
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
            setVerifyingOtp(false);
        }
    };
    const handleReset = async () => {
        const identifier = email?.trim();
        setLoading(true);
        if (!otpVerified) { showToast('Please send and verify OTP before resetting password.'); setLoading(false); return; }
        if (!newPassword) { showToast('Please enter new password.'); setLoading(false); return; }
        if (newPassword !== confirmPassword) { showToast('Passwords do not match.'); setLoading(false); return; }
        Keyboard.dismiss();
        try {
            const res = await resetPasswordRequest(identifier, newPassword);
            if (res && res.ok) {
                showToast('Password has been reset.');
                setLoading(false);
                setTimeout(() => navigation.navigate('LoginPage'), 900);
            } else {
                const msg = (res && (res.message || (res.result && (typeof res.result === 'string' ? res.result : (res.result.message || res.result.Message))))) || 'Password reset failed';
                showToast(String(msg));
                setLoading(false);
            }
        } catch (err) {
            console.error('handleReset error', err);
            showToast('Could not reset password. Please try again.');
            setLoading(false);
        }
    };
    return (
        <KeyboardAwareScrollView
            ref={scrollRef}
            style={{ flex: 1, backgroundColor: isDarkMode ? '#2a3144' : Colors.white }}
            contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingTop: 12, paddingBottom: 40 }}
            enableOnAndroid={true}
            extraScrollHeight={220}
            enableAutomaticScroll={true}
            keyboardOpeningTime={0}
            keyboardShouldPersistTaps="handled"
        >
            <StatusBar barStyle="light-content" backgroundColor="#1434A4" />
            <Image style={[styles.image, dynamicStyles.image]} source={NEW_LAUNCH_IMAGE} resizeMode="contain" />
            <View style={[styles.modalCard, dynamicStyles.modalCard, { backgroundColor: isDarkMode ? '#1e1e1e' : '#fff' }]}>
                {/* Login ID */}
                <Text style={[styles.label, dynamicStyles.legend]}>Login ID</Text>
                <View style={[styles.fieldset, dynamicStyles.fieldset, styles.fieldsetImproved]}>
                    <TextInput
                        style={[styles.input, dynamicStyles.input]}
                        placeholder="Enter registered email"
                        placeholderTextColor="#a6a6a6"
                        value={email}
                        onChangeText={(t) => {
                            setEmail(t);
                            setOtpSent(false);
                        }}
                        editable={!otpSent}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                {email.trim().length > 0 && !isValidIdentifier(email) && (
                    <Text style={styles.errorText}>Enter a valid email address</Text>
                )}

                {!otpSent && (
                    <TouchableOpacity
                        style={[
                            styles.otpButton,
                            styles.fullWidthButton,
                            (!isValidIdentifier(email) || sendingOtp) ? styles.otpButtonDisabled : null,
                        ]}
                        onPress={handleSendOtp}
                        disabled={sendingOtp || !isValidIdentifier(email)}
                    >
                        {sendingOtp ? <ActivityIndicator color="#fff" /> : <Text style={styles.otpButtonText}>Send OTP</Text>}
                    </TouchableOpacity>
                )}
                {otpSent && !otpVerified && (
                    <>
                        <Text style={[styles.label, dynamicStyles.legend]}>Enter OTP</Text>
                        <View style={[styles.fieldset, dynamicStyles.fieldset, styles.fieldsetImproved]}>
                            <View style={styles.otpRow}>
                                {Array.from({ length: otpLength }).map((_, i) => (
                                    <TextInput
                                        key={i}
                                        ref={(r) => (otpInputsRef.current[i] = r)}
                                        value={otpCode[i] || ''}
                                        onChangeText={(t) => handleOtpChange(t, i)}
                                        onKeyPress={(e) => handleOtpKeyPress(e, i)}
                                        keyboardType="number-pad"
                                        maxLength={1}
                                        style={styles.otpBox}
                                        placeholder="-"
                                        placeholderTextColor="#a6a6a6"
                                        textContentType="oneTimeCode"
                                        returnKeyType="done"
                                    />
                                ))}
                            </View>
                        </View>

                        <TouchableOpacity
                            style={[
                                styles.otpButton,
                                styles.fullWidthButton,
                                (!canResend || sendingOtp) ? styles.otpButtonDisabled : null,
                            ]}
                            onPress={handleSendOtp}
                            disabled={!canResend || sendingOtp}
                        >
                            {sendingOtp ? <ActivityIndicator color="#fff" /> : <Text style={styles.otpButtonText}>{canResend ? 'Resend OTP' : `Resend in ${otpTimer}s`}</Text>}
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.otpButton, styles.fullWidthButton]} onPress={handleVerifyOtp} disabled={verifyingOtp}>
                            {verifyingOtp ? <ActivityIndicator color="#fff" /> : <Text style={styles.otpButtonText}>Verify OTP</Text>}
                        </TouchableOpacity>
                        {otpStatusMessage ? (
                            <Text style={otpStatusIsError ? styles.errorText : styles.otpInfo}>{otpStatusMessage}</Text>
                        ) : null}
                    </>
                )}
                {otpVerified && (
                    <>
                        {otpVerifiedMessage ? <Text style={styles.otpInfo}>{otpVerifiedMessage}</Text> : null}

                        <Text style={[styles.label, dynamicStyles.legend]}>New Password</Text>
                        <View style={[styles.fieldset, dynamicStyles.fieldset, { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f2f2f2' }]}>
                            <TextInput
                                style={[styles.input, dynamicStyles.input, { flex: 1, color: '#000' }]}
                                placeholder="Create a password"
                                placeholderTextColor="#a6a6a6"
                                secureTextEntry={!showNew}
                                value={newPassword}
                                onChangeText={setNewPassword}
                                editable={true}
                                onFocus={(event) => scrollRef.current?.scrollToFocusedInput(event.target, 220)}
                            />
                            <TouchableOpacity onPress={() => setShowNew(!showNew)} style={styles.eyeBtn}>
                                <Text style={styles.eyeText}>{showNew ? 'Hide' : 'Show'}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.label, dynamicStyles.legend]}>Confirm Password</Text>
                        <View style={[styles.fieldset, dynamicStyles.fieldset, { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f2f2f2' }, passwordsMismatch ? { borderColor: '#dc3545' } : null]}>
                            <TextInput
                                style={[styles.input, dynamicStyles.input, { flex: 1, color: '#000' }]}
                                placeholder="Confirm your password"
                                placeholderTextColor="#a6a6a6"
                                secureTextEntry={!showConfirm}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                editable={true}
                                onFocus={(event) => scrollRef.current?.scrollToFocusedInput(event.target, 220)}
                            />
                            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={styles.eyeBtn}>
                                <Text style={styles.eyeText}>{showConfirm ? 'Hide' : 'Show'}</Text>
                            </TouchableOpacity>
                        </View>

                        {passwordsMismatch && <Text style={styles.errorText}>Passwords do not match</Text>}

                        <TouchableOpacity style={[styles.resetButton, (loading) ? styles.resetButtonDisabled : null, styles.fullWidthButton]} onPress={handleReset} disabled={loading}>
                            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.resetButtonText}>Reset Password</Text>}
                        </TouchableOpacity>
                    </>
                )}
                <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    );
};
const styles = StyleSheet.create({
    modalCard: { width: '94%', maxWidth: 520, backgroundColor: '#fff', padding: 18, borderRadius: 8, elevation: 8, alignItems: 'stretch' },
    image: { height: 130, width: '90%', marginTop: 6, marginBottom: 12 },
    label: { marginTop: 6, marginBottom: 6, color: '#333', fontWeight: '600', marginLeft: '4%' },
    fieldset: { alignSelf: 'center', borderColor: '#e6e9ee', borderWidth: 1, paddingHorizontal: 10, borderRadius: 10, backgroundColor: '#f7f8fa', marginBottom: 10 },
    fieldsetImproved: { paddingVertical: 6 },
    input: { height: 48, paddingHorizontal: 12, color: '#000' },
    eyeBtn: { padding: 8 },
    eyeText: { color: '#666', fontWeight: '700' },
    resetButton: { marginTop: 12, backgroundColor: '#1434A4', paddingVertical: 14, borderRadius: 8, alignItems: 'center' },
    resetButtonText: { color: '#fff', fontWeight: '700' },
    closeBtn: { marginTop: 10, alignItems: 'center' },
    closeText: { color: '#1434A4', fontWeight: '700' },
    resetButtonDisabled: { backgroundColor: '#a9a9a9' },
    otpButton: { marginTop: 10, alignSelf: 'center', width: '90%', maxWidth: 500, backgroundColor: '#1434A4', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
    otpButtonDisabled: { backgroundColor: '#a9a9a9' },
    otpButtonText: { color: '#fff', fontWeight: '700' },
    fullWidthButton: { width: '100%', alignSelf: 'center' },
    otpRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 6 },
    otpBox: { width: 44, height: 52, borderRadius: 8, borderWidth: 1, borderColor: '#e6e9ee', backgroundColor: '#fff', textAlign: 'center', fontSize: 18, fontWeight: '700', color: '#000' },
    otpInfo: { marginTop: 8, color: '#2e7d32', textAlign: 'center', fontWeight: '600' },
    errorText: { color: '#dc3545', marginTop: 6, fontSize: 13, fontWeight: '600', textAlign: 'center' }
});
export default ForgotPassword;