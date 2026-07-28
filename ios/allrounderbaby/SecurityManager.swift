import Foundation
import UIKit

@objc(SecurityManager)
class SecurityManager: RCTEventEmitter {
    private var overlayWindow: UIWindow?
    private var isProtectedMode: Bool = true

    override init() {
        super.init()
        NotificationCenter.default.addObserver(self, selector: #selector(screenCaptureChanged), name: UIScreen.capturedDidChangeNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(screenshotTaken), name: UIApplication.userDidTakeScreenshotNotification, object: nil)
        // Apply protection automatically
        DispatchQueue.main.async {
            self.applyProtection(true)
        }
    }

    @objc override static func requiresMainQueueSetup() -> Bool {
        return true
    }

    override func supportedEvents() -> [String]! {
        return ["onScreenCaptureChanged","onScreenshot","onProtectionChanged"]
    }

    @objc func enableCaptureProtection() {
        applyProtection(true)
        sendEvent(withName: "onProtectionChanged", body: ["isProtected": true])
    }

    @objc func disableCaptureProtection() {
        applyProtection(false)
        sendEvent(withName: "onProtectionChanged", body: ["isProtected": false])
    }

    @objc func isCaptured(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        resolve(UIScreen.main.isCaptured)
    }

    @objc private func screenCaptureChanged() {
        guard isProtectedMode else { return }
        if UIScreen.main.isCaptured {
            showOverlay()
            sendEvent(withName: "onScreenCaptureChanged", body: ["isCaptured": true])
        } else {
            hideOverlay()
            sendEvent(withName: "onScreenCaptureChanged", body: ["isCaptured": false])
        }
    }

    @objc private func screenshotTaken() {
        guard isProtectedMode else { return }
        showOverlay()
        sendEvent(withName: "onScreenshot", body: ["detected": true])
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
            if !UIScreen.main.isCaptured {
                self.hideOverlay()
            }
        }
    }

    private func applyProtection(_ enable: Bool) {
        DispatchQueue.main.async {
            self.isProtectedMode = enable
            if enable {
                if UIScreen.main.isCaptured {
                    self.showOverlay()
                } else {
                    self.hideOverlay()
                }
            } else {
                self.hideOverlay()
            }
        }
    }

    private func showOverlay() {
        if overlayWindow != nil { return }
        guard let scene = UIApplication.shared.connectedScenes.first as? UIWindowScene else { return }
        let win = UIWindow(windowScene: scene)
        win.frame = UIScreen.main.bounds
        win.backgroundColor = UIColor.black
        win.windowLevel = UIWindow.Level.alert + 1
        win.isHidden = false
        win.makeKeyAndVisible()
        overlayWindow = win
    }

    private func hideOverlay() {
        overlayWindow?.isHidden = true
        overlayWindow = nil
    }

    deinit {
        NotificationCenter.default.removeObserver(self)
    }
}
