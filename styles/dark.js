import { StyleSheet } from "react-native";
import style from './style.js'

const dark = StyleSheet.create({
  ...style,
  container: {
    ...style.container,
    backgroundColor: '#1e1f26',
  },
  title: {
    ...style.title,
    color: "white",
  },
  text: {
    color: 'white',
  },
  pickerContainer: {
    ...style.pickerContainer,
  },
  pickerText: {
    color: "white",
    backgroundColor: "#1e1f26",
  },
  flatlistItem: {
    ...style.flatlistItem,
    color: 'white',
    backgroundColor: "#6eccad",
    shadowColor: 'white',

},

})

export default dark