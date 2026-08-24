import { StatusBar } from 'react-native';
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,

  TouchableOpacity,
  Image,
  Clipboard,
  Alert,
  useColorScheme,
  Share,
  Platform,
  Pressable,
  BackHandler,
  ActivityIndicator,
  Animated,
  Easing,
  useWindowDimensions,
} from 'react-native';
import ScreenScroll from './components/ScreenScroll';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { BASE_URL } from './config/api';

// window size will be read dynamically inside the component using useWindowDimensions

const lightThemeColors = {
  screenBackground: '#F4F6F8',
  cardBackground: '#FFFFFF',
  modalBackground: '#FFFFFF',
  textPrimary: '#1A202C',
  textPrimaryModal: '#1A202C',
  textSecondary: '#4A5568',
  textSecondaryModal: '#000',
  textMuted: '#718096',
  textSuccess: '#38A169',
  primaryAction: 'rgba(20, 52, 164, 1)',
  primaryActionText: '#FFFFFF',
  secondaryActionBorder: '#CBD5E0',
  secondaryActionText: '#2D3748',
  linkColor: 'rgba(20, 52, 164, 1)',
  borderColor: '#E2E8F0',
  iconColor: '#4A5568',
  videoIconTint: 'rgba(20, 52, 164, 1)',
  bottomNavBackground: '#FFFFFF',
  bottomNavActiveTint: 'rgba(20, 52, 164, 1)',
  bottomNavInactiveTint: '#A0AEC0',
  bottomNavShadowColor: '#000000',
  radioButtonBorder: '#CBD5E0',
  radioButtonSelectedBackground: 'rgba(20, 52, 164, 1)',
  modalButtonShareBackground: '#4CAF50',
  modalButtonShareText: '#FFFFFF',
  modalButtonCloseBackground: '#E2E8F0',
  modalButtonCloseText: '#2D3748',
  overlayBackground: 'rgba(0,0,0,0.6)',
  statusBarContent: 'dark-content',
  borderColorD: '#ccc',
  elevation: 5,
};

const darkThemeColors = {
  screenBackground: '#1A202C',
  cardBackground: '#2D3748',
  modalBackground: '#2D3748',
  textPrimary: '#E2E8F0',
  textPrimaryModal: '#fff',
  textSecondary: '#A0AEC0',
  textSecondaryModal: '#fff',
  textMuted: '#718096',
  textSuccess: '#68D391',
  primaryAction: 'rgba(40, 72, 184, 1)',
  primaryActionText: '#E2E8F0',
  secondaryActionBorder: '#4A5568',
  secondaryActionText: '#CBD5E0',
  linkColor: '#63B3ED',
  borderColor: '#4A5568',
  iconColor: '#A0AEC0',
  videoIconTint: 'rgba(40, 72, 184, 1)',
  bottomNavBackground: '#2D3748',
  bottomNavActiveTint: '#63B3ED',
  bottomNavInactiveTint: '#718096',
  bottomNavShadowColor: '#000000',
  radioButtonBorder: '#4A5568',
  radioButtonSelectedBackground: '#63B3ED',
  modalButtonShareBackground: '#38A169',
  modalButtonShareText: '#E2E8F0',
  modalButtonCloseBackground: '#4A5568',
  modalButtonCloseText: '#E2E8F0',
  overlayBackground: 'rgba(0,0,0,0.7)',
  statusBarContent: 'light-content',
  borderColorD: '#fff',
  elevation: 0,
};

const url = BASE_URL;

