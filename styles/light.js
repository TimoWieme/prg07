import { StyleSheet } from "react-native";
import style from './style.js'

const light = StyleSheet.create({
    ...style,
    cntainer: {
        ...style.container,
        backgroundColor: '#f2f2f2',
    },
    title: {
        ...style.title,
        color: "#000000",
    },
    text: {
        color: '#000000',
    },
    pickerContainer: {
        ...style.pickerContainer,
        backgroundColor: "#000000",
        color: "#000000"
    },
    pickerText: {
        color: "black",
        backgroundColor: "#f2f2f2",
    },
    flatlistItem: {
        ...style.flatlistItem,
        backgroundColor: '#f2f2f2',
        color: 'black',
    },
    safeAreaView: {
        ...style.safeAreaView,
        flex: 1,
    }

})

export default light