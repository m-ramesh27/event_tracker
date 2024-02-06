import React, { FC, useMemo, useCallback } from "react";
import { Text, TouchableOpacity, View } from 'react-native';
import Image from "../../components/Image/Image";
import styles from "../events/style";
import { EventDetailProps } from "../../types";
import { useEventsContext } from "../../data/globalState";

export const EventDetail: FC<EventDetailProps> = (props: EventDetailProps) => {

  const { route, navigation } = props;
  const { id, isUserEvent } = route.params;
  const { events, userName, updateEventTracking } = useEventsContext();

  // Memoize the event based on its ID to prevent unnecessary re-renders
  const event = useMemo(() => events.find(event => event.id === id), [events, id]);

  // Memoize the callback function to prevent unnecessary re-renders
  const setTrackedEvent = useCallback(() => {
    updateEventTracking(event!.id, !isUserEvent);
    navigation.goBack();
  }, [event?.id, isUserEvent, navigation, updateEventTracking]);

  const isTracked = useMemo(() => event?.visitors?.includes(userName!), [event!.visitors, userName]);

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Image resizeMode="cover" source={{ uri: event!.image }} style={styles.detailedImage} />
          <View style={styles.cardDetails}>
            <Text style={styles.title}>{event?.title}</Text>
            <Text style={styles.description}>{event?.city}</Text>
            <Text style={styles.description}>{event?.description}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={setTrackedEvent}
          style={styles.button}>
          <Text style={styles.buttonText}>{isUserEvent ? "UnTrack Now" : "Track Now"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


//
// import React, { FC } from "react";
// import { Text, TouchableOpacity, View } from 'react-native';
// import Image from "../../components/Image/Image";
// import styles from "../events/style";
// import { EventDetailProps } from "../../types";
// import { useEventsContext } from "../../data/globalState";
//
// export const EventDetail: FC<EventDetailProps> = (props: EventDetailProps) => {
//
//   const { route, navigation } = props;
//   const { id, isUserEvent } = route.params
//   const { events, userName, updateEventTracking } = useEventsContext()
//   const event = events.filter(event => event.id === id)[0]
//   const isTracked = event.visitors?.filter((name) => name === userName)
//   const setTrackedEvent = () => {
//     updateEventTracking(event.id, !isUserEvent)
//     navigation.goBack()
//   }
//
//   return (<View style={styles.container}>
//     <View style={styles.cardContainer}>
//       <View style={styles.card}>
//         <Image resizeMode="cover" source={{ uri: event.image }} style={styles.detailedImage} />
//         <View style={styles.cardDetails}>
//           <Text style={styles.title}>{event.title}</Text>
//           <Text style={styles.description}>{event.city}</Text>
//           <Text style={styles.description}>{event.description}</Text>
//         </View>
//       </View>
//       <TouchableOpacity
//         onPress={setTrackedEvent}
//         style={styles.button}>
//         <Text style={styles.buttonText}>{isUserEvent ? "UnTrack Now" : "Track Now"}</Text>
//       </TouchableOpacity>
//     </View>
//   </View>)
//
// }
//
