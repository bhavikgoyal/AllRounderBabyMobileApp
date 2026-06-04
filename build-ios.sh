#!/bin/bash

################################################################################
# React Native iOS Build & Archive Script
# 
# This script automates the process of building and archiving a React Native
# iOS application for TestFlight or Ad Hoc distribution.
#
# Usage:
#   ./build-ios.sh
#
# Required Environment Variables:
#   WORKSPACE_NAME      - Name of the Xcode workspace (e.g., "allrounderbaby.xcworkspace")
#   SCHEME_NAME         - Name of the build scheme (e.g., "allrounderbaby")
#   TEAM_ID             - Apple Developer Team ID (10-character string)
#   EXPORT_OPTIONS_PLIST - Path to ExportOptions.plist file
#
# Optional Environment Variables:
#   CONFIGURATION       - Build configuration (default: "Release")
#   SKIP_POD_INSTALL    - Set to "true" to skip pod install (default: "false")
#
################################################################################

set -e  # Exit immediately if a command exits with a non-zero status

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored messages
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_separator() {
    echo "════════════════════════════════════════════════════════════════"
}

################################################################################
# Validate Environment Variables
################################################################################

print_separator
print_info "Validating environment variables..."

if [ -z "$WORKSPACE_NAME" ]; then
    print_error "WORKSPACE_NAME environment variable is not set"
    print_info "Example: export WORKSPACE_NAME=\"allrounderbaby.xcworkspace\""
    exit 1
fi

if [ -z "$SCHEME_NAME" ]; then
    print_error "SCHEME_NAME environment variable is not set"
    print_info "Example: export SCHEME_NAME=\"allrounderbaby\""
    exit 1
fi

if [ -z "$TEAM_ID" ]; then
    print_error "TEAM_ID environment variable is not set"
    print_info "Example: export TEAM_ID=\"XXXXXXXXXX\""
    exit 1
fi

if [ -z "$EXPORT_OPTIONS_PLIST" ]; then
    print_error "EXPORT_OPTIONS_PLIST environment variable is not set"
    print_info "Example: export EXPORT_OPTIONS_PLIST=\"./ExportOptions.plist\""
    exit 1
fi

# Set defaults
CONFIGURATION="${CONFIGURATION:-Release}"
SKIP_POD_INSTALL="${SKIP_POD_INSTALL:-false}"

print_success "Environment variables validated"
print_info "Workspace: $WORKSPACE_NAME"
print_info "Scheme: $SCHEME_NAME"
print_info "Configuration: $CONFIGURATION"
print_info "Team ID: $TEAM_ID"
print_info "Export Options: $EXPORT_OPTIONS_PLIST"

################################################################################
# Navigate to iOS Directory
################################################################################

print_separator
print_info "Navigating to iOS directory..."

PROJECT_ROOT=$(pwd)
IOS_DIR="$PROJECT_ROOT/ios"

if [ ! -d "$IOS_DIR" ]; then
    print_error "iOS directory not found at $IOS_DIR"
    exit 1
fi

cd "$IOS_DIR"
print_success "Changed directory to: $(pwd)"

################################################################################
# Install CocoaPods Dependencies
################################################################################

if [ "$SKIP_POD_INSTALL" != "true" ]; then
    print_separator
    print_info "Installing CocoaPods dependencies..."
    
    if [ ! -f "Podfile" ]; then
        print_error "Podfile not found in $IOS_DIR"
        exit 1
    fi
    
    # Check if pod command is available
    if ! command -v pod &> /dev/null; then
        print_error "CocoaPods is not installed. Please install it first:"
        print_info "sudo gem install cocoapods"
        exit 1
    fi
    
    pod install
    
    if [ $? -eq 0 ]; then
        print_success "CocoaPods dependencies installed successfully"
    else
        print_error "Failed to install CocoaPods dependencies"
        exit 1
    fi
else
    print_warning "Skipping pod install (SKIP_POD_INSTALL=true)"
fi

################################################################################
# Clean Previous Builds
################################################################################

print_separator
print_info "Cleaning previous builds..."

# Clean Xcode build artifacts
xcodebuild clean \
    -workspace "$WORKSPACE_NAME" \
    -scheme "$SCHEME_NAME" \
    -configuration "$CONFIGURATION"

if [ $? -eq 0 ]; then
    print_success "Previous builds cleaned successfully"
else
    print_error "Failed to clean previous builds"
    exit 1
fi

# Remove existing build directory
BUILD_DIR="$IOS_DIR/build"
if [ -d "$BUILD_DIR" ]; then
    print_info "Removing existing build directory..."
    rm -rf "$BUILD_DIR"
    print_success "Build directory removed"
fi

################################################################################
# Build and Archive the App
################################################################################

print_separator
print_info "Building and archiving the app in $CONFIGURATION mode..."

ARCHIVE_PATH="$BUILD_DIR/App.xcarchive"

xcodebuild archive \
    -workspace "$WORKSPACE_NAME" \
    -scheme "$SCHEME_NAME" \
    -configuration "$CONFIGURATION" \
    -archivePath "$ARCHIVE_PATH" \
    -destination 'generic/platform=iOS' \
    DEVELOPMENT_TEAM="$TEAM_ID" \
    CODE_SIGN_STYLE=Automatic \
    -allowProvisioningUpdates

if [ $? -eq 0 ]; then
    print_success "App archived successfully to: $ARCHIVE_PATH"
else
    print_error "Failed to archive the app"
    exit 1
fi

################################################################################
# Export IPA
################################################################################

print_separator
print_info "Exporting IPA file..."

IPA_OUTPUT_DIR="$BUILD_DIR/ipa"
EXPORT_OPTIONS_PATH="$PROJECT_ROOT/$EXPORT_OPTIONS_PLIST"

# Check if ExportOptions.plist exists
if [ ! -f "$EXPORT_OPTIONS_PATH" ]; then
    print_error "ExportOptions.plist not found at: $EXPORT_OPTIONS_PATH"
    exit 1
fi

xcodebuild -exportArchive \
    -archivePath "$ARCHIVE_PATH" \
    -exportPath "$IPA_OUTPUT_DIR" \
    -exportOptionsPlist "$EXPORT_OPTIONS_PATH" \
    -allowProvisioningUpdates

if [ $? -eq 0 ]; then
    print_success "IPA exported successfully to: $IPA_OUTPUT_DIR"
    
    # Find and display the IPA file
    IPA_FILE=$(find "$IPA_OUTPUT_DIR" -name "*.ipa" | head -n 1)
    if [ -n "$IPA_FILE" ]; then
        IPA_SIZE=$(du -h "$IPA_FILE" | cut -f1)
        print_success "IPA file: $IPA_FILE"
        print_success "Size: $IPA_SIZE"
    fi
else
    print_error "Failed to export IPA"
    exit 1
fi

################################################################################
# Final Success Message
################################################################################

print_separator
print_success "🎉 BUILD COMPLETED SUCCESSFULLY! 🎉"
print_separator
print_info "Archive location: $ARCHIVE_PATH"
print_info "IPA location: $IPA_OUTPUT_DIR"
print_separator
print_success "Your app is ready for TestFlight or Ad Hoc distribution!"
print_info "Next steps:"
print_info "  1. Test the IPA on a device or upload to TestFlight"
print_info "  2. Use Application Loader or Xcode to upload to App Store Connect"
print_separator

# Return to project root
cd "$PROJECT_ROOT"

exit 0
