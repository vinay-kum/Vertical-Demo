import React, { createContext, useState, useEffect } from 'react';

/**
 * This provider is created
 * to access user in whole app
 */

export const CommonContext = createContext({});

export const CommonProvider = ({ children }) => {
    const [siteConfig, setSiteConfig] = useState({})
    const [cart, setCart] = useState([]);
    const channelToken = '41f7b32b574842808042fafe53ca1ed4'

    useEffect(() => {
        
    }, [])

    return (
        <CommonContext.Provider
            value={{
                siteConfig, setSiteConfig,
                cart, setCart,
                channelToken
            }}
        >
            {children}
        </CommonContext.Provider>
    );
};