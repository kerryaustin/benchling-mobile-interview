import {Button, Input, Modal} from 'native-base';
import React, {FC, useState} from 'react';

interface EditBaseModalProps {
  bases: string;
  saving: boolean;
  onCancel?: () => void;
  onSave?: (bases: string) => void;
}

export const EditBaseModal: FC<EditBaseModalProps> = props => {
  const [bases, setBases] = useState(props.bases);
  return (
    <Modal isOpen={true}>
      <Modal.Content maxH="212">
        <Modal.CloseButton />
        <Modal.Header>Update Bases</Modal.Header>
        <Modal.Body>
          <Input placeholder="Bases" value={bases} onChangeText={setBases} />
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                props.onCancel?.();
              }}>
              Cancel
            </Button>
            <Button
              isLoading={props.saving}
              disabled={props.saving}
              onPress={() => {
                props.onSave?.(bases);
              }}>
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
