import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../../../config";

const payment = createApi({
    reducerPath: "payment",
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    endpoints: (builder) => ({

        get_Payments: builder.query({
            query: (userID) => {
                return {
                    url: `/api/get-payment-method/${userID}`,
                    method: "GET",
                };
            },
        }),

    }),
});

export const { useGet_PaymentsQuery } = payment;

export default payment;
