import React, { Fragment, ReactNode, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// import Animations from '@/components/animations';

// const Animations = dynamic(() => import('@/components/Animations'));

interface APIFetchProps {
    children: ReactNode;
    isLoading?: boolean | number | null;
    lengthCheckObject?: {};
    messageContent?: any;
    notLengthCheckObject?: boolean;
    animatedLoading?: string;
    blocks?: number;
}

export const APIFetch: React.FC<APIFetchProps> = ({ children, isLoading = false, animatedLoading = '', lengthCheckObject = {}, notLengthCheckObject = false, messageContent = '', blocks }) => {

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true)
    }, []);


    if ((isClient) && (!isLoading)) {
        console.log('isClient', isClient)
        if (validateData(lengthCheckObject || '') || notLengthCheckObject) {
            return children ?? <> </>
        } else {
            console.log('isClient', isClient)
            return (
                <>
                    {messageContent !== '' && <div className='flex justify-center mb-4 text-error '>{messageContent}</div>}
                </>
            )
        }
    } else {
        return (
            <Fragment>
                {/* {animatedLoading !== '' &&
                    <Animations
                        animation={animatedLoading}
                        blocks={blocks}
                    />
                    || */}
                <div className='flex justify-center my-14 md:my-28'>
                    <Box >
                        <CircularProgress />
                    </Box>
                </div>
                {/* } */}
            </Fragment>

        )
    }
};

export const validateData = (
    objectApi: any
) => {
    if ((objectApi) && (objectApi.length > 0)) {
        return true;
    } else {
        false;
    }
}