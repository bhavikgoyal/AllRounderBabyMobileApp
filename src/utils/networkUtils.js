import NetInfo from '@react-native-community/netinfo';

export const isConnected = async () => {
  try {
    const state = await NetInfo.fetch();
    return !!state.isConnected && state.isInternetReachable !== false;
  } catch (e) {
    return true;
  }
};

export default { isConnected };
