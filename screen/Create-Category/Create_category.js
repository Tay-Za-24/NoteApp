import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import home_styles from "../Home/home_style";
import note_create_styles from "../Create-note/create_note_style"
import Ionicons from 'react-native-vector-icons/Ionicons';

const Create_Category = ({ navigation, onAddCategory }) => {
    const [newCategoryName, setNewCategoryName] = useState('');
    const [title, setTitle] = useState('');

    const handleAddCategory = async () => {
        if (newCategoryName) {
          try {
            
            // const existingCategories = await AsyncStorage.getItem('categories');
            // const categories = existingCategories ? JSON.parse(existingCategories) : [];
      
            
            // const newCategory = {
            //   c_name: newCategoryName,
            //   key: categories.length + 1,
            // };
            // categories.push(newCategory);
      
            
            // await AsyncStorage.setItem('categories', JSON.stringify(categories));
            
            
            // setNewCategoryName('');
            
          } catch (error) {
            console.error('Error adding category:', error);
          }
        }
      };

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
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                />
            </View>
            {/* ttl select */}

            <View>
                <TouchableOpacity disabled={isButtonDisabled} onClick={handleAddCategory}>
                    <Text style={[note_create_styles.create_btn, 
                                {position : "absolute", top : 430}, 
                                isButtonDisabled ? { opacity: 0.5 } : null]}>Create</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Create_Category