import Image from 'next/image'
import React from 'react'

const AuthLayout = ({ children }) => {
    return (
        <main className='bg-main-bg h-screen bg-no-repeat bg-cover flex items-center justify-center'>
            <div className='container flex lg:justify-between justify-center sm:px-24 p-2 items-center'>
                <Image src="/image/main/logo.png" width={400} height={100} alt='cheeky logo' className='h-[5rem] lg:flex hidden' />
                <aside className='sm:w-auto w-full'>
                    {children}
                </aside>
            </div>
        </main>
    )
}

export default AuthLayout
