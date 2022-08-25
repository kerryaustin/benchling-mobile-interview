import {assign} from 'xstate';
import {createModel} from 'xstate/lib/model';
import {BenchlingApi} from '../../lib/apis/BenchlingApi';

interface DnaDetailContext {
  id?: string;
  name?: string;
  dnaBases?: string;
}

const initialContext: DnaDetailContext = {};

export const DnaDetailModel = createModel(initialContext, {
  events: {
    back: () => ({}),
    editBases: () => ({}),
    cancel: () => ({}),
    save: (bases: string) => ({bases}),
  },
});

export const DnaDetailMachine = DnaDetailModel.createMachine({
  initial: 'idle',
  states: {
    idle: {
      on: {
        editBases: {
          target: 'editingBases',
        },
      },
    },
    editingBases: {
      on: {
        cancel: 'idle',
        save: 'saving',
      },
    },
    saving: {
      invoke: {
        src: async ({id}, evt) => {
          if (evt.type !== 'save') {
            return;
          }
          const api = new BenchlingApi();
          await api.updateBases(id!, evt.bases);
          return {bases: evt.bases};
        },
        onDone: {
          target: 'idle',
          actions: assign({
            dnaBases: (_, {data: {bases}}) => bases,
          }),
        },
      },
    },
  },
});
