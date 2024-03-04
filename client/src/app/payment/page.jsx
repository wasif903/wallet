"use client"
import PaymentElement from '@/components/PaymentElement/PaymentElement';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import React from 'react'


const page = () => {

    const stripePromis = loadStripe(`pk_test_51MtaX3EaztW7P3dwWrLVuJxYN3AxDdkT3lY8TSLQx3NfCB3QLT097SHAWo5PGWhDMQrStZ6591HXadhRhAegyHj500CLjH2QYM`);
    const appearance = {
        theme: 'night',
        labels: 'hidden',
        variables: {
            color: 'grey',
            borderRadius: '50px',
            fontFamily: '--body-font-family: -apple-system, BlinkMacSystemFont, sans-serif',
            colorBackground: '#464646',
        },
    };

    return (
        <>
            <Elements stripe={stripePromis} options={{ appearance }} >
                <PaymentElement />
            </Elements>
        </>
    )
}

export default page
