import { useEffect, useState, useRef } from 'react'
import SecurityManager from './SecurityManager.native'

export function useCaptureProtection(onScreenCaptureDetected?: () => void) {
    const [state, setState] = useState({
        isRecording: false,
        isScreenshotDetected: false,
        isScreenSharing: false,
        isProtected: true,
    })

    const listenersRef = useRef<any[]>([])

    useEffect(() => {
        // subscribe to native events
        const onScreenCaptureChanged = (payload: any) => {
            setState(prev => ({ ...prev, isRecording: !!payload.isCaptured, isProtected: payload.isProtected ?? prev.isProtected }))
            if (payload.isCaptured && onScreenCaptureDetected) onScreenCaptureDetected()
        }

        const onScreenshot = (payload: any) => {
            setState(prev => ({ ...prev, isScreenshotDetected: true }))
            if (onScreenCaptureDetected) onScreenCaptureDetected()
            // reset screenshot flag shortly
            setTimeout(() => setState(prev => ({ ...prev, isScreenshotDetected: false })), 800)
        }

        const onProtectionChanged = (payload: any) => {
            setState(prev => ({ ...prev, isProtected: !!payload.isProtected }))
        }

        listenersRef.current.push(SecurityManager.addListener('onScreenCaptureChanged', onScreenCaptureChanged))
        listenersRef.current.push(SecurityManager.addListener('onScreenshot', onScreenshot))
        listenersRef.current.push(SecurityManager.addListener('onProtectionChanged', onProtectionChanged))

        // ensure native side has protection enabled by default
        SecurityManager.enableCaptureProtection().catch(() => { })

        return () => {
            listenersRef.current.forEach(l => l && l.remove && l.remove())
            listenersRef.current = []
        }
    }, [onScreenCaptureDetected])

    return {
        ...state,
        enableCaptureProtection: SecurityManager.enableCaptureProtection,
        disableCaptureProtection: SecurityManager.disableCaptureProtection,
    }
}

export default useCaptureProtection
