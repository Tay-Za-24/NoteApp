
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screen/Home/Home.js";
import Create_note from "../screen/Create-note/Create_note.js";
import Create_Category from "../screen/Create-Category/Create_category.js";

const Stack = createNativeStackNavigator()

const MainNavigator = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
                <Stack.Screen name="Create_Note" component={Create_note} options={{headerShown:false}}/>
                <Stack.Screen name="Create_Category" component={Create_Category} options={{headerShown:false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator
