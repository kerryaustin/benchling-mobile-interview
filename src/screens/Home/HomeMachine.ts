import {assign, DoneInvokeEvent} from 'xstate';
import {createModel} from 'xstate/lib/model';
import {BenchlingApi} from '../../lib/apis/BenchlingApi';

export interface DataItem {
  id: string;
  name: string;
  dnaBases: string;
}

type Data = DataItem[];

interface HomeContext {
  loading: boolean;
  data: Data;
  query: string;
}

const initialContext: HomeContext = {
  data: [],
  query: '',
  loading: false,
};

interface LoadingReturnType {
  data: Data;
}

export const HomeModel = createModel(initialContext, {
  events: {
    refresh: () => ({}),
    updateData: (data: Data) => ({data}),
    search: (query: string) => ({query}),
  },
});

export const HomeMachine = HomeModel.createMachine({
  initial: 'loading',
  states: {
    loading: {
      invoke: {
        src: async (): Promise<LoadingReturnType> => {
          const api = new BenchlingApi();
          const data = await api.getDnaSequences();
          return {
            data,
          };
        },
        onDone: {
          target: 'idle',
          actions: assign<HomeContext, DoneInvokeEvent<LoadingReturnType>>({
            data: (_, {data: {data}}) => data,
          }),
        },
      },
    },
    idle: {
      on: {
        refresh: 'loading',
        search: {
          target: 'searching',
          actions: HomeModel.assign({
            query: (_, {query}) => query,
          }),
        },
      },
    },
    searching: {
      invoke: {
        src: async (ctx): Promise<LoadingReturnType> => {
          const api = new BenchlingApi();
          const data = await api.searchDnaSequences(ctx.query);
          return {data};
        },
        onDone: {
          target: 'idle',
          actions: assign<HomeContext, DoneInvokeEvent<LoadingReturnType>>({
            data: (_, {data: {data}}) => data,
          }),
        },
      },
      on: {
        search: {
          target: 'searching',
          actions: HomeModel.assign({
            query: (_, {query}) => query,
          }),
        },
      },
    },
  },
});
