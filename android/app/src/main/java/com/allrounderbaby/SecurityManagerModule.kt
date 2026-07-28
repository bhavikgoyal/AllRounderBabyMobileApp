package com.allrounderbaby

import android.view.WindowManager
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

class SecurityManagerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private var isProtected: Boolean = true

    override fun getName(): String {
        return "SecurityManagerAndroid"
    }

    @ReactMethod
    fun enableCaptureProtection(promise: Promise) {
        setFlag(true)
        promise.resolve(true)
    }

    @ReactMethod
    fun disableCaptureProtection(promise: Promise) {
        setFlag(false)
        promise.resolve(true)
    }

    @ReactMethod
    fun isProtected(promise: Promise) {
        promise.resolve(isProtected)
    }

    private fun setFlag(enable: Boolean) {
        val activity = currentActivity ?: return
        activity.runOnUiThread {
            try {
                val window = activity.window
                if (enable) {
                    window.setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE)
                    isProtected = true
                } else {
                    window.clearFlags(WindowManager.LayoutParams.FLAG_SECURE)
                    isProtected = false
                }
                sendEvent("onProtectionChanged", Arguments.createMap().apply { putBoolean("isProtected", isProtected) })
            } catch (e: Exception) {
                // ignore
            }
        }
    }

    private fun sendEvent(name: String, params: WritableMap) {
        reactApplicationContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(name, params)
    }
}
