import React, { useEffect, useState } from 'react'
import styles from './payment.module.css'
import { getCookie } from 'cookies-next'
import { useElements, useStripe, CardCvcElement, CardNumberElement, CardExpiryElement } from '@stripe/react-stripe-js'
import { useRouter } from 'next/navigation'
import API_BASE_URL from '../../../config'
import ResponseToast from '../toast/Toast'
import Button from '../button/Button'

const PaymentElement = () => {
    const [isThankYou, setThankYou] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [cardNum, setCardNum] = useState("")
    // console.log(cardNum)
    const [stripeBilling, setStripeBilling] = useState({
        name: "",
        phone: "",
        email: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
    })
    const { name, phone, email, addressLine1, addressLine2, city, state, postal_code, country } = stripeBilling
    const handleBliing = (e) => {
        setStripeBilling({ ...stripeBilling, [e.target.name]: e.target.value })
    }
    const stripe = useStripe()
    const element = useElements()

    const router = useRouter()

    const packageID = router?.query?.id

    const userData = getCookie('CBPcookie') ? JSON?.parse(getCookie('CBPcookie')) : getCookie('CBPcookie')

    const useremail = userData?.findUser?.email

    useEffect(() => {

        const address = element?.getElement("address")
        address?.getValue().then((value) => {
            setStripeBilling({
                name: value.value.name,
                phone: value.value.phone,
                addressLine1: value.value.address.line1,
                addressLine2: value.value.address.line2,
                city: value.value.address.city,
                state: value.value.address.state,
                postal_code: value.value.address.postal_code,
                country: value.value.address.country,
            })
        })

    }, [cardNum])
    const handlePurchase = async () => {
        const userID = userData?.findUser?._id

        if (!stripe || !element) {
            return null
        }
        setIsLoading(true)

        const cardElement = element.getElement(CardCvcElement, CardNumberElement, CardExpiryElement)

        const payment_method = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                name: name,
                phone: phone,
                email: useremail,
                address: {
                    line1: addressLine1,
                    line2: addressLine2,
                    city: city,
                    state: state,
                    postal_code: postal_code,
                    country: country
                }
            },

        });

        const token = await stripe.createToken(cardElement)

        try {
            const response = await fetch(`${API_BASE_URL}/checkout/purchase-package/${userID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userID: userID,
                    packageID: packageID,
                    email: userData.findUser.email,
                    payment_method: payment_method.paymentMethod.id,
                    tokenID: token.token.id,
                    message: message
                }),
            })

            const data = await response.json()

            console.log(data)

            if (response.ok) {
                setIsLoading(false)
                ResponseToast({ res: data })
                history.pushState({ message: data }, '', '/payment-successfull')
                router.push("/payment-successfull")
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
                        <Button func={handlePurchase} isIcon={false} name={!isLoading ? 'Pay Now' : "Paying"} costomStyle={buttonStyle} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentElement
