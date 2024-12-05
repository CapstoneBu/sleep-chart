import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { View, Button, Modal, Text , Colors ,Dialog} from 'react-native-ui-lib';

import Timer from './Timer';
import { BUTTON_HEIGHT, VIEW_WIDTH } from '../Components/values';
import { StatusBar, Platform } from 'react-native';

const TodoForm = (props) => {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const [modalVisible, setModalVisible] = useState(false);
  const [time, setTime] = React.useState(
    props.edit && props.edit.time ? new Date(props.edit.time) : new Date()
  );

  useEffect(() => {
    if (props.edit) {
      setInput(props.edit.value);
      setTime(props.edit.time ? new Date(props.edit.time) : new Date());
    }
  }, [props.edit]);

  const handleChange = (value) => setInput(value);

  const handleSubmit = () => {
    if (!input || /^\s*$/.test(input)) return;

    const todo = {
      id: props.edit ? props.edit.id : Math.floor(Math.random() * 10000),
      text: input,
      time: time instanceof Date ? time : new Date(),
    };

    props.onSubmit(todo);
    setInput('');
    setTime(new Date());
    setModalVisible(false);
  };

  const closeModal = () => {
    setInput('');
    setTime(new Date());
    setModalVisible(false);
  };

  //저 Dialog 부분을 ui사이트에 연결해서 수정했음! 
  return (
    <View style={styles.container}>
      <Button
        label={props.edit ? '수정하기' : '일정 추가'} 
        outline outlineColor={Colors.blue30}// title -> label로 변경
        onPress={() => setModalVisible(true)}
        backgroundColor={props.edit ? '#3182ce' : '#5A67D8'}
      />

  <Dialog
    visible={modalVisible}
    onDismiss={closeModal} // 팝업 닫기 핸들러
    panDirection="down" // 팝업 닫기 스와이프 방향
    containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
  >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {props.edit ? '일정 수정' : '일정 추가'}
            </Text>
            <Text>시 분</Text>
            <View style={styles.view}>
              <Timer
                value={time}
                onChange={(newTime) => {
                  if (newTime instanceof Date) setTime(newTime);
                }}
                width={VIEW_WIDTH}
                buttonHeight={BUTTON_HEIGHT}
                visibleCount={3}
              />
            </View>
            <Text>{time instanceof Date ? time.toLocaleTimeString() : '시간 없음'}</Text>

            <TextInput
              placeholder="내용을 입력하세요"
              style={styles.todoInput}
              value={input}
              onChangeText={handleChange}
            />

            <View style={styles.buttonRow}>
              <Button
                label={props.edit ? '수정' : '추가'} // title -> label로 변경
                onPress={handleSubmit}
                backgroundColor="#5A67D8"
              />
              <Button
                label="취소" // title -> label로 변경
                onPress={closeModal}
                backgroundColor="#A0AEC0"
              />
            </View>
          </View>
        </View>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 300, // 팝업 너비
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  todoInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  view: {
    marginBottom: 10,
  },
});

export default TodoForm;
