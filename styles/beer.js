import { StyleSheet } from "react-native";
import style from './style.js'

const arcade = StyleSheet.create({
    ...style,
    container: {
        ...style.container,
        backgroundColor: 'black',
    },
    title: {
        ...style.title,
        color: "yellow",
    },
    text: {
        color: 'yellow',
    },
    pickerContainer: {
        ...style.pickerContainer,
      },
      pickerText: {
        color: "black",
        backgroundColor: "yellow",
      },
      flatlistItem: {
        ...style.flatlistItem,
        color: 'black',
        backgroundColor: "#6eccad",
        shadowColor: 'white',
    },
    input: {
        ...style.input,
        color: 'black',
        backgroundColor:'yellow'
    }

})

export default arcade