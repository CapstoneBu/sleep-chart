import { StyleSheet } from 'react-native';

export const viewStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start', // 추가: 세로 방향 시작 위치 설정
    width: '100%',
  },

  Header: {
    backgroundColor: '#C1A3A3',
    height: 60, // 원하는 높이 설정
    justifyContent: 'flex-end', // 아래로 정렬
    alignItems: 'flex-start', // 왼쪽 정렬
    padding: 10, // 여백 추가
    width:'100%',
    height:90,
  },
  
  Contents: {
    backgroundColor: 'white',
    width:'100%'
    //flex: 7// 변경: Main의 flex 비율
  },

  Footer: {
    backgroundColor: '#F3C5C5',
  },
});
