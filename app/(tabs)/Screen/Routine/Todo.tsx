import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EditTodoModal from './TodoEdot';

//시간 배열 추가 해야할듯
const Todo = ({ todos, removeTodo, updateTodo, completeTodo }) => {
  const [editTodo, setEditTodo] = useState(null);

  const handleUpdate = (updatedTodo) => {
    updateTodo(updatedTodo.id, updatedTodo);
    setEditTodo(null);
  };

  const toggleFavorite = (todo) => {
    const updatedTodo = { ...todo, isFavorite: !todo.isFavorite };
    updateTodo(todo.id, updatedTodo); // 부모 컴포넌트에서 업데이트
  };
  
  return (
    <View style={styles.todoContainer}>
      {todos.map((todo) => (
        <View
          style={[styles.todoRow, todo.isComplete && styles.todoRowComplete]}
          key={todo.id}n
        >
          <TouchableOpacity onPress={() => completeTodo(todo.id)}>
            <Text style={[styles.todoText, todo.isComplete && styles.todoTextComplete]}>
              {todo.time instanceof Date
                ? todo.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : '시간 없음'}{' '}
              {todo.text}
            </Text>
          </TouchableOpacity>

          <View style={styles.icons}>
            <TouchableOpacity onPress={() => removeTodo(todo.id)} style={styles.iconWrapper}>
              <Icon name="close" style={styles.deleteIcon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setEditTodo(todo)} style={styles.iconWrapper}>
              <Icon name="edit" style={styles.editIcon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => toggleFavorite(todo)} style={styles.iconWrapper}>
              <Icon name={todo.isFavorite ? 'star' : 'star-o'} style={styles.favoriteIcon} />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {editTodo && (
        <EditTodoModal
          visible={!!editTodo}
          todo={editTodo}
          onClose={() => setEditTodo(null)}
          onUpdate={handleUpdate}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: 'column',
    padding: 10,
  },
  todoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginVertical: 5,
  },
  todoRowComplete: {
    backgroundColor: '#d3ffd3',
  },
  todoText: {
    fontSize: 16,
  },
  todoTextComplete: {
    textDecorationLine: 'line-through',
    color: '#a3a3a3',
  },
  icons: {
    flexDirection: 'row',
  },
  deleteIcon: {
    fontSize: 20,
    color: 'red',
    marginHorizontal: 5,
  },
  editIcon: {
    fontSize: 20,
    color: 'blue',
    marginHorizontal: 5,
  },
  favoriteIcon: {
    fontSize: 24,
    color: '#FFD700', // 금색으로 별색 설정
  },
});

export default Todo;
