import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

// @import core redux storage configure
import { Provider } from 'react-redux';
import store from 'store';

// @import cache hooks
import { useCachedResources } from 'hooks';
// @import root navigation controller
import RootNavigation from 'navigation';

export default function App() {
  const isResourcesCached = useCachedResources();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="auto" />

        {isResourcesCached && <RootNavigation />}
      </NavigationContainer>
    </Provider>
  );
}
