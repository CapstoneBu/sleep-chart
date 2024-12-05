import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Header } from '../app/Header';
import { Footer } from '../app/Footer'; // UILib 컴포넌트 임포트
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage 임포트
import { useFocusEffect } from '@react-navigation/native'; // useFocusEffect 임포트


const HomeScreen = ({ headerText, setHeaderText }) => {
  const [todos, setTodos] = useState([]);
  const [favoriteTodos, setFavoriteTodos] = useState([]);

  // todos를 AsyncStorage에서 불러오는 함수
  const getTodos = useCallback(async () => {
    try {
      const allTodos = await AsyncStorage.getItem('todos');
      const parsedTodos = JSON.parse(allTodos || '[]');
      setTodos(parsedTodos);
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  }, []);

  // todos 상태 변경 시 즐겨찾기 필터링
  const filterFavoriteTodos = useCallback(() => {
    setFavoriteTodos(todos.filter(todo => todo.isFavorite));
  }, [todos]);

  // 화면 포커스 시 데이터 로드
  useFocusEffect(
    useCallback(() => {
      getTodos(); // AsyncStorage에서 todos 불러오기
    }, [getTodos])
  );

  // todos가 변경되면 favoriteTodos를 업데이트
  React.useEffect(() => {
    filterFavoriteTodos();
  }, [todos, filterFavoriteTodos]);

  // 할 일 완료 처리 함수
  const completeTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  return (
    <View style={styles.container}>
      <Header headerText={headerText} />
      <Main
        favoriteTodos={favoriteTodos} // 즐겨찾기 목록 전달
        completeTodo={completeTodo}   // completeTodo 함수 전달
      />
      <Footer setHeaderText={setHeaderText} />
    </View>
  );
};

const Main = ({ favoriteTodos, completeTodo }) => {
  return (
    <View style={[styles.mainContents]}>
      <Text style={styles.text}>홈 화면</Text>
      <Text style={styles.text}>즐겨찾기 목록</Text>
      <View>
        {favoriteTodos.length === 0 ? (
          <Text>즐겨찾기 항목이 없습니다.</Text>
        ) : (
          favoriteTodos.map((todo) => {
            const todoTime = todo.time ? new Date(todo.time) : null;

            return (
              <View key={todo.id} style={styles.todoRow}>
                <Text>
                  {todoTime
                    ? todoTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    : '시간 없음'}{' '}
                  {todo.text}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.completeButton,
                    todo.isComplete && styles.completedButton, // 완료되면 핑크색 버튼
                  ]}
                  onPress={() => completeTodo(todo.id)} // completeTodo 호출
                >
                  <Text style={styles.completeButtonText}>완료</Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </View>
    </View>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  mainContents: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  todoRow: {
    marginBottom: 10,
  },
  completeButton: {
    backgroundColor: '#4CAF50', // 기본 초록색 배경
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  completedButton: {
    backgroundColor: '#FF69B4', // 완료된 버튼에 핑크색 배경
  },
  completeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
