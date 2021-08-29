import React, { useContext } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppIcon from '../../components/AppIcon';
import AppText from '../../components/AppText';
import Container from '../../components/Container';
import { YesNoAlert } from '../../components/YesNoAlert';
import { FavoriteContext } from '../../contexts/FavoriteContext';
import { LockContext } from '../../contexts/LockContext';
import routes from '../../navigation/routes';
import { AppColors, AppStyles } from '../../utils/CommonStyles';

export default function SettingsScreen({ navigation }) {
  const { PIN, setIsLocked } = useContext(LockContext);
  const { favorites, clearFavorites } = useContext(FavoriteContext);

  const data = [
    {
      icon: 'star-off',
      name: 'Reset favorites',
      func: () =>
        YesNoAlert(
          'Confirm Deletion',
          'Are you sure you want to clean your favorites list?',
          clearFavorites,
        ),
      disabled: favorites.length === 0,
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
        style={styles.itemContainer}
        key={index}
        onPress={() => (func ? func() : navigation.navigate(route, params))}>
        <AppText style={styles.itemLabel}>{name}</AppText>
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
        style={styles.list}
        contentContainerStyle={{ flexGrow: 1 }}
        data={data.filter(d => !d?.disabled)}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLabel: {
    color: AppColors.black,
    fontWeight: 'bold',
    fontSize: 20,
  },
  list: {
    marginTop: 80,
    marginBottom: 20,
    marginLeft: 10,
  },
  separator: {
    marginVertical: 25,
    borderBottomColor: AppColors.black,
    borderBottomWidth: 0.5,
  },
});
