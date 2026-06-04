#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

// Expose Swift ScreenSecurity to React Native
RCT_EXTERN_MODULE(ScreenSecurity, RCTEventEmitter)
RCT_EXTERN_METHOD(enableProtection)
RCT_EXTERN_METHOD(disableProtection)
