import { Text, View, StyleSheet, ImageBackground } from "react-native";
import React from "react";

const CalendarioNoTopo = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const dayOfMonth = date.getDate();
    const dayOfWeek = date.getDay();
  
    const monthAbbreviations = ['0','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const daysOfWeek = ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'];
  
    const getDateForDay = (dayOffset: number) => {
      const current = new Date(date);
      current.setDate(dayOfMonth + dayOffset - dayOfWeek);
      return current.getDate();
    };
  
    const isToday = (dayOffset: number) => {
      const currentDate = new Date(date);
      currentDate.setDate(dayOfMonth + dayOffset - dayOfWeek);
      return currentDate.getDate() === dayOfMonth;
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../../assets/imagens/backgroundColor.png')} style={styles.image}>
                <Text style={styles.text}>{dayOfMonth} {monthAbbreviations[month]} {year}</Text>
                <View style={styles.weekContainer}>
                {daysOfWeek.map((day, index) => (
                    <View key={index} style={styles.dayContainer}>
                    <Text style={styles.dayText}>{day}</Text>
                    <View style={[styles.dateContainer, isToday(index) && styles.todayContainer]}>
                        <Text style={[styles.dateText, isToday(index) && styles.todayDate]}>
                        {getDateForDay(index)}
                        </Text>
                    </View>
                    </View>
                ))}
                </View>
            </ImageBackground>
        </View>
    )
};

export default CalendarioNoTopo;

const styles = StyleSheet.create({
    container: {
      zIndex: 1,
      flex: 1,
      backgroundColor: '#f7f7f8',
      marginBottom: 10,
    },
    image: {
      width: '100%',
      height: 150,
      paddingTop: 50,
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    text: {
      fontSize: 15,
      fontWeight: 'bold',
    },
    weekContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: 20,
    },
    dayContainer: {
      alignItems: 'center',
    },
    dayText: {
      fontSize: 15,
      fontWeight: 'bold',
    },
    dateContainer: {
      width: 30,
      height: 30,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    dateText: {
      fontSize: 12,
    },
    todayContainer: {
      backgroundColor: 'orange',
    },
    todayDate: {
      color: 'white',
      fontWeight: 'bold',
    },
    pageContent: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    spaceWhite: {
      backgroundColor: 'white',
      width: '100%',
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
    },
    space20pixels: {
      padding: 20,
    },
  });