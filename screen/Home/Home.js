import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import home_styles from './home_style';
import { CategoryColors } from '../../util/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const Home = ({ navigation }) => {
  const [text, setText] = useState('');
  const [noteList, setNoteList] = useState([]);
  const [Categorylist, setCategorylist] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [longPressNoteId, setLongPressNoteId] = useState(null);
  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus) {
      getNoteList();
      getCategorylist();
    }
  }, [isFocus]);

  const getNoteList = async () => {
    const noteList = await AsyncStorage.getItem("noteList").then(res => JSON.parse(res));
    setNoteList([...noteList]);
  };

  const getCategorylist = async () => {
    const Categorylist = await AsyncStorage.getItem("Categorylist").then(res => JSON.parse(res));
    setCategorylist([...Categorylist]);
  };

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
    navigation.navigate('Create_Category');
  };

  const getNoteBackgroundColor = (noteIndex) => {
    const colorIndex = noteIndex % CategoryColors.length;
    return CategoryColors[colorIndex];
  };

  const getCategoryId = (categoryName) => {
    const category = Categorylist.find((item) => item.c_name === categoryName);
    return category ? category.key : 'All';
  };

  const deleteNote = async (noteId) => {
    await AsyncStorage.removeItem(`note_${noteId}`);
  
    const updatedNotes = noteList.filter((note) => note.id !== noteId);
    setNoteList(updatedNotes);
  };

  const renderItem = ({ item, index }) => {
    const isLongPress = item.id === longPressNoteId;
  
    return (
      <TouchableOpacity
        onLongPress={() => setLongPressNoteId(item.id)}
      >
        <View
          style={[
            home_styles.note_box,
            { backgroundColor: getNoteBackgroundColor(index), marginRight: index % 2 === 0 ? 18 : 0 },
          ]}
        >
          <View style={home_styles.text_box}>
            <View style={{ flexDirection: 'row'}}>
              <Text style={home_styles.note_header}>{item.header}</Text>
              {isLongPress && (
                <Ionicons
                  style={home_styles.deleteIcon}
                  name="trash-outline"
                  onPress={() => deleteNote(item.id)}
                />
              )}
            </View>
            <Text style={{ fontSize: 12 }}>{item.text}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const filteredNotes = noteList.filter((note) => {
    const lowerCaseHeader = note.header.toLowerCase();
    const lowerCaseText = note.text.toLowerCase();
    const lowerCaseSearchText = text.toLowerCase();
  
    if (activeCategory === "All") {
      return (
        lowerCaseHeader.includes(lowerCaseSearchText) ||
        lowerCaseText.includes(lowerCaseSearchText)
      );
    } else {
      const categoryId = getCategoryId(activeCategory);
      return (
        (lowerCaseHeader.includes(lowerCaseSearchText) ||
          lowerCaseText.includes(lowerCaseSearchText)) &&
        (note.categoryId === categoryId)
      );
    }
  });

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
        {Categorylist.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => handleCategoryClick(item.c_name)}
          >
            <Text
              style={[
                home_styles.category,item.c_name === activeCategory ? home_styles.selected_category : null,
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

      <View style={{ height: "70%" }}>
      <FlatList
        data={filteredNotes}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
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
  { c_name: 'Shopping-list', key: 5 },
];

const note_data = [
  { id: 1, header: 'Team Meeting', text: 'Hello fdfasdf dfdsfdffdfdsfdsfdfdf...', categoryId: 1 },
  { id: 2, header: 'AAA', text: 'Hello fdfasdf dfdsfdffdfdsfdsfdfdf...', categoryId: 2 },
  { id: 3, header: 'Shopping List', text: 'Hello fdfasdf dfdsfdffdfdsfdsfdfdf...', categoryId: 3 },
  { id: 4, header: 'Assignment 1', text: 'Hello fdfasdf dfdsfdffdfdsfdsfdfdf...', categoryId: 1 },
  { id: 5, header: 'Notes', text: 'Hello fdfasdf dfdsfdffdfdsfdsfdfdf...', categoryId: 3 },
];
