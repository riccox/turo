import { QueryClient } from 'react-query';
import axios from '@/util/axios';
import { Turo } from '@/types';
import { LoginResponseData } from '@/pages/api/auth/login';
import { dispatch } from '@/store';
import { setAccessToken, setCurrentUser } from '@/store/slice/user';

export const persistMutations = (client: QueryClient) => {
  login(client);
};

const login = (client: QueryClient) => {
  client.setMutationDefaults('login', {
    mutationFn: async (param: Turo.LoginCredential) => {
      return (await axios.post<LoginResponseData>('/api/auth/login', param)).data;
    },
    onSuccess: async (result: LoginResponseData) => {
      const { accessToken, profile } = result;
      //  set state
      if (accessToken && profile) {
        dispatch(setAccessToken(accessToken));
        dispatch(setCurrentUser(profile));
      }
    },
  });
};
