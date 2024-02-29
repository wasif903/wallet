"use client"
import Button from '@/components/button/Button'
import Field from '@/components/inputFIeld/Field'
import AuthLayout from '@/layout/AuthLayout'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
    const router = useRouter()
    return (
        <AuthLayout>
            <div className='border-2 border-white sm:px-8
            px-2 xl:py-16 py-8 flex flex-col items-center gap-16 rounded-xl text-white-color xl:w-[30rem] sm:w-[25rem] w-auto'>
                <h2 className='text-center'>Sign In to your Account</h2>
                <div className='flex flex-col gap-12 w-full' >
                    <div className='flex flex-col gap-8 '>
                        <Field type='email' placeHolder="Enter your Email" />
                        <Field type='password' placeHolder="Enter your Password" />
                        <span className='text-end '>
                            <p className='cursor-pointer'>Forgot Password?</p>
                        </span>
                    </div>
                    <span className='flex items-center w-full justify-center'>
                        <Button name={"Sign In"} style={{ width: "10rem", border: "2px solid" }} />
                    </span>
                </div>
                <span className='flex gap-1'>
                    <p>Don’t have an account?</p>
                    <p className='font-semibold cursor-pointer' onClick={() => router.push("/sign-up")}>Sign Up</p>
                </span>
            </div>
        </AuthLayout>
    )
}

export default page
