import React, { useContext, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import Container from '../../components/Container';
import PinBox from '../../components/PinBox';
import { LockContext } from '../../contexts/LockContext';
import { AppColors, AppStyles } from '../../utils/CommonStyles';

export default function LockScreen() {
  const { PIN, setIsLocked } = useContext(LockContext);
  const [accessPIN, setAccessPIN] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const onUnlock = async () => {
    if (PIN !== accessPIN) {
      setErrorMessage('The PIN is incorrect');
    } else {
      setIsLocked(false);
    }
  };

  return (
    <Container scrollable style={styles.container}>
      <PinBox
        label="Type your PIN:"
        heading
        value={setAccessPIN}
        style={AppStyles.marginVertical}
        labelStyle={styles.heading}
      />

      <AppText style={[AppStyles.textCenter, styles.errorMessage]}>
        {errorMessage}
      </AppText>

      <AppButton
        onPress={onUnlock}
        title="Unlock"
        containerStyles={styles.button}
        labelStyle={styles.buttonLabel}
      />

      <Image
        style={[AppStyles.alignCenter, styles.logo]}
        source={require('../../assets/images/logo.png')}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: AppColors.white,
  },
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
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: AppColors.secondary,
  },
  errorMessage: {
    marginTop: 20,
    color: AppColors.danger,
  },
  logo: {
    position: 'absolute',
    bottom: 20,
  },
});
