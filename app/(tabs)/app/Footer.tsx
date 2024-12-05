// Footer.js
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { viewStyles } from '../styles';
import { useNavigation } from '@react-navigation/native';

// 하단 바 화면 (버튼 있는 곳)

export const Footer = ({ setHeaderText }) => {
  const navigation = useNavigation();

  // 버튼 클릭 시 루틴으로 이동

  const goToRoutine = () => {
    navigation.navigate('Routine');
    setHeaderText('루틴');
  };

  const goSleep = () => {
    navigation.navigate('Sleep');
    setHeaderText('수면앱');
  };

  const goHome = () => {
    navigation.navigate('Home');
    setHeaderText('홈화면');
  };

  return (
    <View style={[styles.footerButton, viewStyles.Footer]}>
      <TouchableOpacity style={styles.button} onPress={goToRoutine}>
        <Text>루틴</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={goHome}>
        <Text>홈 화면</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={goSleep}>
        <Text>수면앱</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
  button: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginHorizontal: 30,
  },
});
