import React,{FC, useEffect} from "react";
import { Text, TouchableOpacity, View } from 'react-native';
import { EventsProps} from "../../types";
import withEventList from "../../common/eventlistHoc";
import { useEventsContext } from "../../data/globalState";

const TrackEvent:FC<EventsProps> = (props:EventsProps)=>{
  const {logout} = useEventsContext()
  useEffect(()=>{
    props.navigation.setOptions({
      title:"Your Events",
      headerLeftLabelVisible:false,
      headerRight: () => (
        <TouchableOpacity onPress={logout}>
          <Text style={{ marginRight: 10 }}>LogOut</Text>
        </TouchableOpacity>
      ),
      
    })
  },[])
    return <View/>
}
export const  TrackEvents = withEventList(TrackEvent)

