const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const androidGradle = path.join(root, 'android', 'app', 'build.gradle');
const iosInfoPlist = path.join(root, 'ios', 'allrounderbaby', 'Info.plist');
const versionJsonPath = path.join(root, 'version.json');

function readAndroidVersion() {
    try {
        const content = fs.readFileSync(androidGradle, 'utf8');
        const codeMatch = content.match(/versionCode\s+(\d+)/);
        const nameMatch = content.match(/versionName\s+"([^"]+)"/);
        return {
            versionCode: codeMatch ? parseInt(codeMatch[1], 10) : null,
            versionName: nameMatch ? nameMatch[1] : null,
        };
    } catch (err) {
        console.warn('Could not read android build.gradle:', err.message);
        return {};
    }
}

function readIosVersion() {
    try {
        const content = fs.readFileSync(iosInfoPlist, 'utf8');
        const shortMatch = content.match(/<key>CFBundleShortVersionString<\/key>\s*<string>([^<]+)<\/string>/);
        const buildMatch = content.match(/<key>CFBundleVersion<\/key>\s*<string>([^<]+)<\/string>/);
        return {
            shortVersion: shortMatch ? shortMatch[1] : null,
            buildNumber: buildMatch ? buildMatch[1] : null,
        };
    } catch (err) {
        console.warn('Could not read iOS Info.plist:', err.message);
        return {};
    }
}

function loadVersionJson() {
    try {
        const raw = fs.readFileSync(versionJsonPath, 'utf8');
        return JSON.parse(raw);
    } catch (err) {
        console.warn('Could not read version.json, creating new one');
        return {};
    }
}

function saveVersionJson(obj) {
    obj.updated = new Date().toISOString();
    fs.writeFileSync(versionJsonPath, JSON.stringify(obj, null, 4), 'utf8');
    console.log('Wrote', versionJsonPath);
}

function main() {
    const android = readAndroidVersion();
    const ios = readIosVersion();
    const v = loadVersionJson();

    v.bundle = v.bundle || {};
    v.bundle.android = android.versionName || v.bundle.android || null;
    v.bundle.ios = ios.shortVersion || v.bundle.ios || null;

    v.bundleCode = v.bundleCode || {};
    v.bundleCode.android = android.versionCode != null ? android.versionCode : v.bundleCode.android || null;
    v.bundleCode.ios = ios.buildNumber || v.bundleCode.ios || null;

    // keep top-level remote versions if present
    if (!v.android) v.android = v.bundle.android || null;
    if (!v.ios) v.ios = v.bundle.ios || null;

    saveVersionJson(v);
}

main();
