import React, { useContext } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppIcon from '../../components/AppIcon';
import AppText from '../../components/AppText';
import Container from '../../components/Container';
import { LockContext } from '../../contexts/LockContext';
import routes from '../../navigation/routes';
import { AppColors, AppStyles } from '../../utils/CommonStyles';

export default function SettingsScreen({ navigation }) {
  const { PIN, setIsLocked } = useContext(LockContext);

  const data = [
    {
      icon: 'star-off',
      name: 'Reset favorites',
      route: routes.SETTINGS,
    },
    {
      icon: 'form-textbox-password',
      name: PIN ? 'Change PIN' : 'Set PIN',
      route: routes.PIN_SET,
      params: { name: PIN ? 'Change PIN' : 'Set PIN', PIN },
    },
    {
      icon: 'delete-outline',
      name: 'Delete PIN',
      route: routes.PIN_DELETE,
      params: { name: 'DELETE PIN', PIN },
      disabled: !PIN,
    },
    {
      icon: 'lock-outline',
      name: 'Lock app',
      func: () => setIsLocked(true),
      disabled: !PIN,
    },
  ];

  const renderItem = ({
    index,
    item: { icon, name, route, func, params = {} },
  }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        key={index}
        onPress={() => (func ? func() : navigation.navigate(route, params))}>
        <AppText
          style={{
            color: AppColors.black,
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          {name}
        </AppText>
        <AppIcon
          name={icon}
          size={30}
          color={AppColors.accent}
          style={{ marginRight: 10 }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Container style={styles.container}>
      <AppText style={[AppStyles.mainHeading, AppStyles.alignCenter]}>
        Settings
      </AppText>
      <FlatList
        persistentScrollbar
        style={{
          marginTop: 80,
          marginBottom: 20,
          marginLeft: 10,
        }}
        contentContainerStyle={{ flexGrow: 1 }}
        data={data.filter(d => !d?.disabled)}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View
            style={{
              marginVertical: 25,
              borderBottomColor: AppColors.black,
              borderBottomWidth: 0.5,
            }}
          />
        )}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
