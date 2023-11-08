import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import home_styles from './home_style';
import { CategoryColors } from '../../util/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';


const Home = ({ navigation }) => {
  const [text, setText] = useState('');
  const [noteList, setNoteList] = useState([])
  const [activeCategory, setActiveCategory] = useState('All');
  const isFocus = useIsFocused()

  useEffect(() => {
    // AsyncStorage.setItem("noteList", JSON.stringify(note_data))
    isFocus && true && getNoteList()
  }, [isFocus])

  const getNoteList = async () => {
    const noteList = await AsyncStorage.getItem("noteList").then(res => JSON.parse(res))
    setNoteList([...noteList])
  }

  const handleTextChange = (newText) => {
    setText(newText);
  };

  const clearSearchText = () => {
    setText('');
  };

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
  };

  const navigate_to_CreateNote = () => {
    navigation.navigate('Create_Note');
  };

  const navigate_to_CreateCategory = () => {
    navigation.navigate('Create_Category', { onAddCategory: addCategory });
  };

  const addCategory = (newCategory) => {

  };

  const getNoteBackgroundColor = (noteIndex) => {
    const colorIndex = noteIndex % CategoryColors.length;
    return CategoryColors[colorIndex];
  };

  const filteredNotes = note_data.filter((note) =>
    note.header.toLowerCase().includes(text.toLowerCase()) ||
    note.text.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <View style={home_styles.main}>
      <View style={home_styles.header}>
        <Text style={home_styles.main_ttl}>NOTE</Text>
        <Text style={[home_styles.main_ttl, { color: '#B0E9CA' }]}>APP</Text>
        <Text style={home_styles.main_ttl}>.</Text>
      </View>
      {/* Header */}

      <View style={home_styles.search_bar}>
        <Ionicons style={home_styles.search_icon} name="search-outline" />
        <TextInput
          style={home_styles.input}
          value={text}
          onChangeText={handleTextChange}
          placeholder="Search for notes"
        />
        {text.length > 0 && (
          <Ionicons
            style={home_styles.reset_icon}
            name="close-outline"
            size={25}
            onPress={clearSearchText}
          />
        )}
      </View>
      {/* Search Bar */}
      <ScrollView
        style={home_styles.categories_container}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => handleCategoryClick(item.c_name)}
          >
            <Text
              style={[
                home_styles.category,
                item.c_name === activeCategory
                  ? home_styles.selected_category
                  : null,
              ]}
            >
              {item.c_name}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={navigate_to_CreateCategory}>
          <Ionicons style={home_styles.add_category} name="add-circle-outline" />
        </TouchableOpacity>
      </ScrollView>

      <View style={home_styles.notes_container}>
        <FlatList
          data={noteList}
          renderItem={({ item, index }) => (
            <View
              style={[
                home_styles.note_box,
                { backgroundColor: getNoteBackgroundColor(index), marginRight: index % 2 === 0 ? 18 : 0 },
              ]}
            >
              <View style={home_styles.text_box}>
                <Text style={home_styles.note_header}>{item.header}</Text>
                <Text style={{ fontSize: 12 }}>{item.text}</Text>
              </View>
            </View>
          )}
          numColumns={2}
        />
      </View>

      <TouchableOpacity style={home_styles.buttonContainer} onPress={navigate_to_CreateNote}>
        <Ionicons style={home_styles.plusSign} name="add-outline" />
      </TouchableOpacity>
      {/* add note button */}
    </View>
  );
};

export default Home;


const categories = [
  { c_name: 'All', key: 1 },
  { c_name: 'Important', key: 2 },
  { c_name: 'Lecture Notes', key: 3 },
  { c_name: 'To-Do lists', key: 4 },
  { c_name: 'Shopping-list_Test', key: 5 },
];

const note_data = [
  { id: 1, header: 'Team Meeting', text: 'Hello fdfasdf dfdsfdffdfdsfdsfdfdf...', categoryId: 1 },
  { id: 2, header: 'AAA', text: 'Hello fdfasdf dfdsfdffdfdsfdsfdfdf...', categoryId: 1 },
  { id: 3, header: 'Shopping List', text: 'Hello fdfasdf dfdsfdffdfdsfdsfdfdf...', categoryId: 1 },
  { id: 4, header: 'Assignment 1', text: 'Hello fdfasdf dfdsfdffdfdsfdsfdfdf...', categoryId: 1 },
  { id: 5, header: 'Notes', text: 'Hello fdfasdf dfdsfdffdfdsfdsfdfdf...', categoryId: 1 },
];
