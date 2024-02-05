import {Login, Events, EventDetail,TrackEvents} from '../screens';
import {NavigationContainer, RouteConfig, } from '@react-navigation/native';
import { TransitionPresets, TransitionSpecs, createStackNavigator} from '@react-navigation/stack';
import {isReadyRef, navigationRef}  from 'react-navigation-helpers'
import { RootStackParamList } from '../types';
import { useEventsContext } from '../data/globalState';

const RootStack = createStackNavigator<RootStackParamList>()
const RootNavigation = ()=>{

     const {Screen,Navigator} = RootStack;
     const {isAuthenticated} = useEventsContext()
     const MainNavigation = ()=>{
       return(<Navigator screenOptions={{gestureEnabled:true}}>
             <Screen component={Events} name='Events' options={{gestureDirection:'horizontal-inverted'}}/>
             <Screen component={EventDetail} name='EventDetail'/>
             <Screen component={TrackEvents} name='TrackEvents'/>
       </Navigator>)
     }
     const AuthNavigation = ()=>{ 
        return (<Navigator>
            <Screen component={Login} name='Login'/>
        </Navigator>)
     }
     return (<NavigationContainer  ref={navigationRef} onReady={()=>{isReadyRef.current = true}}>
          {isAuthenticated?<MainNavigation/>:<AuthNavigation/>}
    </NavigationContainer>)

}

export default RootNavigation;


