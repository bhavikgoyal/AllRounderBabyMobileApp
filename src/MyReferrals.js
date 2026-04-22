import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  useColorScheme,
  BackHandler,
  StatusBar,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const lightThemeColors = {
  screenBackground: '#f1f2f2',
  cardBackground: '#ffffff',
  cardBorder: 'transparent',
  textPrimary: '#000000',
  textSecondary: 'gray',
  textPlaceholder: 'gray',
  shadowColor: '#000000',
  shadowOpacity: 0.15,
  shadowRadius: 3,
  elevation: 4,
  statusBarContent: 'dark-content',
};

const darkThemeColors = {
  screenBackground: '#121212',
  cardBackground: '#1E1E1E',
  cardBorder: '#3A3A3A',
  textPrimary: '#E0E0E0',
  textSecondary: '#A0A0A0',
  textPlaceholder: '#888888',
  shadowColor: '#000000',
  shadowOpacity: 0.3,
  shadowRadius: 4,
  elevation: 0,
  statusBarContent: 'light-content',
};

const createMyReferralsStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.screenBackground,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: theme.textPrimary,
  },

  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.textPrimary,
    marginBottom: 3,
  },
  statLabel: {
    fontSize: 12,
    color: theme.textSecondary,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 200,
  },
  placeholderText: {
    fontSize: 16,
    color: theme.textPlaceholder,
    textAlign: 'center',
    lineHeight: 22,
  },
  listContainer: {
  },
  listHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.textPrimary,
    marginBottom: 15,
  },

  statsCard: {
    backgroundColor: theme.cardBackground,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginTop: -3,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: theme.elevation,
    shadowColor: theme.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: theme.shadowOpacity,
    shadowRadius: theme.shadowRadius,
    borderColor: theme.cardBorder,
    borderWidth: Platform.OS === 'android' && theme.elevation === 0 ? 1 : 0,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  statItemm: {
    flex: 1,
    justifyContent: 'center', marginTop: 12,
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  statCaption: {
    fontSize: 12,
    color: theme.textSecondary,
    marginTop: 4,
    textAlign: 'left',
  },
  referralCard: {
    backgroundColor: theme.cardBackground,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: theme.elevation,
    shadowColor: theme.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: theme.shadowOpacity,
    shadowRadius: theme.shadowRadius,
    borderColor: theme.cardBorder,
    borderWidth: Platform.OS === 'android' && theme.elevation === 0 ? 1 : 0,
  },
  referralLeft: {
    flex: 1,
  },
  referralName: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.textPrimary,
    marginBottom: 4,
  },
  referralDate: {
    fontSize: 13,
    color: theme.textSecondary,
  },
  rightColumn: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    overflow: 'hidden',
  },
  badgeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },

});

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const day = ("0" + d.getDate()).slice(-2);
  const month = ("0" + (d.getMonth() + 1)).slice(-2);
  const year = d.getFullYear();
  return `${year}/${month}/${day}`;
};

const MyReferrals = ({ navigation, route }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkThemeColors : lightThemeColors;
  const styles = createMyReferralsStyles(theme);
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(false);
  const { BASE_URL } = require('./config/api');

  const fetchReferrals = async (userId, token) => {
    try {
      setLoading(true);
      const url = `${BASE_URL}ReferralTransaction/ReferralTransactionHistory?userId=${userId}`;
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await fetch(url, { headers });
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      const mapped = data.map(item => ({
        id: String(item.id),
        name: item.fullName || item.referralCodeName || 'Unknown',
        date: item.date ? formatDate(item.date) : '',
        status: item.payoutdone ? 'Completed' : 'Pending',
        earnings: item.currency_Code || '-',
      }));
      setReferrals(mapped);
    } catch (err) {
      console.warn('Failed to fetch referrals', err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const backAction = () => {
      if (navigation && typeof navigation.canGoBack === 'function' && navigation.canGoBack()) {
        navigation.navigate('My Profile');
        return true;
      }
      if (route && route.params && route.params.origin) {
        navigation.navigate(route.params.origin);
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => {
      backHandler.remove();
    };
  }, [navigation]);
  useEffect(() => {
    const routeUserId = route && route.params && route.params.userId ? route.params.userId : null;
    if (routeUserId) {
      fetchReferrals(routeUserId);
      return;
    }
    (async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          fetchReferrals(storedUserId, storedToken);
        } else {
          setReferrals([]);
          setLoading(false);
        }
      } catch (e) {
        console.warn('Error reading AsyncStorage for userId/token', e);
        setReferrals([]);
        setLoading(false);
      }
    })();
  }, [route]);
  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.statusBarContent} backgroundColor={theme.screenBackground} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>My Referrals</Text>
        <View style={styles.statsCard}>
          <View style={styles.statItemm}>
            <Text style={styles.statValue}>{referrals.length}</Text>
            <Text style={[styles.statLabel, { fontWeight: '900', color: '#000000' }]}>Total Referrals</Text>
            <Text style={styles.statCaption}>your referral code used</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{referrals.filter(r => r.status === 'Completed').length}</Text>
            <Text style={[styles.statLabel, { fontWeight: '900', color: '#000000' }]}>Completed</Text>
            <Text style={styles.statCaption}>Payout initiated</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{referrals.filter(r => r.status === 'Pending').length}</Text>
            <Text style={[styles.statLabel, { fontWeight: '900', color: '#000000' }]}>Pending</Text>
            <Text style={styles.statCaption}>Payout pending</Text>
          </View>
        </View>
        <Text style={styles.listHeader}>Referral History</Text>
        <View style={styles.listContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#1434A4" style={{ marginTop: 30 }} />
          ) : referrals.length === 0 ? (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderText}>You haven't referred anyone yet. Share your code to start earning!</Text>
            </View>
          ) : (
            referrals.map(item => (
              <TouchableOpacity key={item.id} activeOpacity={0.8} style={styles.referralCard} onPress={() => { }}>
                <View style={styles.referralLeft}>
                  <Text style={styles.referralName}>{item.name}</Text>
                  <Text style={styles.referralDate}>{item.date}</Text>
                </View>
                <View style={styles.rightColumn}>
                  <View style={[styles.badge, { backgroundColor: item.status === 'Completed' ? '#2ecc71' : '#f39c12' }]}>
                    <Text style={styles.badgeText}>{item.status}</Text>
                  </View>

                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};
export default MyReferrals;