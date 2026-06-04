import { useEffect, useState, useCallback } from 'react'
import ScreenSecurity from './index'

export function useScreenSecurity() {
    const [isRecording, setIsRecording] = useState(false)
    const [isScreenShared, setIsScreenShared] = useState(false)

    useEffect(() => {
        const sub1 = ScreenSecurity.addListener('ScreenCapturedChanged', (ev) => {
            if (ev && typeof ev.isRecording !== 'undefined') setIsRecording(!!ev.isRecording)
        })
        const sub2 = ScreenSecurity.addListener('ScreenShareChanged', (ev) => {
            if (ev && typeof ev.isScreenShared !== 'undefined') setIsScreenShared(!!ev.isScreenShared)
        })
        const sub3 = ScreenSecurity.addListener('ScreenshotTaken', (ev) => {
            // optionally react to screenshots
            console.log('ScreenshotTaken', ev)
        })

        return () => {
            sub1.remove()
            sub2.remove()
            sub3.remove()
            ScreenSecurity.removeAllListeners('ScreenCapturedChanged')
            ScreenSecurity.removeAllListeners('ScreenShareChanged')
            ScreenSecurity.removeAllListeners('ScreenshotTaken')
        }
    }, [])

    const enableProtection = useCallback(() => {
        ScreenSecurity.enableProtection && ScreenSecurity.enableProtection()
    }, [])
    const disableProtection = useCallback(() => {
        ScreenSecurity.disableProtection && ScreenSecurity.disableProtection()
    }, [])

    return { isRecording, isScreenShared, enableProtection, disableProtection }
}
