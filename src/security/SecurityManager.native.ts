import { NativeModules, NativeEventEmitter, Platform } from 'react-native'

const Native = Platform.OS === 'android' ? (NativeModules.SecurityManagerAndroid ?? NativeModules.SecurityManager) : NativeModules.SecurityManager

const emitter = Native ? new NativeEventEmitter(Native) : null

type State = {
    isRecording: boolean
    isScreenshotDetected: boolean
    isScreenSharing: boolean
    isProtected: boolean
}

const defaultState: State = {
    isRecording: false,
    isScreenshotDetected: false,
    isScreenSharing: false,
    isProtected: true,
}

export async function enableCaptureProtection(): Promise<boolean> {
    if (!Native) return false
    if (Native.enableCaptureProtection) {
        return await Native.enableCaptureProtection()
    }
    return false
}

export async function disableCaptureProtection(): Promise<boolean> {
    if (!Native) return false
    if (Native.disableCaptureProtection) {
        return await Native.disableCaptureProtection()
    }
    return false
}

export async function isProtected(): Promise<boolean> {
    if (!Native) return defaultState.isProtected
    if (Native.isProtected) {
        return await Native.isProtected()
    }
    return defaultState.isProtected
}

export function addListener(eventName: string, handler: (payload: any) => void) {
    if (!emitter) return { remove: () => { } }
    const sub = emitter.addListener(eventName, handler)
    return sub
}

export default {
    enableCaptureProtection,
    disableCaptureProtection,
    isProtected,
    addListener,
}
