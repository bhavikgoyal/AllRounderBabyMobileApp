import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, BackHandler, StatusBar, useColorScheme, Platform, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import DeviceInfo from 'react-native-device-info';
import versionInfo from '../version.json';

const AppVersion = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#1a202c' : '#f0f4f8',
  };

  const textColor = {
    color: isDarkMode ? Colors.white : Colors.black,
  };

  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        navigation.navigate('My Profile');
      } else {
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => {
      backHandler.remove();
      StatusBar.setHidden(false);
    };
  }, [navigation]);


  const [remoteVersion, setRemoteVersion] = useState(null);
  const [sendStatus, setSendStatus] = useState(null);

  useEffect(() => {
    if (versionInfo) {
      const key = Platform.OS === 'android' ? 'android' : 'ios';
      setRemoteVersion(versionInfo[key] || null);
    }
  }, []);

  useEffect(() => {
    const sendPayload = async () => {
      try {
        const key = Platform.OS === 'android' ? 'android' : 'ios';
        const bundleVersion = (versionInfo && versionInfo.bundle && versionInfo.bundle[key]) || DeviceInfo.getVersion();
        const payload = {
          platform: Platform.OS,
          bundleVersion,
          remoteVersion: remoteVersion,
        };

        if (versionInfo && versionInfo.postUrl) {
          const res = await fetch(versionInfo.postUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          setSendStatus('sent');
        } else {
          console.log('version payload:', payload);
          setSendStatus('logged');
        }
      } catch (err) {
        console.warn('failed to send version payload', err);
        setSendStatus('error');
      }
    };

    if (remoteVersion !== null) sendPayload();
  }, [remoteVersion]);

  return (
    <>
      <View style={[styles.header]}>
        <TouchableOpacity onPress={() => { try { navigation.navigate('My Profile'); } catch (e) { } }} style={[styles.backButton,]}>
          <Image source={require('../img/backBtn.png')} style={[styles.backIcon, backgroundStyle, { tintColor: isDarkMode ? '#fff' : '#1434a4' }]} />
        </TouchableOpacity>
      </View>
      <View style={[styles.container]}>
        <View style={styles.contentWrapper}>
          <Image
            source={require('../img/loginlogo.png')}
            style={styles.logo}
            accessibilityLabel="App Logo"
          />
          {remoteVersion && (
            <View style={{ marginTop: 8, alignItems: 'center' }}>
              <Text style={[styles.versionText, textColor]}>{Platform.OS === 'android' ? 'Android' : 'iOS'} Version: {remoteVersion}</Text>
            </View>
          )}
        </View>
      </View>
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: Platform.OS === 'ios' ? 18 : 18,
    paddingHorizontal: 12,
    justifyContent: 'flex-start',
  },
  contentWrapper: {
    alignItems: 'center',
    padding: 0,
    borderRadius: 20,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
    fontSize: 25,
    color: '#1434a4',
  },
  logo: {
    width: 250,
    height: 130,
    resizeMode: 'cover',
    marginBottom: 15,
    borderRadius: 50,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  versionText: {
    fontSize: 18,
    fontWeight: '600',
    opacity: 0.7,
  },
});

export default AppVersion;