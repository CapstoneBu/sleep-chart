import React from "react";
import { View, Text ,StyleSheet } from "react-native";
import { viewStyles } from "../styles";


//상단바화면


export const Header = ({ headerText }) => {
    return (
        <View style = {[viewStyles.Header]}>
            <Text style={styles.headerText}>{headerText}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerText: {
        textAlign: 'left', // 왼쪽 정렬
        width: '100%', // 전체 폭 사용
        paddingBottom: 10, // 텍스트 아래 여백 추가
    },
})
