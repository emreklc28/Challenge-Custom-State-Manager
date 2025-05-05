import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import useCustomStateReducer from "../hooks/useCustomStateReducer";

const CustomReducerTestScreen = () => {
  const { state, update, reset} = useCustomStateReducer({
    count: 0,
    name: "",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name: {state.name}</Text>
      <TextInput
        style={styles.input}
        value={state.name}
        placeholder="Enter name"
        onChangeText={(text) => update("name", text)}
      />

      <Text style={styles.label}>Count: {state.count}</Text>
      <Button title="Increase Count" onPress={() => update("count", state.count + 1)} />
      <Button title="Reset State" onPress={reset} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 18, marginVertical: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    marginBottom: 20,
  },
});

export default CustomReducerTestScreen;
