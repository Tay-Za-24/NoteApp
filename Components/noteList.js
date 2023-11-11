import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal } from "react-native";
import home_styles from "../screen/Home/home_style";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CategoryColors } from "../util/color";

const NoteList = ({
  longPressNoteId,
  handleLongPressNote,
  deleteNote,
  filteredNotes,
  navigation,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteNoteId, setDeleteNoteId] = useState(null);

  const getNoteBackgroundColor = (noteIndex) => {
    const colorIndex = noteIndex % 5;
    return CategoryColors[colorIndex];
  };

  const navigate_to_CreateNote = (noteData) => {
    navigation.navigate('Create_Note', { noteData });
  };

  const renderItem = ({ item, index }) => {
    const isLongPress = item.id === longPressNoteId;
    return (
      <TouchableOpacity onLongPress={() => {handleLongPressNote(item.id)}}>
        <View
          style={[
            home_styles.note_box,
            {
              backgroundColor: getNoteBackgroundColor(index),
              marginRight: index % 2 === 0 ? 18 : 0,
            },
          ]}
        >
          <View style={home_styles.text_box}>
            <View style={{ flexDirection: "row" }}>
              <Text style={home_styles.note_header}>{item.header}</Text>
              {isLongPress && (
                <>
                  <TouchableOpacity
                    style={home_styles.deleteContain}
                    onPress={() => {
                      setDeleteNoteId(item.id);
                      setModalVisible(true);
                    }}
                  >
                    <Ionicons
                      style={home_styles.deleteIcon}
                      name="trash-outline"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={home_styles.editContain}>
                  <Ionicons
                    style={home_styles.editBtn}
                    name="create-outline"
                    onPress={() => navigate_to_CreateNote(item)}
                  />
                  </TouchableOpacity>
                </>
              )}
            </View>
            <Text style={{ fontSize: 12 }}>{item.text}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Modal visible={modalVisible} transparent>
        <View style={home_styles.alertContain}>
          <View style={home_styles.alertBox}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Are you sure you want to delete the note?
            </Text>
            <View style={home_styles.btnContain}>
              <TouchableOpacity
                style={home_styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={home_styles.btnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={home_styles.deleteBtn}
                onPress={() => {
                  deleteNote(deleteNoteId);
                  setModalVisible(false);
                }}
              >
                <Text style={home_styles.btnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{ height: "70%"}}>
        <FlatList
          data={filteredNotes}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          numColumns={2}
        />
      </View>
    </>
  );
};

export default NoteList;
