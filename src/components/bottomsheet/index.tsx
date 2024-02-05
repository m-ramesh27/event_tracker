import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet ,Modal as BottomSheet } from 'react-native';
import data from '../../data';

interface CityBottomSheetProps {
  isVisible: boolean;
  onSelect: (city: string) => void;
  onClose: () => void;
}

const CityBottomSheet: React.FC<CityBottomSheetProps> = ({ isVisible, onSelect, onClose }) => {
  const cities = [...new Set(data.map((event)=>event.city))]
  return (
    <BottomSheet  visible={isVisible} transparent animationType='slide'>
         <View style={styles.modalContainer}>
      <View style={styles.sheet}>
        <Text style={styles.title}>Select a City</Text>
        {cities.map((city) => (
          <TouchableOpacity key={city} onPress={() => onSelect(city)}>
            <Text style={styles.cityText}>{city}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View></View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
    container: {
      backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)',
    },
    sheet: {
      backgroundColor: 'white',
      padding: 16,
      width:'80%',
      height:'50%',
      marginHorizontal:12,
      borderTopEndRadius:12,
      borderTopStartRadius:12,
      
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    cityText: {
      fontSize: 18,
      marginBottom: 12,
    },
    closeButton: {
      marginTop: 16,
      color: 'blue',
      fontSize: 18,
    },
  });
  

export default CityBottomSheet;
