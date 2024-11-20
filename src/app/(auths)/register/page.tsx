import React from 'react';
import { headers } from 'next/headers';
import Register from '@/shared-pages/register';


export default async function LoginPage() {
    const headersList = await headers();
    return <Register hostName={headersList.get('host')} />;
}
