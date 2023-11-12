import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList } from "react-native";
import home_styles from "../Home/home_style";
import note_create_styles from "./create_note_style.js";
import Ionicons from 'react-native-vector-icons/Ionicons';
import RadioButton from "./components/Radio_button.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Create_note = ({ navigation, route }) => {
  const [selectedCategory, setSelectedCategory] = useState(2);
  const [title, setTitle] = useState('');
  const [Categorylist, setCategorylist] = useState([]);
  const [noteList, setNoteList] = useState([]);
  const [detail, setDetail] = useState('');
  const [id, setID] = useState('');
  const { noteData, defaultCategory, isEditing } = route.params;

  const navigate_to_home = () => {
    console.log("Navigating to Home");
    navigation.navigate("Home");
  };

  useEffect(() => {
    getNoteList();
    getCategorylist();

    if (isEditing && noteData) {
      setTitle(noteData.header || '');
      setDetail(noteData.text || ''); 
      setID(noteData.id || '');       
      setSelectedCategory(noteData.categoryId || ''); 
    } else if (defaultCategory) {
      setSelectedCategory(defaultCategory);
    }

    console.log("default ID : " + defaultCategory);
    console.log("Active ID : " + (noteData ? noteData.categoryId : ''));
  }, []);

  const onPressFunction = () => { 
    isEditing ? handleChange() : handleCreate();
    console.log("Pressing");
  }
  const buttonText = isEditing ? 'Save' : 'Create';

  const getNoteList = async () => {
    const noteList = await AsyncStorage.getItem("noteList").then(res => JSON.parse(res));
    setNoteList([...noteList]);
  };

  const getCategorylist = async () => {
    const Categorylist = await AsyncStorage.getItem("Categorylist").then(res => JSON.parse(res));
    setCategorylist([...Categorylist]);
  };

  const handleCreate = async () => {
    try {
      const noteData = { id: noteList.length + 1, header: title, text: detail, categoryId: selectedCategory };
  
      await AsyncStorage.setItem("noteList", JSON.stringify([...noteList, noteData]));
      console.log("Create Working");
      navigate_to_home();
    } catch (error) {
      console.error("Error creating a new note in AsyncStorage:", error);
    }
  };
  
  const handleChange = async () => {
    try {
      const updatedNoteList = noteList.map((note) =>
        note.id === id ? { ...note, header: title, text: detail, categoryId: selectedCategory } : note
      );
  
      await AsyncStorage.setItem("noteList", JSON.stringify(updatedNoteList));
      console.log("Change Working");
      navigate_to_home();
    } catch (error) {
      console.error("Error updating noteList in AsyncStorage:", error);
    }
  };
  const filteredCategorylist = Categorylist.filter((item) => item.c_name !== "All");

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
          value={title}
        />
      </View>
      {/* ttl select */}

      <View>
        <Text style={[note_create_styles.cmn_ttl, { marginBottom: 20 }]}>Category</Text>
        {Categorylist.length > 0 && (
          <FlatList
            data={filteredCategorylist}
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
        )}
      </View>
      {/* category select */}

      <View>
        <Text style={[note_create_styles.cmn_ttl, { marginTop: 30 }]}>Detail</Text>

        <TextInput
          style={note_create_styles.detail_input}
          textAlignVertical="top"
          multiline={true}
          onChangeText={(text) => setDetail(text)}
          value={detail}
        />
      </View>
      {/* note */}

      <View style={note_create_styles.btnContain}>
        <TouchableOpacity disabled={isButtonDisabled} onPress={onPressFunction}>
          <Text style={[note_create_styles.create_btn, isButtonDisabled ? { opacity: 0.5 } : null]}>
            {buttonText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Create_note;
