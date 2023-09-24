import React from "react";
import {View,Text, FlatList, StyleSheet} from "react-native";
import students from "./data/StudentsExample.js";
import StudentItem from "./StudentItem.jsx";
const StudentList = () => {
    return (
        <FlatList 
            data = {students}
            ItemSeparatorComponent={() => <Text> </Text>}
            renderItem={({item: student}) => <StudentItem  student={student} />
            }
        />
    )
}

export default StudentList;