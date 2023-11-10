import { View, Text, TouchableOpacity, TextInput, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
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

  const navigate_to_home = () => {
    navigation.navigate("Home");
  };

  useEffect(() => {
    getNoteList();
    getCategorylist();
    setSelectedCategory(defaultCategory);

    const { noteData, defaultCategory } = route.params || {};
    if (noteData) {
      setTitle(noteData.header);
      setDetail(noteData.text);
      setID(noteData.id);
      setSelectedCategory(noteData.categoryId);
    } else if (defaultCategory) {
      setSelectedCategory(defaultCategory);
    }
    console.log("default ID : " + defaultCategory);
    console.log("Active ID : " + noteData.categoryId);
  }, []);

  const getNoteList = async () => {
    const noteList = await AsyncStorage.getItem("noteList").then(res => JSON.parse(res));
    setNoteList([...noteList]);
  };

  const getCategorylist = async () => {
    const Categorylist = await AsyncStorage.getItem("Categorylist").then(res => JSON.parse(res));
    setCategorylist([...Categorylist]);
  };

  const handleCreate = () => {
    const noteData = { id: noteList.length + 1, header: title, text: detail, categoryId: selectedCategory };
    AsyncStorage.setItem("noteList", JSON.stringify([...noteList, noteData]));
    navigate_to_home();
  };

  const handleChange = () => {
    const updatedNoteList = noteList.map((note) =>
      note.id === id ? { ...note, header: title, text: detail, categoryId: selectedCategory } : note
    );
  
    AsyncStorage.setItem("noteList", JSON.stringify(updatedNoteList));
    navigate_to_home();
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
        <TouchableOpacity disabled={isButtonDisabled} onPress={handleCreate}>
          <Text style={[note_create_styles.create_btn, isButtonDisabled ? { opacity: 0.5 } : null]}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={isButtonDisabled} onPress={handleChange}>
          <Text style={[note_create_styles.create_btn, isButtonDisabled ? { opacity: 0.5 } : null, { marginLeft: 10 }]}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Create_note;