const ReferAndEarn = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkThemeColors : lightThemeColors;
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const styles = useMemo(() => createReferAndEarnStyles(theme, windowWidth, windowHeight), [theme, windowWidth, windowHeight]);
  const isDarkMode = useColorScheme() === 'dark';

  const isLandscape = windowWidth > windowHeight;
  const isTablet = windowWidth >= 600;

  const [code, setCode] = useState("Loading...");
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [selectedAge, setSelectedAge] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserID] = useState(null);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [referEarnVideos, setReferEarnVideos] = useState({});
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);
  const [selectedVideoGroup, setSelectedVideoGroup] = useState(null);
  const [isLanguageButtonLoading, setIsLanguageButtonLoading] = useState(false);
  const [languageButtonLoadingFor, setLanguageButtonLoadingFor] = useState(null); // 'hindi'|'english'|null
  const [showDetails, setShowDetails] = useState(false);
  const pulseAnim = useRef(new Animated.Value(0)).current;

  const REFER_EARN_FOLDER_ID = "9ebe21e5639c440c930ba642a07d0a0b";

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      StatusBar.setBarStyle('light-content');
    }
  }, [isFocused]);
  useEffect(() => {
    const loadUserData = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUserId = await AsyncStorage.getItem('userId');
      setUserID(storedUserId);
      setToken(storedToken);
      if (storedToken && storedUserId) {
        handleRefrealcode(storedToken, storedUserId);
      } else {
        console.warn("Authentication: Token or User ID not found in AsyncStorage.");
        setCode("Login Req.");
      }
    };
    loadUserData();
  }, []);

  useEffect(() => {
    if (token) {
      fetchReferEarnVideos(REFER_EARN_FOLDER_ID);
    }
  }, [token]);

  useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
        isInteraction: false,
      }),
      { iterations: -1 }
    );
    anim.start();
    return () => anim.stop();
  }, [pulseAnim]);

  useEffect(() => {
    const backAction = () => {
      if (shareModalVisible) {
        closeShareModal();
        return true;
      }
      if (isLanguageModalVisible) {
        setIsLanguageModalVisible(false);
        return true;
      }
      if (navigation && typeof navigation.canGoBack === 'function' && navigation.canGoBack()) {
        navigation.goBack();
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [shareModalVisible, isLanguageModalVisible, navigation]);

  const ageOptions = [
    { label: "0-1 year", value: "0-1" },
    { label: "1-2 years", value: "1-2" },
    { label: "2-3 years", value: "2-3" },
    { label: "3-4 years", value: "3-4" },
    { label: "4-5 years", value: "4-5" },
    { label: "5-6 years", value: "5-6" },
  ];

  const copyToClipboard = () => {
    if (code && code !== "Loading..." && code !== "N/A" && code !== "Login Req.") {
      Clipboard.setString(code);
      Alert.alert("Copied!", "Referral code copied to clipboard.");
    } else {
      Alert.alert("Information", "Referral code is not yet available or invalid.");
    }
  };

  const onPressKnowMoreButton = () => {
    setShowDetails(!showDetails);
  };

  const openShareModal = () => {
    if (code && code !== "Loading..." && code !== "N/A" && code !== "Login Req.") {
      setSelectedAge(null);
      setShareModalVisible(true);
    } else {
      Alert.alert("Information", "Please wait for the referral code to load or ensure you are logged in before sharing.");
    }
  };

  const closeShareModal = () => {
    setShareModalVisible(false);
  };

  const performActualShare = async () => {
    if (!selectedAge) {
      Alert.alert("Please select", "Please select a child's age group before sharing.");
      return;
    }
    let shareMessage = `My referral code is: ${code}. Use it on AllrounderBaby.com for a 10% discount!`;
    shareMessage += ` (Age group: ${selectedAge} years)`;
    shareMessage += ` #AllrounderBaby #ReferAndEarn`;

    try {
      const result = await Share.share({ message: shareMessage });
      if (result.action === Share.sharedAction) {
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      const errMsg = typeof error?.message === 'string' ? error.message : 'Unknown error';
      Alert.alert('Error', 'An error occurred while sharing: ' + errMsg);
    }
  };

  const fetchReferEarnVideos = async (folderId) => {
    const netInfoState = await NetInfo.fetch();
    if (!netInfoState.isConnected) {
      Alert.alert(
        "No Internet Connection",
        "Please check your internet connection and try again."
      );
      return;
    }
    if (!token) {
      Alert.alert("Authentication Error", "User not authenticated. Please log in again.");
      return;
    }
    setIsVideoLoading(true);
    const DETAILS_ENDPOINT = `${url}Vdocipher/GetAllVDOCipherVideosByFolderID?folderId=${folderId}`;
    try {
      const response = await fetch(DETAILS_ENDPOINT, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      if (!response.ok) {
        let errorData = { message: `HTTP Error: ${response.status} ${response.statusText}` };
        try {
          errorData = await response.json();
        } catch (parseError) {
          errorData = { message: response.statusText };
        }
        const errMessage = typeof errorData?.message === 'string' ? errorData.message : String(response.statusText);
        // Alert.alert("API Error", `Failed to get video details: ${errMessage}`);
        return null;
      }
      const videoDetails = await response.json();
      setReferEarnVideos(videoDetails);
      return videoDetails;
    } catch (error) {
      const errMsg = typeof error?.message === 'string' ? error.message : 'Unknown error';
      // Alert.alert("Network Error", `An unexpected error occurred: ${errMsg}`);
      return null;
    } finally {
      setIsVideoLoading(false);
    }
  };

  const vdoCipher_api = async (videoId) => {
    const netInfoState = await NetInfo.fetch();
    if (!netInfoState.isConnected) {
      Alert.alert("No Internet Connection", "Please check your internet connection and try again.");
      return { error: true, message: "No internet connection" };
    }
    setIsVideoLoading(true);
    if (!videoId) {
      //  Alert.alert("Error", "Missing video ID to play the video.");
      return { error: true, message: "Missing videoId" };
    }
    const DETAILS_ENDPOINT = `${url}Vdocipher/GetVDOCipher_VideosDetails?videoId=${videoId}`;
    try {
      const response = await fetch(DETAILS_ENDPOINT, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (parseError) {
          errorData = { message: response.statusText };
        }
        return {
          error: true,
          message: `Failed to get video details: ${errorData.message || response.statusText}`
        };
      }
      const videoDetails = await response.json();
      return videoDetails;
    } catch (error) {
      return {
        error: true,
        message: `An unexpected error occurred: ${error.message}`
      };
    } finally {
    }
  };

  const handleRefrealcode = async (currentToken, currentUserId) => {
    const effectiveToken = currentToken || token;
    const effectiveUserId = currentUserId || userId;
    if (!effectiveToken || !effectiveUserId) {
      setIsLoading(false);
      return;
    }
    const DETAILS_ENDPOINT = `${url}User/getUsersDetails_By_ID?userid=${effectiveUserId}`;
    setIsLoading(true);
    try {
      const response = await fetch(DETAILS_ENDPOINT, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${effectiveToken}`,
          'Accept': 'application/json'
        }
      });
      if (!response.ok) {
        let errorData;
        const responseText = await response.text();
        try {
          errorData = JSON.parse(responseText);
        } catch (parseError) {
          errorData = {
            message: response.statusText,
            rawResponse: responseText
          };
        }
        console.error("handleRefrealcode: API Error Response:", errorData);
        const errMessage = typeof errorData?.message === 'string' ? errorData.message : String(response.statusText);
        const rawResp = typeof errorData?.rawResponse === 'string' ? errorData.rawResponse : 'N/A';
        setCode("Error");
        return;
      }
      const jsonResponse = await response.json();
      if (Array.isArray(jsonResponse) && jsonResponse.length > 0) {
        setUserDetails(jsonResponse[0]);
        if (jsonResponse[0].referal_Code) {
          setCode(jsonResponse[0].referal_Code);
        } else {
          setCode("N/A");
        }
      } else {
        // Alert.alert("Data Error", "User data not found or format is invalid.");
        setCode("N/A");
      }
    } catch (error) {
      console.error("handleRefrealcode: Network or unexpected error:", error);
      const errMsg = typeof error?.message === 'string' ? error.message : 'Unknown error';
      //Alert.alert("Network Error", `An unexpected error occurred: ${errMsg}`);
      setCode("Error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoPlayback = async (videoId, language, title, poster, stepParam) => {
    const netInfoState = await NetInfo.fetch();
    if (!netInfoState.isConnected) {
      Alert.alert("No Internet Connection", "Please check your internet connection and try again.");
      return;
    }
    if (!userId) {
      // Alert.alert("Authentication Error", "User ID not available for watermark. Please log in again.");
      setIsVideoLoading(false);
      return;
    }
    setIsVideoLoading(true);

    const nameRaw = await AsyncStorage.getItem('Name');
    const emailRaw = await AsyncStorage.getItem('userEmail');
    const phoneRaw = await AsyncStorage.getItem('phoneNumber');
    const sessionIdRaw = await AsyncStorage.getItem('sessionId');


    const name = typeof nameRaw === 'string' ? nameRaw : JSON.stringify(nameRaw);
    const email = typeof emailRaw === 'string' ? emailRaw : JSON.stringify(emailRaw);
    const phone = typeof phoneRaw === 'string' ? phoneRaw : JSON.stringify(phoneRaw);
    const sessionId = typeof sessionIdRaw === 'string' ? sessionIdRaw : JSON.stringify(sessionIdRaw);


    const startX = 20;
    const startY = 5;
    const spacing = 10;
    const maxY = 50;

    const annotationObject = [
      {
        type: 'rtext',
        text: name,
        alpha: 0.5,
        color: '0xFFFFFF',
        size: 14,
        interval: 5000,
        skip: 2000,
        x: startX,
        y: startY
      },
      {
        type: 'rtext',
        text: email,
        alpha: 0.4,
        color: '0x00FFFF',
        interval: 10000,
        skip: 1000,
        size: 14,
        x: startX,
        y: Math.min(startY + spacing, maxY)
      },
      {
        type: 'rtext',
        text: phone,
        alpha: 0.4,
        color: '0x00FF00',
        interval: 10000,
        skip: 1000,
        size: 14,
        x: startX,
        y: Math.min(startY + 1 * spacing, maxY)
      },
      {
        type: 'rtext',
        text: sessionId,
        alpha: 0.4,
        color: '0xFF00FF',
        interval: 10000,
        skip: 500,
        size: 14,
        x: startX,
        y: Math.min(startY + 2 * spacing, maxY)
      }
    ];
    try {
      if (videoId) {
        const detailsData = await vdoCipher_api(videoId);
        if (detailsData && !detailsData.error) {
          const total_time = detailsData.length || 0;
          const step = selectedVideoGroup?.stepNumber;
          const stepToSend = stepParam ?? step ?? 1;

          navigation.navigate('VideoPlayerScreen', {
            VideoId: videoId,
            annotate: JSON.stringify(annotationObject),
            total_time: total_time,
            language: language,
            title: title,
            poster: poster,
            cameFrom: 'Refer and Earn',
            step: stepToSend,
            displayStep: 1,
            stage_name: 'Refer and Earn',
            sessionId: sessionId,
          });
          setIsVideoLoading(false);
        }
        else {
          let errMsg = "Failed to fetch video details from Vdocipher API.";
          if (detailsData && typeof detailsData.message === 'string') {
            errMsg = detailsData.message;
          } else if (detailsData && detailsData.message) {
            errMsg = String(detailsData.message);
          }
          // Alert.alert("Error", errMsg);
          setIsVideoLoading(false);
        }
      } else {
        //  Alert.alert("Error", "Video not found.");
        setIsVideoLoading(false);
      }
    }
    catch (err) {
      const errMsg = typeof err?.message === 'string' ? err.message : 'Unknown error';
      // Alert.alert("Network Error", `An unexpected error occurred: ${errMsg}`);
      setIsVideoLoading(false);
    }
  };

  const playableReferEarnVideos = useMemo(() => {
    const videos = [];
    let englishItem = null;
    let hindiItem = null;
    referEarnVideos?.rows?.forEach(item => {
      if (item.title && item.title.toLowerCase().includes('refer and earn')) {
        if (item.title.toLowerCase().includes('english')) {
          englishItem = item;
        } else if (item.title.toLowerCase().includes('hindi')) {
          hindiItem = item;
        }
      }
    });
    if (englishItem) {
      videos.push({
        id: englishItem.id,
        title: 'English',
        language: 'english',
        poster: englishItem.poster,
        length: englishItem.length
      });
    }
    if (hindiItem) {
      videos.push({
        id: hindiItem.id,
        title: 'Hindi',
        language: 'hindi',
        poster: hindiItem.poster,
        length: hindiItem.length
      });
    }
    return videos;
  }, [referEarnVideos]);

  const referImageSource = require('../img/REFERnEARN.png');
  const resolved = Image.resolveAssetSource(referImageSource) || {};
  const imgAspect = (resolved.width && resolved.height) ? (resolved.width / resolved.height) : (16 / 9);

  const horizontalMargin = isTablet ? 40 : 20;
  const containerPadding = isTablet ? 20 : 10;
  const referMaxWidth = windowWidth - (horizontalMargin * 2) - (containerPadding * 2);

  let referWidth = referMaxWidth;
  let referHeight = Math.round(referWidth / imgAspect);

  let maxHeightPercentage = 0.3;
  if (isLandscape) {
    maxHeightPercentage = isTablet ? 0.5 : 0.4;
  } else {
    maxHeightPercentage = isTablet ? 0.35 : 0.3;
  }

  const referMaxHeight = Math.round(windowHeight * maxHeightPercentage);
  if (referHeight > referMaxHeight) {
    referHeight = referMaxHeight;
    referWidth = Math.round(referHeight * imgAspect);
  }

  const responsiveImageStyle = {
    width: referWidth,
    height: referHeight,
    borderRadius: isTablet ? 8 : 5
  };

  const thumbnailWrapperLocal = {
    width: referWidth,
    height: referHeight,
    alignItems: 'center',
    justifyContent: 'center'
  };

  const importantBoxLocal = isLandscape ? { minHeight: referHeight + 40 } : null;

  const handleThumbnailClickForReferAndEarn = () => {
    if (playableReferEarnVideos.length > 0) {
      const hindiVideo = playableReferEarnVideos.find(v => v.language === 'hindi');
      const englishVideo = playableReferEarnVideos.find(v => v.language === 'english');

      const videoGroup = {
        hindiVideo: hindiVideo ? { id: hindiVideo.id } : null,
        englishVideo: englishVideo ? { id: englishVideo.id } : null,
        stepNumber: 'refer-and-earn',
      };

      setSelectedVideoGroup(videoGroup);
      setIsLanguageModalVisible(true);
    } else {
      // Alert.alert("Videos Not Available", "Refer & Earn videos could not be loaded. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.statusBarContent} backgroundColor={theme.screenBackground} />
      <ScreenScroll contentContainerStyle={styles.scrollViewContent}>
        <View style={[styles.importantDetailsBox, { marginTop: isTablet ? 10 : 12, padding: isTablet ? 18 : 16, marginBottom: isTablet ? 12 : 10 }]}>
          <LinearGradient
            colors={['#FFF8E5', '#FFFDEB']}>
            <View>
              <Text style={[styles.gradientTitleText, { lineHeight: isTablet ? 26 : 26 }]}>You earn ₹3,000 / $30 every time</Text>
              <Text style={[styles.gradientTitleText, { lineHeight: isTablet ? 26 : 26 }]}>Refer a friend & they get 10% OFF</Text>
            </View>
          </LinearGradient>
        </View>
        <View style={styles.importantDetailsBox}>
          <Text style={[styles.referralCodeLabel, { color: isDarkMode ? '#fff' : '#1434a4' }]}>Your Referral Code</Text>
          <View style={styles.referralCodeDisplay}>
            {isLoading ? (
              <ActivityIndicator size="small" color={theme.textPrimary} />
            ) : (
              <Text style={styles.referralCodeText}>{code}</Text>
            )}
            <TouchableOpacity onPress={copyToClipboard} disabled={isLoading || code === "N/A" || code === "Loading..." || code === "Error" || code === "Login Req."}>
              <Image source={require('../img/copy.png')} style={styles.copyIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.primaryButton} onPress={openShareModal} disabled={isLoading || code === "N/A" || code === "Loading..." || code === "Error" || code === "Login Req."}>
              <Text style={styles.buttonTextPrimary}>Share Code</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.secondaryButton} onPress={onPressReferralHistoryBtn}>
              <Text style={styles.buttonTextSecondary}>Referral History</Text>
            </TouchableOpacity> */}
          </View>
        </View>
        <View style={[styles.sectionDivider, { marginVertical: isTablet ? 12 : 8 }]} />
        <View style={[styles.importantDetailsBox, importantBoxLocal, { padding: isTablet ? 20 : 10, marginVertical: 3, marginTop: isTablet ? 8 : 5 }]}>
          <TouchableOpacity onPress={handleThumbnailClickForReferAndEarn} activeOpacity={0.9} style={{ alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <View style={thumbnailWrapperLocal}>
              <Image source={referImageSource} style={responsiveImageStyle} resizeMode="contain" />
              <Animated.View
                pointerEvents="none"
                style={[
                  styles.pulseShadow,
                  {
                    backgroundColor: 'rgba(30,144,255,1)',
                    opacity: pulseAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.7, 0.4, 0] }),
                    transform: [
                      { translateX: -40 },
                      { translateY: -40 },
                      { scale: pulseAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 1.36, 1.33] }) },
                    ],
                  },
                ]}
              />
              <View pointerEvents="none" style={styles.playButtonContainer}>
                <View style={[styles.playButtonCircle, { backgroundColor: isDarkMode ? '#fff' : '#fff' }]}>
                  <Text style={styles.playButtonText}>▶</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.sectionDivider, { marginVertical: isTablet ? 12 : 8 }]} />

        <View style={styles.importantDetailsBox}>
          <Text style={[styles.contentHeader, { color: isDarkMode ? '#fff' : '#1434a4' }]}>How to Refer & Earn?</Text>
          <Text style={styles.listItem}>
            <Text style={styles.boldText}>1.</Text>
            <Text> Invite friends using your referral code—share via WhatsApp, Email, or Social Media!</Text>
            {'\n'}
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.boldText}>2.</Text>
            <Text>Your friend joins using your referral code and gets 10% OFF on successful payment!</Text>
            {'\n'}
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.boldText}>3.</Text>
            <Text>Earn INR ₹3,000 / USD $30 every time your referral makes a verified purchase!</Text>
          </Text>
        </View>
        <View style={[styles.sectionDivider, { marginVertical: isTablet ? 12 : 8 }]} />

        <View style={styles.importantDetailsBox}>
          <Text style={[styles.sectionHeader, { color: isDarkMode ? '#fff' : '#1434a4' }]}>Important Details</Text>
          <Text style={styles.detailPoint}>
            <Text style={styles.emphasisText}>✔️ You earn every time your referral is successful.</Text>
            {'\n'}
          </Text>
          <Text style={styles.detailPoint}>
            <Text style={styles.emphasisText}>✔️ No limit to how much you can earn.</Text>
          </Text>
        </View>


        {showDetails && (
          <View style={styles.sectionLinkDivider}>
            <View style={[styles.sectionDivider, { marginTop: isTablet ? 12 : 8, marginBottom: isTablet ? 8 : 5 }]} />

            <View style={styles.importantDetailsBox}>

              <Text style={[styles.contentHeader, { color: isDarkMode ? '#fff' : '#1434a4' }]}>Processing & Bank Details</Text>

              <Text style={styles.listItem}>
                <Text style={styles.boldText}>✔️</Text> Update your bank details after logging in to our website — this will be used for your earning payout (for eligible domestic users)
                {'\n'}
              </Text>

              <Text style={styles.listItem}>
                <Text style={styles.boldText}>✔️</Text> International payouts are available only in supported countries.
                {'\n'}
              </Text>

              <Text style={styles.listItem}>
                <Text style={styles.boldText}>✔️</Text> Payouts are processed within 1 to 60 days depending on transaction volume and verification time​.
              </Text>
            </View>

            <View style={styles.sectionDivider} />
            <View style={styles.importantDetailsBox}>

              <Text style={[styles.contentHeader, { color: isDarkMode ? '#fff' : '#1434a4' }]}>
                International Payments & Charges
              </Text>

              <Text style={styles.listItem}>
                <Text style={styles.boldText}>✔️</Text>
                ️ For international users, payouts are facilitated through a third-party global payout platform (such as Tremendous), subject to availability in eligible countries.
                {'\n'}
              </Text>

              <Text style={styles.listItem}>
                <Text style={styles.boldText}>✔️</Text> Any transaction fees, currency conversion charges, or bank deductions (if applicable) are determined by the payout platform and recipient’s bank
                {'\n'}
              </Text>
              <Text style={styles.listItem}>
                <Text style={styles.boldText}>✔️</Text> The final amount credited depends on the payout method selected and applicable exchange rates
              </Text>
            </View>


            <View style={styles.sectionDivider} />
            <View style={styles.importantDetailsBox}>

              <Text style={[styles.contentHeader, { color: isDarkMode ? '#fff' : '#1434a4' }]}>

                Tax & Compliance (India)
              </Text>

              <Text style={styles.listItem}>
                <Text style={styles.boldText}>✔️</Text> Referral earnings are treated as commission income and are subject to Indian tax laws
                {'\n'}
              </Text>

              <Text style={styles.listItem}>
                <Text style={styles.boldText}>✔️</Text> Payouts may be withheld until PAN details are submitted to ensure tax compliance
                {'\n'}
              </Text>

              <Text style={styles.listItem}>
                <Text style={styles.boldText}>✔️</Text> TDS is deducted under Section 194H of the Income Tax Act, 1961 at the applicable rate and payouts are made after tax deduction
                {'\n'}
              </Text>
              <Text style={styles.listItem}>
                <Text style={styles.boldText}>✔️</Text> You may claim credit for such TDS while filing your income tax return

                {'\n'}
              </Text>


            </View>

            <View style={styles.sectionDivider} />
            <View style={styles.importantDetailsBox}>

              <Text style={[styles.contentHeader, { color: isDarkMode ? '#fff' : '#1434a4' }]}>For International Users
              </Text>

              <Text style={styles.listItem}>
                <Text style={styles.boldText}>✔️ </Text>You are responsible for reporting your referral income in accordance with your local tax laws

                {'\n'}
              </Text>

              <Text style={styles.listItem}>
                <Text style={styles.boldText}>✔️ </Text>️ We do not deduct or file international taxes on your behalf
              </Text>


            </View>

            <View style={styles.sectionDivider} />
            <View style={styles.importantDetailsBox}>

              <Text style={[styles.contentHeader, { color: isDarkMode ? '#fff' : '#1434a4' }]}>Important Notes
              </Text>

              <Text style={styles.listItem}>
                <Text style={styles.boldText}>✔️ </Text>AllrounderBaby does not offer tax advice. Please consult your tax advisor.
                {'\n'}
              </Text>

              <Text style={styles.listItem}>
                <Text style={styles.boldText}>✔️ </Text>By receiving referral earnings, you agree to our Terms of Use and Privacy Policy
              </Text>


            </View>
            <View style={styles.sectionDivider} />
            <View style={styles.importantDetailsBox}>
              <Text style={[styles.listItem, { textAlign: 'center' }]}>
                <Text style={styles.boldText}>
                  Science says – “Your child grows better with good friends”
                  Refer your child’s friend’s parents !
                </Text>
              </Text>
            </View>
          </View>
        )}

        <TouchableOpacity onPress={onPressKnowMoreButton} style={styles.linkButton}>
          <Text style={styles.linkText}>{showDetails ? 'Know less' : 'Know more'}</Text>
        </TouchableOpacity>
      </ScreenScroll>
      {isLanguageModalVisible && selectedVideoGroup && (
        <Pressable style={styles.modalLikeContainer} onPress={() => setIsLanguageModalVisible(false)}>
          <View style={styles.modalContent}>
            <View style={styles.modalContentMainDiv}>
              <Text style={styles.modalTitle}>Select Language</Text>
              <TouchableOpacity onPress={() => setIsLanguageModalVisible(false)}>
                <Text style={styles.modalContentClose}>✕</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.borderLine} />
            <Text style={styles.modalText}>In which language would you like to watch this video?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, (!selectedVideoGroup.hindiVideo || isLanguageButtonLoading) && styles.disabledButton]}
                onPress={async () => {
                  if (isLanguageButtonLoading) return;
                  setIsLanguageButtonLoading(true);
                  setLanguageButtonLoadingFor('hindi');
                  try {
                    await handleVideoPlayback(selectedVideoGroup.hindiVideo.id, 'hindi', 'Refer & Earn Video (Hindi)', null);
                  } catch (e) {
                    // preserve existing behavior
                  } finally {
                    setIsLanguageButtonLoading(false);
                    setLanguageButtonLoadingFor(null);
                    setIsLanguageModalVisible(false);
                  }
                }}
                disabled={!selectedVideoGroup.hindiVideo || isLanguageButtonLoading}
              >
                <Text style={styles.modalButtonText}>Hindi</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, (!selectedVideoGroup.englishVideo || isLanguageButtonLoading) && styles.disabledButton]}
                onPress={async () => {
                  if (isLanguageButtonLoading) return;
                  setIsLanguageButtonLoading(true);
                  setLanguageButtonLoadingFor('english');
                  try {
                    await handleVideoPlayback(selectedVideoGroup.englishVideo.id, 'english', 'Refer & Earn Video (English)', null);
                  } catch (e) {
                    // preserve existing behavior
                  } finally {
                    setIsLanguageButtonLoading(false);
                    setLanguageButtonLoadingFor(null);
                    setIsLanguageModalVisible(false);
                  }
                }}
                disabled={!selectedVideoGroup.englishVideo || isLanguageButtonLoading}
              >
                <Text style={styles.modalButtonText}>English</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      )}

      {isLanguageButtonLoading && (
        <View style={styles.fullPageLoader} pointerEvents="auto">
          <ActivityIndicator size="large" color={theme.primaryAction || '#fff'} />
        </View>
      )}
      {shareModalVisible && (
        <Pressable style={styles.modalOverlay} onPress={closeShareModal}>
          <Pressable style={styles.modalView} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Share Your Code</Text>
              <TouchableOpacity onPress={closeShareModal} style={styles.modalCloseButton}>
                <Text style={styles.modalCloseIcon}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.radioGroupTitle}>Select Child's Age Group:</Text>
            <View style={styles.radioGroupContainer}>
              {ageOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={styles.radioButtonRow}
                  onPress={() => setSelectedAge(option.value)}
                >
                  <View style={styles.radioButtonOuter}>
                    {selectedAge === option.value && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                  <Text style={styles.radioButtonLabel}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.modalButtonContainers}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: theme.modalButtonShareBackground }]}
                onPress={performActualShare}
              >
                <Text style={[{ color: theme.modalButtonShareText, fontWeight: 'bold' }]}>Share Now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: theme.modalButtonCloseBackground }]}
                onPress={closeShareModal}
              >
                <Text style={[{ color: theme.modalButtonCloseText, fontWeight: 'bold' }]}>Close</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      )}
      {/* Bottom tab handled by HomeTabs; removed duplicate local bottom nav */}
    </View>
  );
};

const createReferAndEarnStyles = (theme, windowWidth = 360, windowHeight = 640) => {
  const isTablet = windowWidth >= 600;
  const contentPadding = isTablet ? 25 : 15;
  const horizontalMargin = isTablet ? 40 : 20;
  const baseFontSize = isTablet ? 18 : 16;
  const titleFontSize = isTablet ? 24 : 20;
  const headerFontSize = isTablet ? 22 : 18;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.screenBackground,
    },
    Thumbnail: {
      fontSize: baseFontSize + 1,
    },
    sectionHeader: {
      marginHorizontal: 0,
      marginTop: 0,
      marginBottom: isTablet ? 16 : 12,
      fontSize: titleFontSize,
      fontWeight: '600',
    },
    importantDetailsBox: {
      marginHorizontal: horizontalMargin,
      marginTop: 0,
      padding: contentPadding,
      backgroundColor: theme.cardBackground,
      borderRadius: isTablet ? 12 : 8,
      borderWidth: theme.elevation === 0 ? 1 : 0,
      borderColor: theme.borderColor,
      elevation: theme.elevation / 2,
      shadowColor: theme.bottomNavShadowColor,
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    borderLine: {
      borderBottomWidth: 1,
      borderBottomColor:
        theme.borderColorD,
      width: "100%",
      marginBottom: 15,
    },
    detailPoint: {
      fontSize: baseFontSize - 1,
      lineHeight: isTablet ? 26 : 22,
      color: theme.textSecondary,
      marginHorizontal: isTablet ? 15 : 10,
    },
    scrollViewContent: {
      flexGrow: 1,
      paddingBottom: isTablet ? 30 : 20,
    },
    gradientTitleText: {
      fontSize: headerFontSize - 1,
      textAlign: 'center',
      marginHorizontal: 0,
      marginTop: 0,
      marginBottom: 0,
      fontWeight: '600',
      color: '#1A202C',
      lineHeight: isTablet ? 28 : 24,
    },
    sectionDivider: {
      height: 1,
      backgroundColor: theme.borderColor,
      marginHorizontal: horizontalMargin,
      marginVertical: isTablet ? 12 : 8,
    },
    referralCodeLabel: {
      textAlign: 'center',
      fontWeight: '600',
      fontSize: titleFontSize,
      marginTop: 0,
      marginBottom: isTablet ? 15 : 10,
    },
    referralCodeDisplay: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: isTablet ? 10 : 0,
    },
    referralCodeText: {
      fontSize: titleFontSize + 2,
      fontWeight: 'bold',
      color: theme.textSuccess,
      borderBottomWidth: 2,
      borderStyle: 'dotted',
      borderColor: theme.textSuccess,
      paddingBottom: 2,
      marginRight: 15,
    },
    copyIcon: {
      width: isTablet ? 28 : 24,
      height: isTablet ? 28 : 24,
      tintColor: theme.iconColor,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginHorizontal: isTablet ? 40 : 20,
      marginVertical: isTablet ? 15 : 10,
    },
    primaryButton: {
      flex: 1,
      backgroundColor: theme.primaryAction,
      paddingVertical: isTablet ? 12 : 8,
      borderRadius: isTablet ? 10 : 8,
      height: isTablet ? 45 : 35,
      alignItems: 'center',
      marginHorizontal: 5,
      elevation: theme.elevation / 2,
      shadowColor: theme.bottomNavShadowColor,
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    buttonTextPrimary: {
      color: theme.primaryActionText,
      fontWeight: '600',
      fontSize: baseFontSize - 2,
    },
    lastUpdatedText: {
      textAlign: 'center',
      fontSize: 12,
      color: theme.textMuted,
      marginBottom: 20,
    },
    contentParagraph: {
      marginHorizontal: horizontalMargin,
      fontSize: baseFontSize - 1,
      lineHeight: isTablet ? 26 : 22,
      color: theme.textSecondary,
      marginBottom: isTablet ? 15 : 10,
    },
    contentHeader: {
      marginHorizontal: 0,
      marginTop: 0,
      marginBottom: isTablet ? 16 : 12,
      fontSize: titleFontSize,
      fontWeight: '600',
    },
    listItem: {
      marginHorizontal: isTablet ? 25 : 20,
      fontSize: baseFontSize,
      lineHeight: isTablet ? 26 : 22,
      color: theme.textSecondary,
    },
    boldText: {
      fontSize: baseFontSize,
      fontWeight: '600',
      color: theme.textPrimary,
    },
    emphasisTexts: {
      fontWeight: '800',
      color: theme.textPrimary,
    },
    linkButton: {
      alignSelf: 'flex-end',
      marginHorizontal: horizontalMargin,
      marginTop: isTablet ? 15 : 10,
      marginBottom: isTablet ? 30 : 20,
    },
    linkText: {
      color: theme.linkColor,
      textDecorationLine: 'underline',
      fontSize: baseFontSize - 1,
      fontWeight: '500',
    },

    modalOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.overlayBackground,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modalView: {
      backgroundColor: theme.modalBackground,
      borderRadius: 12,
      padding: 20,
      width: '80%',
      maxWidth: 380,
      alignItems: 'center',
      elevation: 10,
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginBottom: 10,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.primaryAction,
      flex: 1,
    },
    modalCloseButton: {
      padding: 5,
    },
    modalCloseIcon: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.textSecondaryModal,
    },
    radioGroupTitle: {
      fontSize: 16,
      color: theme.textSecondaryModal,
      marginBottom: 20,
      alignSelf: 'flex-start',
      textAlign: 'center',
    },
    radioGroupContainer: {
      width: '100%',
      marginBottom: 25,
    },
    radioButtonRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
    },
    radioButtonOuter: {
      height: 24,
      width: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: theme.radioButtonBorder,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    radioButtonInner: {
      height: 12,
      width: 12,
      borderRadius: 6,
      backgroundColor: theme.radioButtonSelectedBackground,
    },
    radioButtonLabel: {
      fontSize: 15,
      color: theme.textPrimary,
    },
    modalButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 10,
    },
    modalButtonContainers: {
      flexDirection: 'row',
      width: '100%',
      gap: 10,
      marginTop: 10,
      justifyContent: 'center',
    },
    modalButton: {
      borderRadius: 8,
      paddingVertical: 12,
      alignItems: 'center',
      flex: 1,
      marginHorizontal: 5,
      elevation: 2,
      shadowColor: theme.bottomNavShadowColor,
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.05,
      shadowRadius: 1,
    },
    modalButtonText: {
      fontWeight: 'bold',
      fontSize: 15,
    },
    disabledButton: {
      backgroundColor: 'gray',
      opacity: 0.6
    },
    // ...existing code...
    modalLikeContainer: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
    modalContent: { backgroundColor: theme.cardBackground, borderRadius: 10, padding: 20, width: '90%', maxWidth: 380 },
    modalContentMainDiv: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 0 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', color: theme.linkColor },
    modalContentClose: { fontSize: 16, fontWeight: 'bold', color: theme.textMutedClose },
    borderLine: { borderBottomWidth: 1, borderBottomColor: theme.borderColorD, marginVertical: 10 },
    modalText: { fontSize: 16, textAlign: 'center', marginBottom: 20, color: theme.textPrimaryModal },
    modalButtons: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
    modalButton: { backgroundColor: theme.primaryAction, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, width: '45%', alignItems: 'center' },
    modalButtonText: { color: theme.cardBackground, fontSize: 15, fontWeight: 'bold' },
    disabledButton: { backgroundColor: theme.textMuted },
    image: { width: Math.max(150, windowWidth - 40), height: 200, borderRadius: 5, alignSelf: 'center' },
    thumbnailWrapper: { width: Math.max(120, windowWidth - 70), height: 180, alignItems: 'center', justifyContent: 'center', position: 'relative' },
    pulseShadow: { position: 'absolute', width: 80, height: 80, borderRadius: 40, left: '50%', top: '50%', zIndex: 2 },
    playButtonContainer: { position: 'absolute', left: '50%', top: '50%', zIndex: 3, transform: [{ translateX: -30 }, { translateY: -30 }] },
    playButtonCircle: { width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center', elevation: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4 },
    playButtonText: { color: '#1e90ff', fontSize: 26, marginLeft: 3, fontWeight: '600', marginBottom: 5, marginTop: isTablet ? 3 : 3 },
    fullPageLoader: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', alignItems: 'center', zIndex: 9999 },
  });
};
export default ReferAndEarn;