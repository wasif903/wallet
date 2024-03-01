"use client"
import { useGet_PaymentsQuery } from '@/redux/payment/payment'
import { getCookie } from 'cookies-next'
import React, { useEffect } from 'react'

const page = () => {

    const userData = getCookie('wallet') ? JSON?.parse(getCookie('wallet')) : getCookie('wallet')

    const userID = userData?._id
    console.log(userID)
    const getCardDetail = useGet_PaymentsQuery(userID)
    console.log(getCardDetail)
    return (
        <div>
            <span>
                <p>email:{getCardDetail?.data?.customer?.email}</p>
            </span>
            <span>
                <p>balance:{getCardDetail?.data?.customer?.balance}</p>
            </span>
            <span>
                <h2>Card Info</h2>
                <p>Brand:{getCardDetail?.data?.paymentMethod?.card?.brand}</p>
            </span>
            <span>
                <p>country:{getCardDetail?.data?.paymentMethod?.card?.country}</p>
            </span>
            <span>
                <p>exp_month:{getCardDetail?.data?.paymentMethod?.card?.exp_month}</p>
            </span>
            <span>
                <p>exp_year:{getCardDetail?.data?.paymentMethod?.card?.exp_year}</p>
            </span>
            <span>
                <p>card number : ************{getCardDetail?.data?.paymentMethod?.card?.last4}</p>
            </span>
        </div>
    )
}

export default page
