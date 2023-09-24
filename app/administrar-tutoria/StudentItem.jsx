import React from "react";
import {View, Text, StyleSheet} from "react-native";

const StudentItem = ({student}) => {
    return (
    <View  key={student.id} style={{backgroundColor: 'grey', borderWidth: 1,
    borderRadius: 20,
    padding: 4}}>
        <Text>Cédula: {student.id}</Text>
        <Text>Nombre: {student.name}</Text>
        <Text>Correo: {student.email}</Text>
        <Text>Teléfono: {student.phone}</Text>
    </View>
    );
};

export default StudentItem;