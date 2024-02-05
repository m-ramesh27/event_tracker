import React, { FC, ComponentType, useState, useEffect } from 'react';
import {
  Switch,
  Text,
  PanResponder,
  TouchableOpacity,
  View,
  PanResponderGestureState,
  GestureResponderEvent,
  StyleSheet,
} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  DragEndParams,
} from 'react-native-draggable-flatlist';
import CityBottomSheet from '../components/bottomsheet';
import { useEventsContext } from '../data/globalState';
import { DraggableGrid } from 'react-native-draggable-grid';
import Image from '../components/Image/Image';
import styles from '../screens/events/style';
import { Event, EventsProps } from '../types';

const withEventList = <P extends EventsProps>(
  WrappedComponent: ComponentType<P>
): FC<P> => {
  const EventList: FC<P> = (props: P) => {
    const { navigation, route } = props;

    const [isGridMode, setIsGridMode] = useState(false);
    const [key, setKey] = useState(0);
    const [isVisible, setVisible] = useState(false);
    const [selectedCity, setCity] = useState('');
    const { events, userName } = useEventsContext();
    const [localEvents, setLocalEvents] = useState<Event[]>(events);
    const isUserEvent = route.name === 'TrackEvents';

    const navigateToDetail = (id: number) => {
      navigation.navigate('EventDetail', { id });
    };

    const onSwipeUp = (gestureState: PanResponderGestureState) => {};

    const onSwipeDown = (gestureState: PanResponderGestureState) => {};

    const onSwipeLeft = (gestureState: PanResponderGestureState) => {
      navigation.navigate('TrackEvents');
    };

    const onSwipeRight = (gestureState: PanResponderGestureState) => {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    };

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (
        evt: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => true,
      onPanResponderMove: (
        evt: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {},
      onPanResponderRelease: (
        evt: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {
        const { dx, dy } = gestureState;
        if (Math.abs(dx) > Math.abs(dy)) {
          if (dx > 0) {
            onSwipeRight(gestureState);
          } else {
            onSwipeLeft(gestureState);
          }
        } else {
          if (dy > 0) {
            onSwipeDown(gestureState);
          } else {
            onSwipeUp(gestureState);
          }
        }
      },
    });

    const onClose = () => {
      setVisible(false);
    };

    const selectCity = (city: string) => {
      setCity(city);
      setLocalEvents(events.filter((e) => e.city === city));
      onClose();
    };

    const openBottomSheet = () => {
      setVisible(true);
    };

    const onDragEnd = ({ data: reorderedData }: DragEndParams<Event>) => {
      setLocalEvents(reorderedData);
    };

    const getUserEvents = () => {
      return localEvents.filter((event) =>
        event.visitors?.some((name) => name === userName)
      );
    };

    const renderItem = ({ item, getIndex, drag }: RenderItemParams<Event>) => {
      return (
        <TouchableOpacity
          onLongPress={drag}
          onPress={() => navigateToDetail(item.id)}
          style={styles.cardContainer}
        >
          <View style={styles.card}>
            <Image
              resizeMode="cover"
              source={{ uri: item.image }}
              style={[styles.image]}
            />
            <View style={styles.cardDetails}>
              <Text numberOfLines={3} ellipsizeMode="tail" style={styles.title}>
                {item.title}
              </Text>
              <Text style={styles.description}>{item.city}</Text>
              <View style={styles.paidView}>
                <Text style={styles.paidText}>{item.description}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    };

    const cityName = selectedCity ? selectedCity : 'Showing All';

    const clearCitySelection = () => {
      setLocalEvents(events);
      setCity('');
    };

    const renderCityName = () => {
      return (
        <View style={styles.containerView}>
          <Text onPress={openBottomSheet} style={styles.headerText}>
            Select to change city
          </Text>
          <View style={styles.cityContainer}>
            <TouchableOpacity
              onPress={openBottomSheet}
              style={styles.cityRow}
            >
              <Text style={styles.cityText}>{cityName}</Text>
              <Text style={styles.downArrow}>&gt;</Text>
            </TouchableOpacity>
            {selectedCity ? (
              <Text onPress={clearCitySelection} style={styles.clearButton}>
                X
              </Text>
            ) : null}
          </View>
        </View>
      );
    };

    const renderEmptyView = () => (
      <View style={styles.emptyView}>
        <Text style={styles.emptyText}>NO EVENTS</Text>
      </View>
    );

    return (
      <View {...panResponder.panHandlers} style={[styles.container]}>
        {!isUserEvent ? (
          <View style={styles.switchContainer}>
            {renderCityName()}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'black', marginHorizontal: 8 }}>
                {isGridMode ? 'Grid' : 'List'}
              </Text>
              <Switch
                value={isGridMode}
                onValueChange={() => {
                  setIsGridMode(!isGridMode);
                  setKey(key === 1 ? 2 : 1);
                }}
              />
            </View>
          </View>
        ) : null}
        <DraggableFlatList
          key={key}
          ListEmptyComponent={renderEmptyView}
          numColumns={isGridMode ? 2 : 1}
          renderItem={renderItem}
          onDragEnd={onDragEnd}
          keyExtractor={(item, index) => index.toString()}
          data={isUserEvent ? getUserEvents() : localEvents}
        />
        <CityBottomSheet
          onClose={onClose}
          onSelect={selectCity}
          isVisible={isVisible}
        />
        <WrappedComponent {...props} />
      </View>
    );
  };

  return EventList;
};

export default withEventList;
