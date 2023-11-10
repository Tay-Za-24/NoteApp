import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import home_styles from '../screen/Home/home_style';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CategoryList = ({ Categorylist, activeCategory, handleCategoryClick, navigate_to_CreateCategory }) => {
  return (
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
              home_styles.category,
              item.c_name === activeCategory ? home_styles.selected_category : null,
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
  );
};

export default CategoryList;
