import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Timer from './Timer'; // Timer 컴포넌트 임포트
import { VIEW_WIDTH, BUTTON_HEIGHT } from '../Components/values'; // Timer 관련 스타일 값

const EditTodoModal = ({ visible, todo, onClose, onUpdate }) => {
  const [input, setInput] = useState(todo?.text || ''); // 초기 입력값
  const [time, setTime] = useState(todo?.time ? new Date(todo.time) : new Date()); // 초기 시간값

  useEffect(() => {
    if (todo) {
      setInput(todo.text || ''); // 초기 텍스트 값 설정
      setTime(todo.time ? new Date(todo.time) : new Date()); // 초기 시간 값 설정
    }
  }, [todo]);

  const handleUpdate = () => {
    if (!input.trim()) return; // 공백 입력 방지

    const updatedTodo = {
      ...todo,
      text: input,
      time: time, // 수정된 시간 포함
    };

    onUpdate(updatedTodo); // 부모 컴포넌트로 업데이트된 할 일 전달
    onClose(); // 모달 닫기
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose} // Android 뒤로가기 처리
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>일정 수정</Text>

          <TextInput
            style={styles.input}
            placeholder="수정할 내용을 입력하세요"
            value={input}
            onChangeText={setInput} // 입력값 업데이트
          />

          <Text style={styles.label}>시간 수정</Text>
          <View style={styles.timerContainer}>
            <Timer
              value={time} // Timer에 현재 시간 전달
              onChange={(newTime) => {
                if (newTime instanceof Date) setTime(newTime); // 시간 업데이트
              }}
              width={VIEW_WIDTH}
              buttonHeight={BUTTON_HEIGHT}
              visibleCount={3}
            />
          </View>

          <View style={styles.buttonRow}>
            <Button title="확인" onPress={handleUpdate} color="#5A67D8" />
            <Button title="취소" onPress={onClose} color="#A0AEC0" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  timerContainer: {
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default EditTodoModal;
