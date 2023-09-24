import React from "react";
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';



const TutoriaItem = ({ tutoria }) => {
    return (
      <View key={tutoria.id} style ={styles.container}>
        <Text style = {styles.titulo}>Tutoria # {tutoria.id}</Text>
        <Text>Tutor: {tutoria.tutor}</Text>
        <Text>Materia: {tutoria.materia}</Text>
        <Text>Dia: {tutoria.dia}  Hora: {tutoria.hora}</Text>
        <Text>Salon: {tutoria.salon}</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: "#eaeaea",
        paddingBottom: 5,
        paddingTop: 5,
    },
    titulo:{
        color: "skyblue",
        fontWeight: "bold",
        marginBottom: 5,
    }
});

  export default TutoriaItem;