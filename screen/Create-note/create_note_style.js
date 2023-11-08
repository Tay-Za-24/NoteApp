import { StyleSheet } from 'react-native';

const note_create_styles = StyleSheet.create({
    back_button : {
        position: 'absolute',
        left : -60,
        fontSize : 40,
    },
    
    ttl_input : {
        backgroundColor : "#E8E8E8",
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft : 20,
        borderRadius : 10,
        marginTop : 10,
        marginBottom : 20,
    },

    cmn_ttl : {
        fontSize : 12,
        color : "#666666"
    },

    radio_button_container : {
        flexDirection: 'row',
        alignItems: 'center',
    },

    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },

    detail_input : {
        backgroundColor : "#E8E8E8",
        height : 300,
        borderRadius : 10,
        marginTop : 20,
        padding : 10,
    },

    create_btn : {
        width : 120,
        paddingTop : 16,
        paddingBottom : 16,
        textAlign: 'center', 
        backgroundColor : "#5DB075",
        color : "white",
        borderRadius : 30,
        marginTop : 30,
        left : "35%"
    }

})

export default note_create_styles