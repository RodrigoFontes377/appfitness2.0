import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏋️‍♂️ Bem-vindo ao AppFitness 2.0!</Text>
      <Text style={styles.subtitle}>
        Escolha seu treino ou acompanhe seu histórico!
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Treinos")}
      >
        <Ionicons name="barbell" size={24} color="white" />
        <Text style={styles.buttonText}>Plano de Treino</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Histórico")}
      >
        <Ionicons name="time" size={24} color="white" />
        <Text style={styles.buttonText}>Ver Histórico</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#777",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default HomeScreen;
