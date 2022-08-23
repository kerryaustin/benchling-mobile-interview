/* eslint-disable react-native/no-inline-styles */
import {useActor} from '@xstate/react';
import {Box, Heading, Text, VStack} from 'native-base';
import React, {FC, useCallback, useEffect, useRef} from 'react';
import {FlatList, ListRenderItem, RefreshControl} from 'react-native';
import {useAppMachine} from '../../AppContext';
import Lottie from 'lottie-react-native';
import {DataItem, HomeModel} from './HomeMachine';

const HEADER_HEIGHT = 160;

export const Home: FC = () => {
  const [appState] = useAppMachine();
  console.log(appState.context.homeActor!);
  const [state, send] = useActor(appState.context.homeActor!);

  const isLoading = state.matches('loading');

  const lottieRef = useRef<Lottie>(null);

  useEffect(() => {
    if (isLoading) {
      lottieRef.current?.play();
    } else {
      setTimeout(() => lottieRef.current?.reset(), 200);
    }
  }, [lottieRef, isLoading]);

  const refreshCb = useCallback(() => {
    send(HomeModel.events.refresh());
  }, [send]);

  const renderItemCb = useCallback<ListRenderItem<DataItem>>(({item}) => {
    return (
      <VStack
        p="4"
        backgroundColor="white"
        borderBottomColor="gray.300"
        borderBottomWidth={1}
        borderBottomStyle="solid">
        <Text fontSize="sm" fontWeight="medium">
          {item.name}
        </Text>
        <Text fontSize="xs" fontWeight="light">
          Population: {item.population}
        </Text>
      </VStack>
    );
  }, []);
  return (
    <Box flex={1} backgroundColor="white">
      <Box
        height={HEADER_HEIGHT}
        safeAreaTop
        p="4"
        backgroundColor="primary.500">
        <Heading color="white" fontWeight="extrabold">
          Benchling
        </Heading>
        <Text color="white">Modern software built for modern science</Text>
      </Box>
      <Box
        position="absolute"
        width="100%"
        height={300}
        top={HEADER_HEIGHT}
        justifyContent="flex-start"
        alignItems="center"
        backgroundColor="primary.500">
        <Lottie
          style={{width: 48, height: 48}}
          source={require('../../../assets/animations/logo.json')}
          ref={lottieRef}
          loop
        />
      </Box>
      <FlatList<DataItem>
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refreshCb}
            progressBackgroundColor="transparent"
            tintColor="transparent"
          />
        }
        ListHeaderComponent={
          <Box
            backgroundColor="white"
            borderBottomColor="gray.300"
            borderBottomWidth={1}
            borderBottomStyle="solid"
            p="4"
            borderTopRightRadius={20}
            borderTopLeftRadius={20}>
            <Heading fontWeight="medium">Planets</Heading>
          </Box>
        }
        ListFooterComponent={<Box backgroundColor="white" height={300} />}
        style={{flex: 1}}
        data={state.context.data}
        keyExtractor={({id}) => id}
        renderItem={renderItemCb}
      />
    </Box>
  );
};
