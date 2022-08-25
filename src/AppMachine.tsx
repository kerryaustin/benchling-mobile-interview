import {StackActions} from '@react-navigation/native';
import {ActorRefFrom, spawn} from 'xstate';
import {createModel} from 'xstate/lib/model';
import {NavigationRefType} from './AppContext';
import {DnaDetailMachine} from './screens/DnaDetail/DnaDetailMachine';
import {HomeMachine, HomeModel} from './screens/Home/HomeMachine';

interface AppContext {
  homeActor?: ActorRefFrom<typeof HomeMachine>;
  dnaDetailActor?: ActorRefFrom<typeof DnaDetailMachine>;
  navigationRef: NavigationRefType['current'];
}

export const AppModel = createModel({} as AppContext, {
  events: {
    viewHome: () => ({}),
    viewDnaDetail: (dnaSeqId: string, name: string, dnaBases: string) => ({
      id: dnaSeqId,
      name,
      dnaBases,
    }),
  },
});

export const AppMachine = AppModel.createMachine({
  context: AppModel.initialContext,
  initial: 'splash',
  id: 'app',
  states: {
    splash: {
      after: {
        500: {
          target: 'home',
          actions: [
            AppModel.assign({
              homeActor: () =>
                spawn(HomeMachine.withContext(HomeModel.initialContext)),
            }),
            ({navigationRef}) => {
              navigationRef?.dispatch(StackActions.replace('Home'));
            },
          ],
        },
      },
    },
    home: {
      on: {
        viewDnaDetail: {
          target: 'dnaDetail',
          actions: [
            AppModel.assign({
              dnaDetailActor: (_, data) =>
                spawn(
                  DnaDetailMachine.withContext({
                    id: data.id,
                    name: data.name,
                    dnaBases: data.dnaBases,
                  }),
                ),
            }),
            ({navigationRef}) => {
              navigationRef?.dispatch(StackActions.push('DnaDetail'));
            },
          ],
        },
      },
    },
    dnaDetail: {},
  },
});
