import { Dimensions, StyleSheet } from "react-native";

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    // fontFamily: "Courier"
  },
  pickerContainer: {
    width: "75%",
  },
  flatlistItem: {
        width: Dimensions.get("window").width -90,
        backgroundColor: 'black',
        alignItems: 'center',
        textAlign: 'center',
        height: 150,
        marginBottom: 25,
        padding: 60,
        shadowColor: '#000',
        fontWeight: 'bold',
        fontSize: 20,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity : 0.3,
        elevation : 2,
  },
});

export default style