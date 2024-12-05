import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Todo from '../Screen/Routine/Todo';
import TodoForm from '../Screen/Routine/TodoForm';
import { Header } from '../app/Header';
import { Footer } from '../app/Footer';
import { viewStyles } from '../styles';
import { asPickerFormat } from './Components/timerCP';
import { useFocusEffect } from '@react-navigation/native';  // 추가

const Routine = ({ headerText, setHeaderText }) => {
  return (
    <View style={viewStyles.container}>
      <Header headerText={headerText} />
      <Main />
      <Footer setHeaderText={setHeaderText} />
    </View>
  );
};

const Main = () => {
  const [todos, setTodos] = useState([]);
  const [favoriteTodos, setFavoriteTodos] = useState([]);
  const [cat, setCategory] = useState('js');
  const [time, setTime] = useState(asPickerFormat(new Date()));

  const getTodos = async () => {
    // AsyncStorage에서 데이터를 가져오지만 기존 데이터를 덮어쓰지 않음
    const allTodo = await AsyncStorage.getItem('todos');
    const parsedTodos = JSON.parse(allTodo || '[]').map((todo) => ({
      ...todo,
      time: todo.time ? new Date(todo.time) : new Date(),
    }));
    
    // 기존 상태와 합치지 않고 새로운 할일만 추가
    setTodos((prevTodos) => {
      // 이미 저장된 데이터는 덮어쓰지 않도록 추가
      const updatedTodos = [...prevTodos];
      parsedTodos.forEach((todo) => {
        if (!updatedTodos.some(existingTodo => existingTodo.id === todo.id)) {
          updatedTodos.push(todo);
        }
      });
      return updatedTodos;
    });

    setFavoriteTodos(parsedTodos.filter(todo => todo.isFavorite));  // 즐겨찾기 목록 업데이트
  };

  const saveTodos = async () => {
    const serializedTodos = todos.map((todo) => ({
      ...todo,
      time: todo.time.toISOString(),
    }));
    await AsyncStorage.setItem('todos', JSON.stringify(serializedTodos));
  };

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    saveTodos();
  }, [todos, cat]);

  // 화면 포커스될 때마다 getTodos 실행
  useFocusEffect(
    React.useCallback(() => {
      getTodos(); // 데이터를 새로 불러오기
    }, [])
  );

  const addTodo = (todo) => {
    const validTodo = {
      ...todo,
      time: todo.time instanceof Date ? todo.time : new Date(),
    };
    setTodos((prevTodos) => [validTodo, ...prevTodos]);
  };

  const removeTodo = (id) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((todo) => todo.id !== id);
  
      // 삭제 후 favoriteTodos 업데이트
      setFavoriteTodos(updatedTodos.filter(todo => todo.isFavorite));
  
      return updatedTodos;
    });
  };

  const updateTodo = (todoId, updatedTodo) => {
    if (!updatedTodo.text || /^\s*$/.test(updatedTodo.text)) return;
  
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? { ...item, ...updatedTodo } : item))
    );
  
    // 즐겨찾기 목록을 실시간으로 업데이트
    setFavoriteTodos((prev) => {
      if (updatedTodo.isFavorite) {
        // 즐겨찾기 상태가 true이면 추가
        return [...prev, updatedTodo];
      } else {
        // 즐겨찾기 상태가 false이면 제거
        return prev.filter(todo => todo.id !== updatedTodo.id);
      }
    });
  };

  const completeTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.mainContents}>
      <Text style={styles.text}>오늘의 루틴은?</Text>

      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        completeTodo={completeTodo}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContents: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Routine;
