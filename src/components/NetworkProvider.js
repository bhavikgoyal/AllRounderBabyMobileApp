import React, { createContext, useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import NoInternetModal from './NoInternetModal';

export const NetworkContext = createContext({ isConnected: true });

const NetworkProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(!!state.isConnected && state.isInternetReachable !== false);
        });
        // fetch initial state
        NetInfo.fetch().then(state => setIsConnected(!!state.isConnected && state.isInternetReachable !== false));
        return () => unsubscribe();
    }, []);

    return (
        <NetworkContext.Provider value={{ isConnected }}>
            {children}
            <NoInternetModal visible={!isConnected} />
        </NetworkContext.Provider>
    );
};

export default NetworkProvider;
