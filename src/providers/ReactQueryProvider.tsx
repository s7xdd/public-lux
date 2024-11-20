'use client';

import React, { FC, lazy, ReactNode, Suspense, useEffect, useState } from 'react';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const ReactQueryDevtoolsProduction = lazy(() =>
    import('@tanstack/react-query-devtools/build/modern/production.js').then(
        (d) => ({
            default: d.ReactQueryDevtools,
        }),
    ),
)
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            select: (data: any) => {
                return data;
            },
            retry: 0,
        },
    },
});

interface ReactQueryProviderProps {
    children: ReactNode;
}

const ReactQueryProvider: FC<ReactQueryProviderProps> = ({ children }) => {
    const [showChild, setShowChild] = useState(false)

    useEffect(() => {
        setShowChild(true)
      }, [])
    
      if (!showChild) {
        return null
      }

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    
        </QueryClientProvider>
    );
}

export default ReactQueryProvider;