import Foundation
import UIKit

@objc(ScreenSecurity)
class ScreenSecurity: RCTEventEmitter {

  private var hasListeners = false
  private var protectionEnabled = false

  override init() {
    super.init()
  }

  @objc override static func requiresMainQueueSetup() -> Bool {
    return true
  }

  override func supportedEvents() -> [String]! {
    return ["ScreenCapturedChanged", "ScreenshotTaken", "ScreenShareChanged"]
  }

  override func startObserving() {
    hasListeners = true
    NotificationCenter.default.addObserver(self, selector: #selector(screenCaptureChanged), name: UIScreen.capturedDidChangeNotification, object: nil)
    NotificationCenter.default.addObserver(self, selector: #selector(userDidTakeScreenshot), name: UIApplication.userDidTakeScreenshotNotification, object: nil)
    NotificationCenter.default.addObserver(self, selector: #selector(screensDidChange), name: UIScreen.screensDidConnectNotification, object: nil)
    NotificationCenter.default.addObserver(self, selector: #selector(screensDidChange), name: UIScreen.screensDidDisconnectNotification, object: nil)
    // initial states
    DispatchQueue.main.async {
      self.emitCaptureState()
      self.emitScreenShareState()
    }
  }

  override func stopObserving() {
    hasListeners = false
    NotificationCenter.default.removeObserver(self)
  }

  @objc func enableProtection() {
    protectionEnabled = true
    // nothing to set at native level on iOS; JS layer will react to events
  }

  @objc func disableProtection() {
    protectionEnabled = false
  }

  @objc private func screenCaptureChanged() {
    emitCaptureState()
  }

  @objc private func userDidTakeScreenshot() {
    if hasListeners {
      sendEvent(withName: "ScreenshotTaken", body: ["timestamp": Date().timeIntervalSince1970])
    }
  }

  @objc private func screensDidChange() {
    emitScreenShareState()
  }

  private func emitCaptureState() {
    if hasListeners {
      let captured = UIScreen.main.isCaptured
      sendEvent(withName: "ScreenCapturedChanged", body: ["isRecording": captured])
    }
  }

  private func emitScreenShareState() {
    if hasListeners {
      // External displays or AirPlay show up in UIScreen.screens
      let isShared = UIScreen.screens.count > 1 || UIScreen.main.isCaptured
      sendEvent(withName: "ScreenShareChanged", body: ["isScreenShared": isShared])
    }
  }
}
