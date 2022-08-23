import {createNavigationContainerRef} from '@react-navigation/native';
import {useActor} from '@xstate/react';
import {createContext, useContext} from 'react';
import {ActorRefFrom} from 'xstate';
import {AppMachine} from './AppMachine';

export const AppMachineContext = createContext<{
  actor?: ActorRefFrom<typeof AppMachine>;
}>({});

export const useAppMachine = () => {
  const actor = useContext(AppMachineContext).actor;
  return useActor(actor!);
};

export const navigationRef = createNavigationContainerRef();

export type NavigationRefType = typeof navigationRef;
