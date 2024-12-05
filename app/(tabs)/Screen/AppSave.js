import React, { createContext, useState, useContext } from 'react';

// Context 생성
const AppSave = createContext();

// Provider 컴포넌트
export const AppProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // 즐겨찾기 상태 업데이트 함수
  const toggleFavorite = (todo) => {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...t, isFavorite: !t.isFavorite } : t
    );
    setTodos(updatedTodos);

    // 즐겨찾기 목록에 추가 또는 제거
    if (!todo.isFavorite) {
      setFavorites([...favorites, todo]);
    } else {
      setFavorites(favorites.filter((f) => f.id !== todo.id));
    }
  };

  return (
    <AppSave.Provider value={{ todos, setTodos, favorites, toggleFavorite }}>
      {children}
    </AppSave.Provider>
  );
};

// Context 사용을 위한 custom hook
export const useAppSave = () => useContext(AppSave);