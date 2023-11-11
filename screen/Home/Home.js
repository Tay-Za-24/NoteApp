import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import home_styles from './home_style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import CategoryList from '../../Components/categoryList';
import NoteList from '../../Components/noteList'; 

const Home = ({ navigation }) => {
  const [text, setText] = useState('');
  const [noteList, setNoteList] = useState([]);
  const [Categorylist, setCategorylist] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [longPressNoteId, setLongPressNoteId] = useState(null);
  const isFocus = useIsFocused();

  useEffect(() => {
    // run the two lines of code under this comment to see default categories and notes.
    //and delete it once u run it so that u can update categories and notes.

    // AsyncStorage.setItem("noteList" , JSON.stringify(note_data))
    // AsyncStorage.setItem("Categorylist" , JSON.stringify(categories))
    if (isFocus) {
      getNoteList();
      getCategorylist();
      setLongPressNoteId(null);
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

  const navigate_to_CreateNote = (noteData) => {
    const defaultCategory = 2; 
    navigation.navigate('Create_Note', { noteData, defaultCategory });
  };

  const navigate_to_CreateCategory = () => {
    navigation.navigate('Create_Category');
  };

  const getCategoryId = (categoryName) => {
    const category = Categorylist.find((item) => item.c_name === categoryName);
    return category ? category.key : 'All';
  };

  const deleteNote = async (noteId) => { 
    const updatedNotes = noteList.filter((note) => note.id !== noteId);
    await AsyncStorage.setItem("noteList", JSON.stringify(updatedNotes)); 
    setNoteList(updatedNotes);
  };

  const filteredNotes = noteList.filter((note) => {
    const lowerCaseHeader = note.header.toLowerCase();
    const lowerCaseText = note.text.toLowerCase();
    const lowerCaseSearchText = text.toLowerCase();
  
    if (activeCategory === "All") {
      return (
        lowerCaseHeader.includes(lowerCaseSearchText) || lowerCaseText.includes(lowerCaseSearchText)
      );
    } else {
      const categoryId = getCategoryId(activeCategory);
      return (
        (lowerCaseHeader.includes(lowerCaseSearchText) || lowerCaseText.includes(lowerCaseSearchText)) && (note.categoryId === categoryId)
      );
    }
  });

  return (
    <View style={home_styles.main}>
      <View style={home_styles.header}>
        <Text style={home_styles.main_ttl}>NOTE</Text>
        <Text style={[home_styles.main_ttl, { color: '#6FC6F9' }]}>APP</Text>
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
      <CategoryList 
        Categorylist={Categorylist}
        activeCategory={activeCategory}
        handleCategoryClick={handleCategoryClick}
        navigate_to_CreateCategory={navigate_to_CreateCategory}
      />

        <NoteList
          noteList={noteList}
          activeCategory={activeCategory}
          text={text}
          longPressNoteId={longPressNoteId}
          handleLongPressNote={setLongPressNoteId}
          deleteNote={deleteNote}
          filteredNotes={filteredNotes}
          navigation={navigation}
        />

        <TouchableOpacity
          style={home_styles.buttonContainer}
          onPress={() => navigate_to_CreateNote({})}
        >
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
