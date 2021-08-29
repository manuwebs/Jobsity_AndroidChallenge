import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppStyles } from '../utils/CommonStyles';
import AppInput from './AppInput';
import AppText from './AppText';

export default function PinBox({
  heading = false,
  size = 4,
  label,
  labelStyle,
  value,
  style,
}) {
  const [pin, setPin] = useState(null);

  useEffect(() => {
    let array = [];
    for (let i = 0; i < size; i++) {
      array.push('');
    }
    setPin([...array]);
  }, []);

  useEffect(() => {
    if (pin) {
      value(pin.filter(p => p).join(''));
    }
  }, [pin]);

  return (
    <View style={style}>
      <AppText
        style={[
          AppStyles.alignCenter,
          heading ? AppStyles.mainHeading : styles.secondHeading,
          labelStyle,
        ]}>
        {label}
      </AppText>
      <View style={styles.pinContainer}>
        {pin?.map((digit, index) => (
          <RenderPinInput
            key={index}
            value={digit}
            setValue={value => {
              if (value) {
                const p = pin;
                p[index] = value;
                setPin([...p]);
              }
            }}
          />
        ))}
      </View>
    </View>
  );
}

const RenderPinInput = ({ index, value, setValue }) => {
  const [digit, setDigit] = useState(value);
  return (
    <AppInput
      password
      style={styles.input}
      containerStyle={styles.inputContainer}
      keyboardType={'numeric'}
      textAlign={'center'}
      onChangeText={number => {
        const n = number.replace(/[^0-9]/g, '');
        setValue(n);
        setDigit(n);
      }}
      maxLength={1}
      value={digit}
    />
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
  },
  secondHeading: { marginTop: 20, fontSize: 18, fontFamily: 'Ubuntu-Bold' },
  input: { fontSize: 22, fontFamily: 'Ubuntu-Bold', borderRadius: 50 },
  inputContainer: {
    marginTop: 20,
    marginHorizontal: 10,
    height: 50,
    width: 50,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
