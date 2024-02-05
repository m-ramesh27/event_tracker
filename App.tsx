/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import RootNavigation from './src/navigation';
import { EventsProvider } from './src/data/globalState';

function App(): React.JSX.Element {
  return (<EventsProvider>
      <RootNavigation/>
  </EventsProvider>)
}



export default App;
