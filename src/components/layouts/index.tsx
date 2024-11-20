import React from 'react'
import NavBar from './nav-bar'
import Footer from './footer'
type LayoutProps = {
    children: React.ReactNode;
    hostName: string | null
};
const Layout = ({ children, hostName }: LayoutProps) => {

    return (
        <>
            <NavBar hostName={hostName} />
            <div className='font-philosopher'>
                {children}
            </div>
            <Footer hostName={hostName} />
        </>
    )
}

export default Layout