import {Platform, StyleSheet} from 'react-native';
import { scale } from "../../common";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  listBottom:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:5

  },

  emptyView: {
    flex: 1,
    marginTop:scale(100),
    justifyContent: 'center',
    alignItems: 'center',

  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  containerView: {
    padding: 8,
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cityContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  cityRow: {
    flexDirection: 'row',
  },
  cityText: {
    fontSize: 18,
  },
  downArrow: {
    fontSize: 18,
    marginHorizontal: 5,
  },
  clearButton: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },

  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 10,
    paddingHorizontal: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  card: {

  },
  cardContainer: {
    margin: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',

    flex: 1,
  },
  image: {
    height: 120, // Adjust the height as needed
    width: '100%',
    resizeMode: 'cover',
  },
  detailedImage: {
    height: 180, // Adjust the height as needed
    width: '100%',
    resizeMode: 'cover',
  },
  cardDetails: {
    padding: 10,
    backgroundColor: 'white',
    width: '100%', // Set background color to avoid shadow clipping on iOS
  },
  title: {
    fontSize: 16,
    width: '100%',
    fontWeight: 'bold',
  },
  description: {
    marginVertical: 5,
    color: 'gray',
    fontSize: 14,
  },
  paidView: {

    backgroundColor: 'purple',
    padding: 8,
    borderRadius: 8,
    width: scale(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  paidText: {
    fontWeight: '700',
    color: 'white',
    fontSize: 14,
  },
});
export default styles;
