import { StyleSheet, TouchableOpacity } from 'react-native';

// @import create navigation
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

// @import screens
import UserCard from 'views/UserCard';
import AddCard from 'views/AddCard';

// @import icons
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

export default function RootNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Cards"
      screenOptions={({ navigation: { goBack } }) => ({
        headerShadowVisible: false,
        headerLeft: ({ canGoBack }) =>
          canGoBack && (
            <TouchableOpacity onPress={() => goBack()} style={styles.headerButton}>
              <MaterialIcons name="arrow-back-ios" size={24} color="black" />
            </TouchableOpacity>
          ),
      })}
    >
      <Stack.Screen
        name="Cards"
        component={UserCard}
        options={({ navigation: { navigate } }) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigate('Add-Card')} style={styles.headerButton}>
              <AntDesign name="plus" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="Add-Card" component={AddCard} options={{ title: null }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    marginHorizontal: 16,
  },
});
