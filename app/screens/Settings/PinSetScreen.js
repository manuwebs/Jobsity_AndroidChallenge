import React, { useContext, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import Container from '../../components/Container';
import PinBox from '../../components/PinBox';
import { LockContext } from '../../contexts/LockContext';
import { AppColors, AppStyles } from '../../utils/CommonStyles';
import SecureStorage from '../../utils/SecureStorage';

export default function PinSetScreen({ navigation }) {
  const { PIN, setPIN } = useContext(LockContext);
  const [oldPIN, setOldPIN] = useState(null);
  const [newPIN, setNewPIN] = useState(null);
  const [confirmNewPIN, setConfirmNewPIN] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSave = () => {
    if (PIN && (!oldPIN || oldPIN.length < 4)) {
      setErrorMessage('Old PIN is required.');
    } else if (!newPIN || newPIN.length < 4) {
      setErrorMessage('New PIN is required.');
    } else if (!confirmNewPIN || confirmNewPIN.length < 4) {
      setErrorMessage('Confirm new PIN is required');
    } else if (newPIN !== confirmNewPIN) {
      setErrorMessage("Confirmation doesn't match.");
    } else if (PIN && PIN !== oldPIN) {
      setErrorMessage("The old PIN doesn't match.");
    } else {
      setErrorMessage(null);
      SecureStorage.save('pin', newPIN);
      setPIN(newPIN);
      Alert.alert('Success', 'Your PIN has been changed!');
      navigation.goBack();
    }
  };

  return (
    <Container scrollable style={styles.container}>
      {PIN && (
        <PinBox
          label="Old PIN:"
          value={setOldPIN}
          style={AppStyles.marginVertical}
        />
      )}

      <PinBox
        label="New PIN:"
        value={setNewPIN}
        style={AppStyles.marginVertical}
      />

      <PinBox
        label="Confirm new PIN:"
        value={setConfirmNewPIN}
        style={AppStyles.marginVertical}
      />

      <AppText style={[AppStyles.textCenter, styles.errorMessage]}>
        {errorMessage}
      </AppText>

      <AppButton
        onPress={onSave}
        title="Save"
        containerStyles={styles.button}
        labelStyle={styles.buttonLabel}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 50,
    marginBottom: 20,
    paddingHorizontal: 30,
    height: 40,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 40,
  },
  buttonLabel: { fontSize: 18, fontWeight: 'bold' },
  container: {
    justifyContent: 'center',
    paddingTop: 20,
  },
  errorMessage: {
    marginTop: 20,
    color: AppColors.danger,
  },
});
