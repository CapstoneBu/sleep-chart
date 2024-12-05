import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import { viewStyles } from "../styles"; // 외부 스타일
import { Header } from "../app/Header";
import { Footer } from "../app/Footer";

const Sleep = ({ headerText, setHeaderText }) => {
  return (
    <View style={viewStyles.container}>
      {/* 헤더 */}
      <Header headerText={headerText} />
      
      {/* 메인 콘텐츠 */}
      <Main />
      
      {/* 푸터 */}
      <Footer setHeaderText={setHeaderText} />
    </View>
  );
};

export const Main = () => {
  return (
    <View style={styles.mainContents}>
      {/* 라인 차트 */}
      <Text style={styles.chartTitle}>수면 움직임</Text>
      <View style={{ alignItems: 'center' }}>
        <LineChart
          data={{
            labels: ["22", "24", "02", "04", "06", "08"],
            datasets: [{ data: [50, 50, 20, 20, 20, 40, 40, 80, 80, 40, 40, 20, 70, 70, 40, 40, 20, 20] }],
          }}
          width={Dimensions.get("window").width - 32} // 패딩 고려
          height={200}
          fromZero={true} // Y축 최소값을 0으로 설정
          chartConfig={{
            backgroundGradientFrom: "#f8f8f8",
            backgroundGradientTo: "#e8e8e8",
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            decimalPlaces: 0,
          }}
          style={{ marginVertical: 16 }}
        />
      </View>

      {/* 막대 차트 */}
      <Text style={styles.chartTitle}>주간 수면시간</Text>
      <View style={{ alignItems: 'center' }}>
        <BarChart
          data={{
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [{ data: [6, 7, 8, 6, 5, 7, 8] }],
          }}
          width={Dimensions.get("window").width - 32} // 패딩 고려
          height={200}
          fromZero={true} // Y축 최소값을 0으로 설정
          chartConfig={{
            backgroundGradientFrom: "#f8f8f8",
            backgroundGradientTo: "#e8e8e8",
            color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelFontSize: 10, // 레이블 크기를 줄여서 공간 확보
            decimalPlaces: 0,
          }}
          barPercentage={0.8}
          style={{ marginVertical: 16 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContents: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF", // 사용자 대표 색상
    padding: 16, // 패딩 추가
  },
  chartTitle: {
    fontSize: 18, // 텍스트 크기
    fontWeight: "bold", // 굵게
    color: "#333", // 글자 색
    marginBottom: 8, // 차트와 간격
  },
});

export default Sleep;
