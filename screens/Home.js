import React, {useContext} from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';
import themeContext from '../config/themeContext';


export default function Overview({ navigation }) {
    const theme = useContext(themeContext)
    return (
        <View style={[styles.container, {backgroundColor: theme.background}]}>
            <Text style={[styles.text, {color: theme.color}]}> Home Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {

    }
    
});