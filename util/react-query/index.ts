import { QueryClient } from 'react-query';
import { persistMutations } from './persistMutation';
import { persistQuery } from './persistQuery';
import { defaultOption } from './defaultOpt';

export const wrapClient = (client: QueryClient) => {
  // set default config options
  defaultOption(client);
  // pre-define queries
  persistQuery(client);
  // pre-define mutations
  persistMutations(client);
};

export const createQueryClient = () => {
  const client = new QueryClient();
  // init wrap all things
  wrapClient(client);
  return client;
};
