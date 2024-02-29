"use client"
import PaymentElement from '@/components/PaymentElement/PaymentElement';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import React from 'react'


const page = () => {

    const stripePromis = loadStripe(`pk_test_51NIBAcI5fPUI3rtcDUlfJLzWwzLSxtbyJjdlhg9sAeXXyk8Lblm0uUQUIkLGFD1wx4GeDZs7Fwxh55i5US7okdA200CgK46sm6`);
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
