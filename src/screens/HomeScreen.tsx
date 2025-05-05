import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import useCustomStateReducer from "../hooks/useCustomStateReducer";

const HomeScreen = () => {
  const { state, update, reset } = useCustomStateReducer<{ names: string[] }>({
    names: [],
  });

  const [inputName, setInputName] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null); // düzenleme modundaki index

  const addName = () => {
    if (inputName.trim() === "") return;
    update("names", [...state.names, inputName]);
    setInputName("");
  };

  const startEditing = (index: number) => {
    setInputName(state.names[index]);
    setEditIndex(index);
  };

  const updateName = () => {
    if (editIndex === null || inputName.trim() === "") return;

    const updatedNames = [...state.names];
    updatedNames[editIndex] = inputName;

    update("names", updatedNames);
    setInputName("");
    setEditIndex(null);
  };

  const handleReset = () => {
    setInputName("");
    setEditIndex(null);
    reset();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Name List</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter a name"
        value={inputName}
        onChangeText={setInputName}
      />

      <View style={styles.buttonContainer}>
        {editIndex === null ? (
          <Button title="Add Name" onPress={addName} />
        ) : (
          <Button title="Update" onPress={updateName} color="orange" />
        )}
        <Button title="Reset List" onPress={handleReset} color="red" />
      </View>

      <FlatList
        data={state.names}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => startEditing(index)}>
            <View style={styles.item}>
              <Text>{item}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No names added</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  item: {
    padding: 15,
    backgroundColor: "#eee",
    borderRadius: 5,
    marginBottom: 10,
  },
  empty: {
    fontStyle: "italic",
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
});

export default HomeScreen;
