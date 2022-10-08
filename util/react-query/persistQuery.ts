import { QueryClient } from 'react-query';
import axios from '@/util/axios';
import { getState } from '@/store';

export const persistQuery = (client: QueryClient) => {
  fetchUserList(client);
};

const fetchUserList = (client: QueryClient) => {
  client.setQueryDefaults('users', {
    enabled: false,
    queryFn: async ({ queryKey }) => {
      //  TODO
      const accessToken = getState().user.accessToken;
      return await axios.get(`/api/users`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
    onSuccess: (result) => {
      //  TODO
    },
  });
};
