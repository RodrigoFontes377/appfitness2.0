import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import api from "../services/api";

const TrainingScreen = ({ navigation }) => {
  const [exercises, setExercises] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState("");
  const [bodyPartList, setBodyPartList] = useState([]);

  useEffect(() => {
    const fetchBodyParts = async () => {
      try {
        const response = await api.get("/bodyPartList");
        setBodyPartList(response.data);
      } catch (error) {
        console.error("Erro ao buscar partes do corpo:", error);
      }
    };
    fetchBodyParts();
  }, []);

  useEffect(() => {
    if (selectedBodyPart) {
      const fetchExercises = async () => {
        try {
          const response = await api.get(`/bodyPart/${selectedBodyPart}`);
          setExercises(response.data);
        } catch (error) {
          console.error("Erro ao buscar exercícios:", error);
        }
      };
      fetchExercises();
    }
  }, [selectedBodyPart]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha sua Rotina</Text>
      <Picker
        selectedValue={selectedBodyPart}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedBodyPart(itemValue)}
      >
        <Picker.Item label="Selecione uma parte do corpo" value="" />
        {bodyPartList.map((bodyPart, index) => (
          <Picker.Item key={index} label={bodyPart} value={bodyPart} />
        ))}
      </Picker>

      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate("ExerciseDetails", { exercise: item })
            }
          >
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  picker: { height: 50, width: "100%", marginBottom: 20 },
  item: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  itemText: { fontSize: 18, color: "#333" },
});

export default TrainingScreen;
