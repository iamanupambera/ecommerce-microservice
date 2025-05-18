import {
  type BaseQueryFn,
  createApi,
  type FetchArgs,
  fetchBaseQuery,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {
  getDataFromSessionStorage,
  saveToSessionStorage,
} from '../shared/utils/utils.service';

const BASE_ENDPOINT = import.meta.env.VITE_BASE_ENDPOINT;

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_ENDPOINT}/api/gateway/v1`,
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    headers.set(
      'Authorization',
      `Bearer ${getDataFromSessionStorage('accessToken')}`,
    );
    return headers;
  },
  credentials: 'include',
});

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Attempt to refresh the token
    const refreshResult = await baseQuery(
      '/auth/refresh-token',
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      const response = refreshResult.data as {
        response: { token: { accessToken: string } };
      };

      // Save the new token to session storage
      saveToSessionStorage('', '', response.response.token.accessToken);

      // Update headers of the original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Handle failed token refresh, e.g., log out the user
      api.dispatch({ type: 'auth/logout' }); // Replace with your logout action
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: 'clientApi',
  baseQuery: baseQueryWithReAuth,
  tagTypes: [
    'Auth',
    'Currentuser',
    'Buyer',
    'Seller',
    'Chat',
    'Checkout',
    'Gigs',
    'Search',
    'Review',
    'Order',
    'Notification',
  ],
  endpoints: () => ({}),
});
