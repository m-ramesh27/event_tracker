import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:100,
        backgroundColor:'white'
        //justifyContent: 'center',
        
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
      },
      titleText:{
        fontSize:18,
        fontWeight:'800',
        alignSelf:'center',
        marginVertical:20,
      },
      inputContainer:{
        justifyContent: 'center',
        padding: 20,
        margin:20,
        borderColor:'red',
        paddingVertical:40,
        //alignItems:'center',
        backgroundColor:'white',
        borderRadius:8
      },
      input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 8,
        backgroundColor: '#fff',
        padding:12
      },
      button: {
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        padding: 10,
        paddingHorizontal:40,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center'
      },
      shadow: {
        ...Platform.select({
          ios: {
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 2,
          },
          android: {
            elevation: 4,
          },
        })
    },
})
export default styles