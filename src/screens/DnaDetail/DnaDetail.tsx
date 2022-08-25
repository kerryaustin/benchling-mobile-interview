import {useActor} from '@xstate/react';
import {Box, Button, Heading, HStack, Text} from 'native-base';
import React, {FC} from 'react';
import {useAppMachine} from '../../AppContext';
import {DnaDetailModel} from './DnaDetailMachine';
import {EditBaseModal} from './EditBaseModal';

export const DnaDetail: FC = () => {
  const [appState] = useAppMachine();
  const [state, send] = useActor(appState.context.dnaDetailActor!);
  const isEditing = state.matches('editingBases');
  const isSaving = state.matches('saving');
  return (
    <Box safeArea backgroundColor="white" flex={1}>
      <Heading>{state.context.name}</Heading>
      <HStack>
        <Text>{state.context.dnaBases}</Text>
        <Button
          onPress={() => {
            send(DnaDetailModel.events.editBases());
          }}>
          Edit
        </Button>
      </HStack>
      {(isEditing || isSaving) && (
        <EditBaseModal
          saving={isSaving}
          bases={state.context.dnaBases!}
          onCancel={() => {
            send(DnaDetailModel.events.cancel());
          }}
          onSave={v => {
            send(DnaDetailModel.events.save(v));
          }}
        />
      )}
    </Box>
  );
};
