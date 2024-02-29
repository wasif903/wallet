import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../../../config";

const auth = createApi({
	reducerPath: "auth",
	baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
	endpoints: (builder) => ({

		login: builder.mutation({
			query: (data) => {
				return {
					url: "/auth/login",
					method: "POST",
					body: data,
				};
			},
		}),

	}),
});

export const { useLoginMutation } = auth;

export default auth;
