import React, { useEffect, useState, useRef, useCallback, useMemo, } from "react";
import { StyleSheet, Text, View, BackHandler, Alert, StatusBar, Platform, useWindowDimensions, TouchableOpacity, TouchableWithoutFeedback, Image, } from "react-native";
import Orientation from 'react-native-orientation-locker';
import { VdoPlayerView } from "vdocipher-rn-bridge";
import { useRoute, useNavigation, useFocusEffect, } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "./config/api";

const VideoPlayerScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const playerRef = useRef(null);
  const skipImmediateCleanupRef = useRef(false);
  const delayedCleanupTimerRef = useRef(null);
  const progressSentRef = useRef(false);
  const finishedSentRef = useRef(false);
  const maxWatchedTimeRef = useRef(0);
  const {
    VideoId,
    annotate,
    total_time,
    language,
    step,
    cameFrom,
    stage_name,
    displayStep,
    hideFullscreenButton = false,
  } = route.params || {};
  const videoId = VideoId;
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const isLandscape = screenWidth > screenHeight;
  const playerHeight = isLandscape ? screenHeight : Math.round((screenWidth * 9) / 16);
  const [credentials, setCredentials] = useState({
    otp: null,
    playbackInfo: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const currentTimeRef = useRef(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const progressBarWidthRef = useRef(0);
  const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2];
  const formatTime = useCallback((sec) => {
    const s = Number(sec) || 0;
    const mm = Math.floor(s / 60);
    const ss = Math.floor(s % 60);
    return `${mm}:${ss.toString().padStart(2, '0')}`;
  }, []);
  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);
  const seekToMs = useCallback((targetSec) => {
    if (!playerRef.current) return;
    const clamped = duration > 0
      ? Math.max(0, Math.min(duration, targetSec))
      : Math.max(0, targetSec);
    try {
      playerRef.current.seek(Math.floor(clamped * 1000));
      setCurrentTime(clamped);
      currentTimeRef.current = clamped;
    } catch (e) {
      console.log('seek error', e?.message);
    }
  }, [duration]);
  const seekToPercent = useCallback((percent) => {
    if (!duration) return;
    seekToMs(Math.floor(duration * Math.max(0, Math.min(1, percent))));
  }, [duration, seekToMs]);
  const seekRelative = useCallback((deltaSec) => {
    seekToMs(currentTimeRef.current + deltaSec);
  }, [seekToMs]);
  const toggleFullscreen = useCallback(() => {
    try {
      if (isLandscape) {
        Orientation.lockToPortrait();
      } else {
        Orientation.lockToLandscape();
      }
      setTimeout(() => {
        try { Orientation.unlockAllOrientations(); } catch (e) { }
      }, 500);
    } catch (e) {
      console.log('toggleFullscreen error', e?.message);
    }
  }, [isLandscape]);
  const fetchVideoCredentials = useCallback(async () => {
    if (!videoId) return;
    try {
      setIsLoading(true);
      setError(null);
      const [userId, token] = await Promise.all([
        AsyncStorage.getItem("userId"),
        AsyncStorage.getItem("token"),
      ]);
      const response = await fetch(
        `${BASE_URL}Vdocipher/GetVideosFromVDOCipher_VideoId`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : undefined,
          },
          body: JSON.stringify({
            UserId: userId ? parseInt(userId, 10) : null,
            VideoId: videoId,
            annotate: annotate || JSON.stringify({}),
          }),
        }
      );
      if (!response.ok)
        throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (!data?.otp || !data?.playbackInfo)
        throw new Error("Invalid video credentials");
      setCredentials({
        otp: data.otp,
        playbackInfo:
          Platform.OS === "android" &&
            typeof data.playbackInfo !== "string"
            ? JSON.stringify(data.playbackInfo)
            : data.playbackInfo,
      });
    } catch (err) {
      setError({ message: err.message });
    } finally {
      setIsLoading(false);
    }
  }, [videoId]);
  const toSeconds = useCallback((val) => {
    if (val == null) return 0;
    const n = Number(val);
    if (Number.isNaN(n)) return 0;
    return n < 0 ? 0 : Math.floor(n);
  }, []);
  useEffect(() => {
    if (videoId) {
      progressSentRef.current = false;
      finishedSentRef.current = false;
      maxWatchedTimeRef.current = 0;
      setCurrentTime(0);
      currentTimeRef.current = 0;
      setDuration(0);
      setPlaybackSpeed(1);
      setIsPlaying(true);
      setVideoCompleted(false);
      setIsLocked(false);
      setShowControls(true);
      setShowSpeedMenu(false);
      setIsFullscreen(false);
      fetchVideoCredentials();
    }
  }, [videoId, fetchVideoCredentials]);
  useEffect(() => {
    return () => {
      try {
        if (playerRef.current) {
          playerRef.current.stop?.();
          playerRef.current.release?.();
          playerRef.current = null;
        }
      } catch (e) {
      }
    };
  }, []);
  useEffect(() => {
    try {
      Orientation.unlockAllOrientations();
    } catch (e) {
    }
    return () => {
      try {
        Orientation.lockToPortrait();
      } catch (e) {
      }
    };
  }, []);
  useEffect(() => {
    navigation.setOptions({ headerShown: !isLandscape });
    StatusBar.setHidden(isLandscape || isFullscreen);
  }, [isLandscape, isFullscreen, navigation]);
  useFocusEffect(
    useCallback(() => {
      try { Orientation.unlockAllOrientations(); } catch (e) { }
      setIsFullscreen(false);
      setError(null);
      setCredentials({ otp: null, playbackInfo: null });
      progressSentRef.current = false;
      finishedSentRef.current = false;
      if (videoId) {
        fetchVideoCredentials();
      }
      const sub = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBack
      );
      return () => {
        sub.remove();
        setIsFullscreen(false);
        setError(null);
        setCredentials({ otp: null, playbackInfo: null });
        progressSentRef.current = false;
        finishedSentRef.current = false;
      };
    }, [videoId, fetchVideoCredentials, handleBack])
  );
  const updateProgress = useCallback(
    async (isFinished = false, overrideSeconds = null) => {
      if (!videoId) return;
      try {
        const [userId, token, deviceKey] = await Promise.all([
          AsyncStorage.getItem("userId"),
          AsyncStorage.getItem("token"),
          AsyncStorage.getItem("deviceKey"),
        ]);
        const userIdInt = userId ? parseInt(userId, 10) : null;
        const sendSecs = overrideSeconds != null
          ? Math.floor(overrideSeconds)
          : Math.floor(currentTimeRef.current);
        const finishedThreshold = total_time ? Math.ceil(toSeconds(total_time) * 0.8) : sendSecs;
        const finished = sendSecs >= finishedThreshold ? 1 : 0;
        const payload = {
          User_id: userIdInt,
          video_id: videoId,
          last_watched_timestamp_seconds: sendSecs,
          Language: language,
          is_finished: finished,
          level_step: step,
          total_views: 1,
          total_time: toSeconds(total_time),
          playback: "fgdfg",
          otp: "dsg",
          stage_name: `${stage_name || ""} ${displayStep ?? step}`.trim(),
          DeviceKey: deviceKey,
        };
        const headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
        };

        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        const response = await fetch(`${BASE_URL}User/User_Video_Data`, {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        console.log("Progress update response:", data);

      } catch (error) {
      }
    },
    [videoId, currentTime, language, step, stage_name, displayStep, total_time]
  );
  const handleBack = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.stop?.();
      playerRef.current.release?.();
    }

    updateProgress().catch(() => { });
    try { Orientation.lockToPortrait(); } catch (e) { }

    if (cameFrom === "Dashboard") {
      navigation.navigate("Home");
    } else if (cameFrom) {
      navigation.navigate(cameFrom);
    } else {
      navigation.goBack();
    }

    return true;
  }, [navigation, cameFrom, updateProgress]);

  if (isLoading || !credentials?.otp) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "#fff" }}>Loading video...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          {error.message || "Unable to load video"}
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" hidden={isLandscape} />
      <View style={{ width: "100%", height: playerHeight, position: 'relative' }}>
        <VdoPlayerView
          key={videoId}
          ref={playerRef}
          showNativeControls={false}
          playWhenReady={isPlaying}
          pointerEvents="none"
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#000" }}
          embedInfo={{
            otp: credentials.otp,
            playbackInfo: credentials.playbackInfo,
          }}
          playbackSpeed={playbackSpeed}
          onLoaded={(e) => {
            if (e?.mediaInfo?.duration > 0) {
              setDuration(Math.floor(e.mediaInfo.duration / 1000));
            }
          }}
          onPlayerStateChanged={(e) => {
            if (e?.playerState === 'ended') {
              setIsPlaying(false);
            }
          }}
          onProgress={(p) => {
            if (p && typeof p.currentTime === "number") {
              const secs = Math.floor(p.currentTime / 1000);
              setCurrentTime(secs);
              currentTimeRef.current = secs;
            }
          }}
          onMediaEnded={async () => {
            setVideoCompleted(true);
            try { await updateProgress(true); } catch (e) { }
            try { Orientation.lockToPortrait(); } catch (e) { }
            try {
              playerRef.current?.stop?.();
              playerRef.current?.release?.();
            } catch (e) { }
            try {
              if (cameFrom === "Dashboard") {
                navigation.navigate("Home");
              } else if (cameFrom) {
                navigation.navigate(cameFrom);
              } else {
                navigation.navigate("PreviewHome");
              }
            } catch (e) { }
          }}
          onFullscreenChange={(isFull) => { setIsFullscreen(isFull); }}
          onInitializationFailure={(e) => {
            Alert.alert("Playback Error", e?.errorDescription || "Video failed to load");
          }}
        />
        <TouchableWithoutFeedback onPress={() => { if (!isLocked) setShowControls((s) => !s); }}>
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
        </TouchableWithoutFeedback>
        {isLocked ? (
          <View style={styles.lockedOverlay} pointerEvents="box-none">
            <TouchableOpacity
              style={styles.lockButton}
              activeOpacity={0.7}
              onPress={() => setIsLocked(false)}
            >
              <Image source={require('../img/Unlock_01.png')} style={styles.lockIconOpen} />
            </TouchableOpacity>
          </View>
        ) : null}
        {showControls && !isLocked ? (
          <View style={styles.overlay} pointerEvents="box-none">
            <View style={styles.topBar}>
              <TouchableOpacity
                style={styles.speedBadge}
                activeOpacity={0.7}
                onPress={() => setShowSpeedMenu((s) => !s)}>
                <Text style={styles.speedText}>{playbackSpeed}x</Text>
              </TouchableOpacity>
              {showSpeedMenu && (
                <View style={styles.speedMenu}>
                  {SPEED_OPTIONS.map((speed) => (
                    <TouchableOpacity
                      key={speed}
                      style={[styles.speedOption, playbackSpeed === speed && styles.speedOptionActive]}
                      onPress={() => { setPlaybackSpeed(speed); setShowSpeedMenu(false); }}
                      activeOpacity={0.7}>
                      <Text style={[styles.speedOptionText, playbackSpeed === speed && styles.speedOptionTextActive]}>
                        {speed}x
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            <View style={styles.centerRow}>
              <View style={styles.lockedOverlay}>
                <TouchableOpacity
                  style={styles.lockButton}
                  activeOpacity={0.7}
                  onPress={() => { setIsLocked(true); setShowControls(false); }}
                >
                  <Image source={require('../img/Lock_01.png')} style={styles.lockIcon} />
                </TouchableOpacity>
              </View>
              <View style={styles.centerControls}>
                <TouchableOpacity onPress={() => seekRelative(-10)} style={styles.seekButton} activeOpacity={0.7}>
                  <Text style={styles.seekArrow}>↺</Text>
                  <Text style={styles.seekLabel}>10</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={togglePlayPause} style={styles.playButton} activeOpacity={0.7}>
                  <Text style={styles.playIcon}>{isPlaying ? '❚❚' : '▶'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => seekRelative(10)} style={styles.seekButton} activeOpacity={0.7}>
                  <Text style={styles.seekArrow}>↻</Text>
                  <Text style={styles.seekLabel}>10</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <View style={styles.bottomBars}>
                <Text style={styles.timeText}>{formatTime(currentTime)} / {formatTime(duration)}</Text>
                <TouchableOpacity onPress={toggleFullscreen} style={styles.fullscreenButton} activeOpacity={0.7}>
                  <Text style={styles.fullscreenIcon}>{isLandscape ? '⛶' : '⛶'}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.bottomBar}>
                <View
                  style={styles.progressWrapper}
                  onLayout={(e) => { progressBarWidthRef.current = e.nativeEvent.layout.width; }}
                  onStartShouldSetResponder={() => true}
                  onMoveShouldSetResponder={() => true}
                  onResponderGrant={(e) => {
                    const x = Math.max(0, e.nativeEvent.locationX);
                    const w = progressBarWidthRef.current || 1;
                    seekToPercent(Math.min(1, x / w));
                  }}
                  onResponderMove={(e) => {
                    const x = Math.max(0, e.nativeEvent.locationX);
                    const w = progressBarWidthRef.current || 1;
                    seekToPercent(Math.min(1, x / w));
                  }}>
                  <View style={styles.progressTrack}>
                    <View style={[styles.progressFill, {
                      width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%',
                    }]} />
                  </View>
                  <View style={[styles.progressThumb, {
                    left: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%',
                  }]} />
                </View>
              </View>
            </View>
          </View>
        ) : null}
      </View>
    </View >
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  errorText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  fullscreenBlocker: { display: 'none' },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  speedBadge: {
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  speedText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  speedMenu: {
    position: 'absolute',
    top: 32,
    left: 12,
    backgroundColor: 'rgba(0,0,0,0.85)',
    borderRadius: 6,
    paddingVertical: 4,
    zIndex: 100,
    minWidth: 70,
  },
  speedOption: {
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  speedOptionActive: {
    backgroundColor: 'rgba(97,162,162,0.35)',
  },
  speedOptionText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
  speedOptionTextActive: {
    color: 'rgba(97,162,162,1)',
    fontWeight: '700',
  },
  centerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  lockIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor: 'white',
  },
  lockIconOpen: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor: 'white',
  },
  lockButton: {
    padding: 8,
  },
  centerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
  },
  seekButton: {
    alignItems: 'center',
    padding: 10,
  },
  seekArrow: {
    color: '#fff',
    fontSize: 30,
    lineHeight: 32,
  },
  seekLabel: {
    color: '#fff',
    fontSize: 11,
    marginTop: -2,
    fontWeight: '600',
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    color: '#fff',
    fontSize: 35,
    textAlign: 'center',
    includeFontPadding: false,
  },
  bottomBar: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 10,
    gap: 8,
  },
  bottomBars: {
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    gap: 8,
  },
  timeText: {
    color: '#fff',
    fontSize: 11,
    marginLeft: 8,
    fontWeight: '500',
  },
  progressWrapper: {
    flex: 1,
    height: 20,
    justifyContent: 'center',
  },
  progressTrack: {
    width: '100%',
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: 3,
    backgroundColor: 'rgba(97, 162, 162, 1)',
    borderRadius: 2,
  },
  progressThumb: {
    position: 'absolute',
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: 'rgba(97, 162, 162, 1)',
    top: '50%',
    marginTop: -6,
    marginLeft: -6,
  },
  fullscreenButton: {
    padding: 3,
  },
  fullscreenIcon: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginRight: 6,
  },
});
export default VideoPlayerScreen;