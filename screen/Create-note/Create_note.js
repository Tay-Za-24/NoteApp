import { View, Text, TouchableOpacity, TextInput, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import home_styles from "../Home/home_style";
import note_create_styles from "./create_note_style.js";
import Ionicons from 'react-native-vector-icons/Ionicons';
import RadioButton from "./components/Radio_button.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Create_note = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [title, setTitle] = useState('');
  const [noteList, setNoteList] = useState([])
  const [detail, setDetail] = useState('');

  const navigate_to_home = () => {
    navigation.navigate("Home");
  };

  useEffect(() => {
    getNoteList()
  })

  const getNoteList = async () => {
    const noteList = await AsyncStorage.getItem("noteList").then(res => JSON.parse(res))
    setNoteList([...noteList])
  }


  const handleCreate = () => {
    const noteData = { id: noteList.length + 1, header: title, text: detail, categoryId: selectedCategory }
    console.log(noteData);
    AsyncStorage.setItem("noteList", JSON.stringify([...noteList, noteData]))
    navigation.navigate("Home")
  }

  const isButtonDisabled = !(title && detail && selectedCategory);

  return (
    <View style={home_styles.main}>
      <View style={home_styles.header}>
        <TouchableOpacity style={{ justifyContent: 'center' }} onPress={navigate_to_home}>
          <Ionicons style={note_create_styles.back_button} name="chevron-back-outline" />
        </TouchableOpacity>
        <Text style={home_styles.main_ttl}>NOTE</Text>
        <Text style={[home_styles.main_ttl, { color: '#B0E9CA' }]}>APP</Text>
        <Text style={home_styles.main_ttl}>.</Text>
      </View>
      {/* Header */}

      <View>
        <Text style={note_create_styles.cmn_ttl}>Title</Text>
        <TextInput
          style={note_create_styles.ttl_input}
          placeholder="Enter Title"
          onChangeText={(text) => setTitle(text)}
        />
      </View>
      {/* ttl select */}

      <View>
        <Text style={[note_create_styles.cmn_ttl, { marginBottom: 20 }]}>Category</Text>
        <FlatList
          data={radio_categories}
          horizontal
          keyExtractor={(item) => item.key.toString()}
          renderItem={({ item }) => (
            <RadioButton
              label={item.c_name}
              selected={selectedCategory === item.key}
              onPress={() => setSelectedCategory(item.key)}
            />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {/* category select */}

      <View>
        <Text style={[note_create_styles.cmn_ttl, { marginTop: 30 }]}>Detail</Text>

        <TextInput
          style={note_create_styles.detail_input}
          textAlignVertical="top"
          multiline={true}
          onChangeText={(text) => setDetail(text)}
        />
      </View>
      {/* note */}

      <View>
        <TouchableOpacity disabled={isButtonDisabled} onPress={handleCreate}>
          <Text style={[note_create_styles.create_btn, isButtonDisabled ? { opacity: 0.5 } : null]}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const radio_categories = [
  { c_name: "Important", key: 1 },
  { c_name: "To-Do lists", key: 2 },
  { c_name: "Lecture Notes", key: 3 },
  { c_name: "Shopping-list", key: 4 },
];

export default Create_note;
