import React, {FC, useEffect, useRef, useState} from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { EventsProps } from "../../types";
import withEventList from "../../common/eventlistHoc";
const EventList:FC<EventsProps>= (props:EventsProps)=>{

  useEffect(()=>{
    props.navigation.setOptions({
      title: 'Events around you',
      headerRight: () => (
        <TouchableOpacity onPress={() => props.navigation.navigate("TrackEvents")}>
          <Text style={{ marginRight: 10 }}>Your Events</Text>
        </TouchableOpacity>
      ),
    })

  },[])
  return null
}
export const  Events = withEventList(EventList)
