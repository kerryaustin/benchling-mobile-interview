import {StackActions} from '@react-navigation/native';
import {ActorRefFrom, spawn} from 'xstate';
import {createModel} from 'xstate/lib/model';
import {NavigationRefType} from './AppContext';
import {HomeMachine, HomeModel} from './screens/Home/HomeMachine';

interface AppContext {
  homeActor?: ActorRefFrom<typeof HomeMachine>;
  navigationRef: NavigationRefType['current'];
}

export const AppModel = createModel({} as AppContext, {
  events: {
    viewHome: () => ({}),
  },
});

export const AppMachine = AppModel.createMachine({
  context: AppModel.initialContext,
  initial: 'splash',
  id: 'app',
  states: {
    splash: {
      after: {
        3000: {
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
    home: {},
  },
});
