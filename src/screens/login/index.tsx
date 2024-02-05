import React,{FC, useEffect, useRef, useState} from "react";
import { Alert, Animated, Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from "./style";
import { LoginProps } from "../../types";
import { useEventsContext } from "../../data/globalState";

export const Login:FC<LoginProps> = (props:LoginProps)=>{
    const [username, setUsername] = useState('Ramesh');
    const translateY = useRef(new Animated.Value(100)).current;
    const springValue = useRef(new Animated.Value(0.3)).current;
    const {login} = useEventsContext()
    useEffect(() => {
        const bottomToTopAnimation = Animated.timing(translateY, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          });
      
          const springAnimation = Animated.spring(springValue, {
            toValue: 1,
            friction: 1,
            tension: 40,
            useNativeDriver: true,
          });
          Animated.sequence([bottomToTopAnimation,springAnimation]).start()
      }, []);

      const loginToApp = ()=>{
       
        try {
          if(username.trim().length<3){
          
            Alert.alert(`Please enter username must have 4 characters long${username}`)
          }
          else{
            login(username)
           
          }
        }
        catch(error){
          Alert.alert(JSON.stringify(error))
        }
        
        
      }

    return (
      <View style = {styles.container}>
        <Animated.View style={[styles.inputContainer, { transform: [{ translateY }] },styles.shadow]}>
        <Text style={styles.titleText}>Here we Go!! </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TouchableOpacity
          onPress={loginToApp}
         style={styles.button}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      </Animated.View></View>)

}


