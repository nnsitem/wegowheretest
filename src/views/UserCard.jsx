import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

// @import main container
import MainContainer from 'navigation/layout/MainContainer';

// @import global component
import CreditCard from 'components/CreditCard';

// @import loading hook & reducer
import { useStateLoading } from 'hooks';
import cardController from 'store/controller/card.controller';

export default function UserCard() {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const { card_list } = useSelector((state) => state['card']);

  // setup loader
  const [loading, setLoading] = useStateLoading(['createPayment']);

  const handleCardPress = (data) =>
    setLoading('createPayment', async () => {
      const res = await dispatch(cardController.createPayment(data));
    });

  const renderEmptyListComponent = () => {
    return (
      <View style={styles.contentContainer}>
        <Text style={{ fontSize: 40, marginBottom: 16 }}>💳</Text>
        <Text style={styles.textStyle}>No Cards Found</Text>
        <Text style={[styles.textStyle, { marginVertical: 14, maxWidth: 244 }]}>
          We recommend adding a card for easy payment
        </Text>
        <TouchableOpacity onPress={() => navigate('Add-Card')}>
          <Text style={[styles.textStyle, styles.addCardText]}>Add New Card</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <MainContainer noPadding>
      <FlatList
        data={card_list}
        renderItem={({ item }) => <CreditCard onPress={handleCardPress} item={item} />}
        contentContainerStyle={styles.listContentContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={renderEmptyListComponent}
        style={styles.container}
      />
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    marginVertical: 16,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 400,
    textAlign: 'center',
    fontFamily: 'FC Subject Rounded Regular',
  },
  addCardText: {
    color: 'rgba(74, 216, 218, 1)',
  },
});
