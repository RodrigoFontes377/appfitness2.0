import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@myTrainings";

const MyWorkoutsScreen = ({ route }) => {
  const navigation = useNavigation();
  const [myTrainings, setMyTrainings] = useState([]);

  // 🔹 Carregar treinos do AsyncStorage quando a tela abrir
  useEffect(() => {
    console.log("Tentando carregar treinos...");
    loadTrainings();
  }, []);

  // 🔹 Verifica se um novo exercício foi passado na navegação
  useEffect(() => {
    if (route.params?.exercise) {
      console.log(" Novo exercício recebido:", route.params.exercise);
      addExerciseToPlan(route.params.exercise);
    }
  }, [route.params?.exercise]);

  // 🔹 Carregar treinos salvos do AsyncStorage
  const loadTrainings = async () => {
    try {
      const storedTrainings = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTrainings) {
        const parsedTrainings = JSON.parse(storedTrainings);
        console.log(" Treinos carregados do AsyncStorage:", parsedTrainings);
        setMyTrainings(parsedTrainings); // Atualiza a lista
      }
    } catch (error) {
      console.error(" Erro ao carregar exercícios:", error);
    }
  };

  // 🔹 Salvar treinos no AsyncStorage
  const saveTrainings = async (trainings) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(trainings));
      console.log("Treinos salvos no AsyncStorage:", trainings);
    } catch (error) {
      console.error(" Erro ao salvar exercícios:", error);
    }
  };

  // Adicionar exercício ao treino sem substituir os anteriores
  const addExerciseToPlan = async (exercise) => {
    try {
      const storedTrainings = await AsyncStorage.getItem(STORAGE_KEY);
      const prevTrainings = storedTrainings ? JSON.parse(storedTrainings) : [];

      // Impede a duplicação de exercícios
      if (prevTrainings.some((item) => item.id === exercise.id)) {
        Alert.alert("Atenção", "Este exercício já está na lista.");
        return;
      }

      const updatedList = [...prevTrainings, exercise];
      setMyTrainings(updatedList);
      saveTrainings(updatedList);
    } catch (error) {
      console.error("🚨 Erro ao adicionar exercício:", error);
    }
  };

  //  Remover exercício da lista
  const removeExercise = async (exerciseId) => {
    try {
      const storedTrainings = await AsyncStorage.getItem(STORAGE_KEY);
      const prevTrainings = storedTrainings ? JSON.parse(storedTrainings) : [];

      const updatedList = prevTrainings.filter(
        (exercise) => exercise.id !== exerciseId
      );

      setMyTrainings(updatedList);
      await saveTrainings(updatedList);
      Alert.alert("Removido", "Exercício removido do treino!");
    } catch (error) {
      console.error(" Erro ao remover exercício:", error);
    }
  };

  // 🔹 Renderiza cada item da lista
  const renderItem = ({ item }) => (
    <View style={styles.exerciseItem}>
      <TouchableOpacity
        style={styles.exerciseTextContainer}
        onPress={() =>
          navigation.navigate("Exercícios", {
            screen: "ExerciseDetails",
            params: { exercise: item },
          })
        }
      >
        <Text style={styles.exerciseText}>{item.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => removeExercise(item.id)}
        style={styles.removeButton}
      >
        <Ionicons name="trash" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Treinos</Text>

      {/* 🔹 Verifica se a lista está vazia */}
      {myTrainings.length > 0 ? (
        <FlatList
          data={myTrainings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.emptyText}>📭 Nenhum exercício adicionado.</Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Exercícios"); // Alterar para usar navigate
        }}
      >
        <Ionicons name="add" size={24} color="white" />
        <Text style={styles.buttonText}>Adicionar Exercício</Text>
      </TouchableOpacity>
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
  emptyText: {
    fontSize: 18,
    color: "#777",
    textAlign: "center",
    marginTop: 20,
  },
  exerciseItem: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  exerciseTextContainer: { flex: 1 },
  exerciseText: { fontSize: 18, color: "#333" },
  removeButton: { padding: 5 },
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default MyWorkoutsScreen;
