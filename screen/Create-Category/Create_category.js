import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import home_styles from "../Home/home_style";
import note_create_styles from "../Create-note/create_note_style"
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Create_Category = ({ navigation }) => {
    const [Categorylist, setCategorylist] = useState([])
    const [title, setTitle] = useState('');

    useEffect(() => {
        getCategorylist()
    })

    const getCategorylist = async() => {
        const Categorylist = await AsyncStorage.getItem("Categorylist").then(res => JSON.parse(res))
        setCategorylist([...Categorylist])
    }

    const addCategory = () => {
        const categoryData = {key: Categorylist.length + 1, c_name : title};
        AsyncStorage.setItem("Categorylist", JSON.stringify([...Categorylist, categoryData]))
        navigation.navigate("Home")
    }

    const isButtonDisabled = !(title);

    const navigate_to_home = () =>{
        navigation.navigate("Home")
    }

    return(
        <View style={home_styles.main}>
            <View style={home_styles.header}>
                <TouchableOpacity style= {{justifyContent : 'center'}} onPress={navigate_to_home}>
                    <Ionicons style= {note_create_styles.back_button} name="chevron-back-outline" />
                </TouchableOpacity>
                <Text style={home_styles.main_ttl}>NOTE</Text>
                <Text style={[home_styles.main_ttl , {color : "#B0E9CA"}]}>APP</Text>
                <Text style={home_styles.main_ttl}>.</Text>
            </View>
            {/* Header */}

            <View>
                <Text style= {note_create_styles.cmn_ttl}>Title</Text>
                <TextInput 
                    style={note_create_styles.ttl_input}
                    placeholder="Enter Title"
                    onChangeText={(text) => setTitle(text)}
                    value={title}
                />
            </View>
            {/* ttl select */}

            <View>
                <TouchableOpacity disabled={isButtonDisabled} onPress={addCategory}>
                    <Text style={[note_create_styles.create_btn, 
                                {position : "absolute", top : 430}, 
                                isButtonDisabled ? { opacity: 0.5 } : null]}>Create</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Create_Category