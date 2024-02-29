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
            px-2 xl:py-12 py-8 flex flex-col items-center gap-8 rounded-xl text-white-color xl:w-[30rem] sm:w-[25rem] w-auto'>
                <h2 className='text-center'>Sign Up to your Account</h2>
                <div className='flex flex-col gap-8 w-full' >
                    <div className='flex gap-4 items-center justify-center'>
                        <span className='flex gap-2'>
                            <Field
                                type='radio'
                            />
                            <p>User</p>
                        </span>
                        <span className='flex gap-2'>
                            <Field
                                type='radio'
                            />
                            <p>Influencer</p>
                        </span>
                    </div>
                    <div className='flex flex-col gap-4 '>
                        <Field type='email' placeHolder="Email" />
                        <Field type='text' placeHolder="Full Name" />
                        <Field type='password' placeHolder="Password" />
                        <Field type='password' placeHolder="Re-Enter Password" />
                    </div>
                    <span className='flex items-center w-full justify-center'>
                        <Button name={"Sign Up"} style={{ width: "10rem", border: "2px solid" }} />
                    </span>
                </div>
                <span className='flex gap-1'>
                    <p>Already have an account?</p>
                    <p className='font-semibold cursor-pointer' onClick={() => router.push("/sign-up")}>Sign Up</p>
                </span>
            </div>
        </AuthLayout>
    )
}

export default page
