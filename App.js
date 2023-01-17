import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Header from "./components/Header";
import SandBox from "./components/SandBox";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

export default function App() {
  const [toDo, setToDo] = useState([
    { text: "meal prep ", key: 1 },
    { text: "workout", key: 2 },
    { text: "learn Swedish", key: 3 },
  ]);

  const pressHandler = (key) => {
    setToDo((prevToDo) => {
      return prevToDo.filter((todo) => todo.key != key);
    });
  };

  const submitHandler = (text) => {
    if (text.length === 0) {
      Alert.alert("OOPS!", "Todo must not be empty", [
        { text: "Understood", onPress: () => console.log("alert closed") },
      ]);
    } else {
      setToDo((prevToDo) => {
        return [{ text: text, key: Math.random() }, ...prevToDo];
      });
      Keyboard.dismiss();
    }
  };

  return (
    // <SandBox />
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <TodoForm submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={toDo}
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={pressHandler} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
});
