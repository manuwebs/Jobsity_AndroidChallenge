import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import AlphabeticalShowList from '../../components/AlphabeticalShowList';
import AppText from '../../components/AppText';
import Container from '../../components/Container';
import EmptyPlaceholder from '../../components/EmptyPlaceholder';
import { FavoriteContext } from '../../contexts/FavoriteContext';
import routes from '../../navigation/routes';
import { AppStyles } from '../../utils/CommonStyles';

export default function FavoriteScreen({ navigation }) {
  const { favorites } = useContext(FavoriteContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(favorites);
  }, [favorites]);

  if (data.length < 1) {
    return (
      <Container>
        <AppText
          style={[
            AppStyles.alignCenter,
            AppStyles.marginVertical,
            AppStyles.mainHeading,
          ]}>
          Favorites
        </AppText>
        <EmptyPlaceholder
          message={
            "Ups!, there's nothing here. Try adding some on the show's tab."
          }
        />
      </Container>
    );
  } else {
    return (
      <Container>
        <AppText
          style={[
            AppStyles.alignCenter,
            AppStyles.marginVertical,
            AppStyles.mainHeading,
          ]}>
          Favorites
        </AppText>
        <AlphabeticalShowList
          shows={data}
          onShowPress={item => navigation.navigate(routes.SHOW_DETAILS, item)}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({});
