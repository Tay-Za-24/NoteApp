import { StyleSheet } from 'react-native';

const home_styles = StyleSheet.create({
        main : {
          paddingTop:80,
          paddingLeft: 15,
          paddingRight:15,
          paddingBottom:10,
        },

        header:{
          flexDirection:'row',
          justifyContent: 'center',
          marginBottom:20
        },

        main_ttl : {
          fontSize:35,
          letterSpacing:5,
          marginRight:10,
          fontWeight:'500'
        },

        search_bar: {
          flexDirection: 'row',
          justifyContent: 'center',
        },

        search_icon:{
          fontSize:25,
          position:'absolute',
          left:40,
          top:10,
          color : "#7C7C7C"
        },

        input: {
          height: 50,
          width: 300,
          borderWidth: 1,
          paddingTop: 10,
          paddingBottom:10,
          paddingLeft:40,
          borderColor: "#ECECEC",
          borderRadius: 10,
          marginBottom: 20,
        },

        reset_icon:{
          fontSize:30,
          position: 'absolute',
          right: 45,
          top: 8,
          color : "#7C7C7C"
        },

        categories_container:{
          flexDirection: 'row',
          marginBottom : 40,
        },

        category:{
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft:10,
          paddingRight:10,
          color: "#7C7C7C",
          justifyContent: 'center',
          borderWidth: 2,
          borderColor: "#7C7C7C",
          borderRadius:7,
          marginRight:10,
        },

        selected_category : {
          backgroundColor : "black",
          color: "white",
          borderColor : "black"
        },

        add_category : {
          fontSize : 30,
          color : "#7C7C7C",
        },

        note_box : {
          position : 'relative',
          width : 172,
          height : 100,
          paddingTop : 18,
          paddingBottom : 18,
          paddingLeft : 16,
          paddingRight : 16,
          borderRadius : 10,
          marginBottom : 25,
        },

        text_box : {
          width : "90%"
        },

        note_header : {
          fontWeight : "bold",
          paddingBottom : 10,
          fontSize : 14
        },

        editContain : {
          position : 'absolute',
          right : -20,
        },

        editBtn : {
          fontSize : 20,
        },

        deleteContain : {
          position : 'absolute',
          right : -20,
          top : 40,
        },

        deleteIcon : {
          fontSize : 20,
        },

        alertContain : {
          height: "100%",
          alignItems : 'center',
          paddingTop : 350,
          backgroundColor : '#00000050'
        },  

        alertBox: {
          width: 317,
          height: 130,
          margin: 0,
          backgroundColor: 'white',
          borderWidth : 1,
          padding: 15,
          borderRadius : 10,
          alignItems: 'center',
        },

        btnContain : {
          marginTop : 30,
          flexDirection : 'row'
        },

        cancelBtn : {
          alignItems: 'center',
          backgroundColor : 'gray',
          width : 80,
          height : 40,
          paddingTop : 8,
          borderRadius : 20,
          marginRight : 10,
        },

        deleteBtn : {
          alignItems: 'center',
          backgroundColor : 'crimson',
          width : 80,
          height : 40,
          paddingTop : 8,
          borderRadius : 20,
        },

        btnText : {
          fontWeight :'bold',
          fontSize : 16,
          color : 'white',
        },

        buttonContainer: {
          position:'absolute',
          right:25,
          top:700,
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: 'black',
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 10,
        },
        plusSign: {
          fontSize:35,
          color: 'white',
        },
      });

export default home_styles
        


        