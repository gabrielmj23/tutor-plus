import React from "react";
import {View, Text, StyleSheet} from "react-native";

const StudentItem = ({student}) => {
    console.log(student);
    return (
    <View key={student.id}>
        <Text>{student.id}</Text>
        <Text>{student.name}</Text>
        <Text>{student.email}</Text>
        <Text>{student.phone}</Text>
    </View>
    );
};

export default StudentItem;