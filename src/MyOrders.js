import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
  StatusBar,
  useColorScheme,
  Alert,
  Linking,
} from 'react-native';
import { format } from 'date-fns';
import getOrderByUserId from './services/GetOrder';
import AsyncStorage from '@react-native-async-storage/async-storage';

const lightThemeColors = {
  screenBackground: '#dfe6ff',
  cardBackground: '#ffffff',
  cardBorder: 'transparent',
  textPrimary: '#000000',
  textSecondary: '#333333',
  inputBackground: '#ffffff',
  inputBorderColor: '#ced4da',
  inputText: '#333333',
  inputPlaceholderText: '#999999',
  buttonBackground: 'rgba(20, 52, 164, 1)',
  buttonTextColor: '#ffffff',
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
  textSecondary: '#B0B0B0',
  inputBackground: '#2C2C2C',
  inputBorderColor: '#4A4A4A',
  inputText: '#E0E0E0',
  inputPlaceholderText: '#777777',
  buttonBackground: 'rgba(30, 62, 174, 1)',
  buttonTextColor: '#FFFFFF',
  shadowColor: '#000000',
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 0,
  statusBarContent: 'light-content',
};

const createMyOrdersStyles = (theme) => StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
    backgroundColor: theme.screenBackground,
  },
  container: {
    flex: 1,
    backgroundColor: theme.screenBackground,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },

  headerRow: {
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.textPrimary,
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: theme.textSecondary,
    marginBottom: 12,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 44,
    backgroundColor: theme.inputBackground,
    borderColor: theme.inputBorderColor,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    color: theme.inputText,
    marginRight: 10,
  },

  ordersList: {
    paddingHorizontal: 15,
  },
  orderCard: {
    backgroundColor: theme.cardBackground,
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    elevation: theme.elevation,
    shadowColor: theme.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: theme.shadowOpacity,
    shadowRadius: theme.shadowRadius,
    borderColor: theme.cardBorder,
    borderWidth: Platform.OS === 'android' && theme.elevation === 0 ? 1 : 0,
  },
  orderHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderIdText: {
    fontWeight: '700',
    color: theme.textPrimary,
  },
  placedDateText: {
    color: theme.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 18,
  },
  statusText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.inputBorderColor,
  },
  productImage: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: '#e9eef8',
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontWeight: '600',
    color: theme.textPrimary,
  },
  productQty: {
    color: theme.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  productPrice: {
    fontWeight: '700',
    color: theme.textPrimary,
  },
  orderFooter: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  invoiceText: {
    color: theme.textSecondary,
    flex: 1,
    marginRight: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    flexShrink: 0,
    marginTop: 6,
  },
  ghostButton: {
    backgroundColor: '#6c757d',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  primaryButton: {
    backgroundColor: theme.buttonBackground,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  ghostButtonText: { color: '#fff', fontWeight: '700' },
  primaryButtonText: { color: theme.buttonTextColor, fontWeight: '700' },
});

const MyOrders = ({ navigation, route }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkThemeColors : lightThemeColors;
  const styles = createMyOrdersStyles(theme);
  const [query, setQuery] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  useEffect(() => {
    async function loadOrders() {
      setLoading(true);
      setError(null);
      try {
        let userId = (route && route.params && route.params.userId) || null;
        if (!userId) {
          try {
            const stored = await AsyncStorage.getItem('userId');
            if (stored) userId = stored;
          } catch (asErr) {
            console.warn('Failed to read userId from AsyncStorage', asErr);
          }
        }

        if (!userId) {
          setError('User not signed in');
          setOrders([]);
          setLoading(false);
          return;
        }

        const data = await getOrderByUserId(userId);
        const paymentsArray = Array.isArray(data) ? data : (data && data.data && Array.isArray(data.data) ? data.data : []);
        if (paymentsArray.length === 0) {
          setOrders([]);
        } else {
          const mapped = paymentsArray.map(p => {
            const amount = Number(p.paidAmount ?? p.amount ?? 0);
            const orderDateRaw = p.orderDate ?? p.paidDate ?? null;
            const displayText = (p.paymentStatus || 'Unknown');
            const statusLower = String(displayText).toLowerCase();
            const statusColor = statusLower === 'paid' || statusLower === 'delivered' ? '#2dbb6e' : (statusLower === 'pending' ? '#ffc107' : '#6c757d');


            return {
              id: p.orderID ? String(p.orderID) : (p.referenceId || p.razorpayOrderId || Math.random().toString(36).slice(2, 9)),
              referenceId: p.referenceId || null,
              paymentId: p.razorpayPaymentId || null,
              paymentMethod: p.paymentMethod || null,
              amount,
              orderDateRaw,
              placedOn: orderDateRaw ? new Date(orderDateRaw) : new Date(),
              displayText,
              statusColor,

              raw: p,
            };
          });
          setOrders(mapped);
        }
      } catch (e) {
        setError(e.message || 'Failed to load orders');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, [route]);

  useEffect(() => {
    const backAction = () => {
      if (navigation && typeof navigation.canGoBack === 'function' && navigation.canGoBack()) {
        navigation.goBack();
        return true;
      }
      if (route && route.params && route.params.origin) {
        navigation.navigate(route.params.origin);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [navigation]);


  const OrderCard = ({ order }) => {
    let total = 0;
    if (order.amount != null) {
      total = Number(order.amount);
    } else if (order.items && Array.isArray(order.items) && order.items.length > 0) {
      total = order.items.reduce((s, it) => s + (Number(it.price || 0) * Number(it.qty || 0)), 0);
    }

    const orderDate = order.orderDateRaw ? format(new Date(order.orderDateRaw), 'dd MMM yyyy') : format(order.placedOn, 'dd MMM yyyy');

    return (
      <View style={styles.orderCard}>
        <View style={styles.orderHeaderRow}>
          <View>
            <Text style={styles.orderIdText}>Order ID: #{order.referenceId || order.id}</Text>
            <Text style={styles.placedDateText}>Placed on: {orderDate}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: order.statusColor || '#6c757d' }]}>
            <Text style={styles.statusText}>{order.displayText}</Text>
          </View>
        </View>

        <View style={styles.productRow}>
          <Image source={require('../img/loginlogo.png')} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>Payment ID: {order.paymentId || 'N/A'}</Text>
            <Text style={styles.productQty}>Method: {order.paymentMethod || 'N/A'}</Text>
          </View>
          <Text style={styles.productPrice}>₹{(total).toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
        </View>

        <View style={styles.orderFooter}>
          <Text style={styles.invoiceText}>Order Total: ₹{(total).toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
          <View style={styles.actionsRow}>

            <TouchableOpacity style={styles.ghostButton} onPress={async () => {
              try {
                const baseUrl = 'https://allrounderbaby.com/MyProfile/InvoiceView';

                let userId = (route && route.params && route.params.userId) || (order.raw && order.raw.userId) || null;

                if (!userId) {
                  try {
                    const stored = await AsyncStorage.getItem('userId');
                    if (stored) userId = stored;
                  } catch (asErr) {
                    console.warn('Failed to read userId from AsyncStorage', asErr);
                  }
                }

                console.log('Opening invoice with userId:', userId);

                try {
                  const headers = { 'Content-Type': 'application/json' };

                  await fetch(baseUrl, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({ userId }),
                  });

                } catch (postErr) {
                  console.warn('Failed to POST token+userId to server', postErr);
                }

                const urlToOpen = userId
                  ? `${baseUrl}?userId=${encodeURIComponent(userId)}`
                  : baseUrl;

                const canOpen = await Linking.canOpenURL(urlToOpen);

                if (canOpen) {
                  await Linking.openURL(urlToOpen);
                } else {
                  Alert.alert('Invoice', 'Cannot open invoice URL');
                }

              } catch (err) {
                Alert.alert('Error', 'Unable to open invoice');
              }
            }}>
              <Text style={styles.ghostButtonText}>View Invoice</Text>
            </TouchableOpacity>

            {order.displayText && order.displayText.toLowerCase() === 'delivered' && (
              <TouchableOpacity style={styles.primaryButton} onPress={() => { /* leave review */ }}>
                <Text style={styles.primaryButtonText}>Leave a Review</Text>
              </TouchableOpacity>
            )}
            {order.displayText && order.displayText.toLowerCase() === 'shipped' && (
              <TouchableOpacity style={styles.primaryButton} onPress={() => { /* track order */ }}>
                <Text style={styles.primaryButtonText}>Track Order</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoidingContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#1434A4" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={[{ paddingLeft: 8, paddingRight: 7 }]}>
            <View style={styles.headerRow}>
              <Text style={styles.sectionTitle}>My Orders</Text>
            </View>

            <View style={styles.searchRow}>
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search by Order ID or Product Name..."
                placeholderTextColor={theme.inputPlaceholderText}
                style={styles.searchInput}
              />

            </View>

            <View style={styles.ordersList}>
              {loading && <Text style={{ color: theme.textSecondary, marginBottom: 8 }}>Loading orders...</Text>}

              {!loading && orders.length === 0 && (
                <View style={styles.orderCard}>
                  <View style={{ alignItems: 'center', paddingVertical: 40 }}>
                    <Image source={{ uri: 'https://img.icons8.com/ios-glyphs/90/000000/box.png' }} style={{ width: 64, height: 64, marginBottom: 12, tintColor: theme.textSecondary }} />
                    <Text style={{ color: theme.textSecondary }}>No orders found</Text>
                  </View>
                </View>
              )}

              {!loading && orders.length > 0 && orders.filter(o => {
                if (!query) return true;
                const q = query.toLowerCase();
                if ((o.id || '').toLowerCase().includes(q)) return true;
                return o.items.some(i => (i.name || '').toLowerCase().includes(q));
              }).map(o => (
                <OrderCard key={o.id} order={o} />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MyOrders;
