package com.allrounderbaby

import android.app.Activity
import android.app.Application
import android.content.Context
import android.hardware.display.DisplayManager
import android.os.Build
import android.view.Display
import android.view.WindowManager
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule

class SecurityModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  private var protectionEnabled = false
  private val displayListener = object : DisplayManager.DisplayListener {
    override fun onDisplayAdded(displayId: Int) { checkDisplays() }
    override fun onDisplayRemoved(displayId: Int) { checkDisplays() }
    override fun onDisplayChanged(displayId: Int) { checkDisplays() }
  }

  private val activityListener = object : Application.ActivityLifecycleCallbacks {
    override fun onActivityResumed(activity: Activity) {
      if (protectionEnabled) {
        try {
          activity.window.setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE)
        } catch (e: Exception) {
        }
      }
    }

    override fun onActivityPaused(activity: Activity) {}
    override fun onActivityStarted(activity: Activity) {}
    override fun onActivityDestroyed(activity: Activity) {}
    override fun onActivitySaveInstanceState(activity: Activity, outState: android.os.Bundle) {}
    override fun onActivityStopped(activity: Activity) {}
    override fun onActivityCreated(activity: Activity, savedInstanceState: android.os.Bundle?) {}
  }

  init {
    val dm = reactContext.getSystemService(Context.DISPLAY_SERVICE) as? DisplayManager
    dm?.registerDisplayListener(displayListener, null)
    reactContext.applicationContext?.let {
      if (it is Application) {
        it.registerActivityLifecycleCallbacks(activityListener)
      }
    }
    // initial check
    checkDisplays()
  }

  override fun getName(): String = "ScreenSecurity"

  @ReactMethod
  fun enableProtection() {
    protectionEnabled = true
    // set flag on current activity if available
    currentActivity?.let { act ->
      try {
        act.window.setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE)
      } catch (e: Exception) {}
    }
  }

  @ReactMethod
  fun disableProtection() {
    protectionEnabled = false
    currentActivity?.let { act ->
      try {
        act.window.clearFlags(WindowManager.LayoutParams.FLAG_SECURE)
      } catch (e: Exception) {}
    }
  }

  private fun checkDisplays() {
    val dm = reactContext.getSystemService(Context.DISPLAY_SERVICE) as? DisplayManager ?: return
    val displays = dm.displays
    val isShared = displays.any { it.displayId != Display.DEFAULT_DISPLAY }
    val params = Arguments.createMap()
    params.putBoolean("isScreenShared", isShared)
    sendEvent("ScreenShareChanged", params)
  }

  private fun sendEvent(eventName: String, params: com.facebook.react.bridge.WritableMap) {
    try {
      reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
        .emit(eventName, params)
    } catch (e: Exception) {
    }
  }
}
