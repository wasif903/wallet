import React, { useEffect, useState } from 'react'
import styles from './payment.module.css'
import { getCookie } from 'cookies-next'
import { useElements, useStripe, CardCvcElement, CardNumberElement, CardExpiryElement } from '@stripe/react-stripe-js'
import { useRouter } from 'next/navigation'
import API_BASE_URL from '../../../config'
import ResponseToast from '../toast/Toast'
import Button from '../button/Button'

const PaymentElement = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [cardNum, setCardNum] = useState("")

    const stripe = useStripe()
    const element = useElements()

    const router = useRouter()

    const userData = getCookie('wallet') ? JSON?.parse(getCookie('wallet')) : getCookie('wallet')

    const userId = userData?._id

    const handlePurchase = async () => {

        if (!stripe || !element) {
            return ResponseToast({ message: 'All Fields Are Required' })
        }
        setIsLoading(true)

        const cardElement = element.getElement(CardCvcElement, CardNumberElement, CardExpiryElement)

        const payment_method = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        const token = await stripe.createToken(cardElement)

        try {
            const response = await fetch(`${API_BASE_URL}/api/create-payment-method`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userID: userId,
                    payment_method: payment_method.paymentMethod.id,
                    tokenID: token.token.id,
                }),
            })

            const data = await response.json()

            if (response.ok) {
                setIsLoading(false)
                ResponseToast({ message: data?.message, success: true })
            } else {
                ResponseToast({ message: 'All Fields Are Required' })
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
            ResponseToast({ message: 'All Fields Are Required' })
        }
    }

    const buttonStyle = {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        borderRadius: "50px",
        backgroundColor: "var(--primary-color)",
        color: "black"
    }

    let style = {
        base: {
            color: 'black',
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
        }

    };

    return (
        <div className={styles.paymentWrapper}>
            <div className={styles.cardWrapper}>
                <div>
                    <div className="d-flex align-items-center justify-content-center text-light mb-4">
                        <h1> Payment Info </h1>
                    </div>

                </div>
                <div className='d-flex flex-column gap-3'>
                    <div>
                        <label style={{ color: "white", paddingLeft: "0.5rem" }}>Card Number</label>
                        <div className={styles.stripe_fields}>
                            <CardNumberElement options={{ style: style }} onChange={(e) => setCardNum(e)} />
                        </div>
                    </div>

                    <div className={` d-flex gap-2`}>
                        <div style={{ width: "100%" }}>
                            <label style={{ color: "white", paddingLeft: "0.5rem" }}>CVC</label>
                            <div className={styles.stripe_fields}>
                                <CardCvcElement options={{ style: style }} />
                            </div>
                        </div>
                        <div style={{ width: "100%" }}>
                            <label style={{ color: "white", paddingLeft: "0.5rem" }}>Expiry Date</label>
                            <div className={styles.stripe_fields}>
                                <CardExpiryElement options={{ style: style }} />
                            </div>
                        </div>
                    </div>

                    <div className={`d-flex justify-content-center ${styles.stripe_btn}`} >
                        <Button onClick={handlePurchase} name={!isLoading ? 'Pay Now' : "Paying"} costomStyle={buttonStyle} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentElement
