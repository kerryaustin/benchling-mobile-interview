import {assign, DoneInvokeEvent} from 'xstate';
import {createModel} from 'xstate/lib/model';
import {BenchlingApi} from '../../lib/apis/BenchlingApi';
import {delay} from '../../lib/utils';

export interface DataItem {
  id: string;
  name: string;
  population: number;
}

type Data = DataItem[];

interface HomeContext {
  loading: boolean;
  data: Data;
}

const initialContext: HomeContext = {
  data: [],
  loading: false,
};

interface LoadingReturnType {
  data: Data;
}

export const HomeModel = createModel(initialContext, {
  events: {
    refresh: () => ({}),
    updateData: (data: Data) => ({data}),
  },
});

export const HomeMachine = HomeModel.createMachine({
  initial: 'loading',
  states: {
    loading: {
      invoke: {
        src: async (): Promise<LoadingReturnType> => {
          await delay(2000);

          const api = new BenchlingApi();
          const data = await api.getData();
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
      },
    },
  },
});
