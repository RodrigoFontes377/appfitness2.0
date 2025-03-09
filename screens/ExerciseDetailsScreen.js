import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

const ExerciseDetailsScreen = ({ route, navigation }) => {
  const { exercise } = route.params || {};
  const [exerciseDetails, setExerciseDetails] = useState(null);

  useEffect(() => {
    if (exercise) {
      setExerciseDetails(exercise);
    }
  }, [exercise]);

  if (!exerciseDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  const addToWorkout = () => {
    navigation.navigate("MyWorkouts", {
      exercise: { ...exerciseDetails },
    });

    Alert.alert("✅ Sucesso", "Exercício adicionado ao seu treino!");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{exerciseDetails.name}</Text>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: exerciseDetails.gifUrl }}
            style={styles.image}
          />
        </View>

        <Text style={styles.subtitle}>Instruções:</Text>
        {exerciseDetails.instructions?.length > 0 ? (
          exerciseDetails.instructions.map((instruction, index) => (
            <Text key={index} style={styles.instruction}>
              {index + 1}. {instruction}
            </Text>
          ))
        ) : (
          <Text style={styles.noInstructions}>
            Nenhuma instrução disponível.
          </Text>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={addToWorkout}>
        <Text style={styles.buttonText}>➕ Adicionar ao Treino</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 80,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  loadingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#16A085",
    marginTop: 20,
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 15,
    resizeMode: "cover",
  },
  instruction: {
    fontSize: 18,
    color: "#444",
    backgroundColor: "#E8F6F3",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  noInstructions: {
    fontSize: 18,
    color: "#777",
    fontStyle: "italic",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2ECC71",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ExerciseDetailsScreen;
