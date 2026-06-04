import { NativeModules, NativeEventEmitter, Platform } from 'react-native'

const { ScreenSecurity } = NativeModules
const emitter = new NativeEventEmitter(ScreenSecurity)

export default {
    enableProtection: () => ScreenSecurity?.enableProtection && ScreenSecurity.enableProtection(),
    disableProtection: () => ScreenSecurity?.disableProtection && ScreenSecurity.disableProtection(),
    addListener: (event, cb) => emitter.addListener(event, cb),
    removeAllListeners: (event) => emitter.removeAllListeners(event),
}
