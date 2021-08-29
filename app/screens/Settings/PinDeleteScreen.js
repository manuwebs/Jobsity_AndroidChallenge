import React, { useContext, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import Container from '../../components/Container';
import PinBox from '../../components/PinBox';
import { LockContext } from '../../contexts/LockContext';
import { AppColors, AppStyles } from '../../utils/CommonStyles';
import SecureStorage from '../../utils/SecureStorage';

export default function PinDeleteScreen({ navigation }) {
  const { PIN, setPIN } = useContext(LockContext);
  const [oldPIN, setOldPIN] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const onDelete = async () => {
    if (PIN !== oldPIN) {
      setErrorMessage("The old PIN doesn't match.");
    } else {
      await SecureStorage.remove('pin');
      setPIN(null);
      Alert.alert('Success', 'Your PIN has been deleted!');
      navigation.goBack();
    }
  };

  return (
    <Container scrollable style={styles.container}>
      <PinBox
        label="Old PIN:"
        value={setOldPIN}
        style={AppStyles.marginVertical}
      />

      <AppText style={[AppStyles.textCenter, styles.errorMessage]}>
        {errorMessage}
      </AppText>

      <AppButton
        onPress={onDelete}
        title="Delete"
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
    backgroundColor: AppColors.danger,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 40,
  },
  buttonLabel: { fontSize: 18, fontFamily: 'Ubuntu-Bold' },
  container: {
    justifyContent: 'center',
    paddingTop: 20,
  },
  errorMessage: {
    marginTop: 20,
    color: AppColors.danger,
  },
});
