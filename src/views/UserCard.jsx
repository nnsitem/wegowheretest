import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// @import main container
import MainContainer from 'navigation/layout/MainContainer';

export default function UserCard({ route: { params } }) {
  const { navigate } = useNavigation();

  return (
    <MainContainer>
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
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
