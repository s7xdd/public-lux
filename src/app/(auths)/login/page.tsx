import React from 'react';
import { headers } from 'next/headers';
import Login from '@/shared-pages/login';

export default async function LoginPage() {
    const headersList = await headers();
    return <Login hostName={headersList.get('host')} />;
}
