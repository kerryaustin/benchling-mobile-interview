/* eslint-disable react-native/no-inline-styles */
import {Box} from 'native-base';
import React, {FC} from 'react';
import Lottie from 'lottie-react-native';

export const Splash: FC = () => {
  return (
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor="primary.500">
      <Lottie
        style={{width: 100, height: 100}}
        source={require('../../assets/animations/logo.json')}
        autoPlay
        loop
      />
    </Box>
  );
};
