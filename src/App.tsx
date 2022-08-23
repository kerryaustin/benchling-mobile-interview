import {NavigationContainer} from '@react-navigation/native';
import {useMachine} from '@xstate/react';
import {NativeBaseProvider} from 'native-base';
import React, {FC, useMemo} from 'react';
import {AppMachineContext, navigationRef} from './AppContext';
import {AppMachine, AppModel} from './AppMachine';
import {themeConfig} from './config/theme';
import {Routes} from './Routes';

export const App: FC = () => {
  const machine = useMemo(() => {
    return AppMachine.withContext({
      ...AppModel.initialContext,
      navigationRef,
    });
  }, []);
  const [state, , actor] = useMachine(machine);
  console.log(state.context.homeActor);
  return (
    <NavigationContainer ref={navigationRef}>
      <NativeBaseProvider theme={themeConfig}>
        <AppMachineContext.Provider value={{actor}}>
          <Routes />
        </AppMachineContext.Provider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};
