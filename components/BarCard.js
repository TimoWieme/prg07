import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native'

const BarCard = ({bar}) => {
    
    return (
        <View style={styles.cardContainer}>
            <Text>
                {bar.name}
                {/* {bar.lat} */}
            </Text>
        </View>
    )
}

const deviceWidth = Math.round(Dimensions.get('window').width)
const styles = StyleSheet.create({
    cardContainer: {
        width: deviceWidth -90,
        backgroundColor: 'lightgreen',
        borderRadius: 10,
        alignItems: 'center',
        height: 150,
        marginBottom: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity : 0.3,
        elevation : 2
    },
    
});

export default BarCard;