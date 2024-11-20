"use client";

import React, { FC, useEffect } from 'react';
import { Provider } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

// import { getCountrySubDomainFromHostname, getLanguageValueFromSubdomain } from '@/utils/sub-domain';
import { persistor, store } from '@/redux/store';

import { PersistGate } from 'redux-persist/integration/react';
import { getData, storeData } from '@/storage';

interface ReduxProviderProps {
  children: React.ReactNode;
  subdomain: string | null;
}

const ReduxProvider: FC<ReduxProviderProps> = ({ children, subdomain }) => {

  // useEffect(() => {
  //   if (subdomain) {
  //     const subdomainString = getLanguageValueFromSubdomain(subdomain);
  //     if (subdomainString) {
  //       store.dispatch(setLanguage(subdomainString));
  //     }
  //   }

  //   if (getCountrySubDomainFromHostname(subdomain)) {
  //     store.dispatch(setCountry({ currentSubDomain: getCountrySubDomainFromHostname(subdomain) }));
  //   }
  // }, [subdomain]);

  useEffect(() => {
    loadUuID();
  }, [children]);

  const loadUuID = async () => {
    const getuuid = await getData('luxmetallic_uuid');
    if (!getuuid) {
      const uuid = uuidv4();
      storeData('luxmetallic_uuid', uuid);
    }
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

export default ReduxProvider;