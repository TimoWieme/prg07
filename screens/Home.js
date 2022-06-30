import React from 'react'
import { Text, View, Dimensions } from 'react-native';

export default function HomeScreen({ navigation, colorScheme }) {

    return (
        // Welcome text
        <View style={colorScheme.containerStyle}>
            <Text style={colorScheme.titleStyle}>
                Welcome to BarScanner!{"\n"}
            </Text>
            <Text style={[colorScheme.textStyle, { width: Dimensions.get("window").width - 90 }]}>
                In this App you can find all your favourite bars in Rotterdam. {"\n"} {"\n"}
                Take a look on the map to get a overview of where the bars are. {"\n"} {"\n"}
                In the Overview you can see a list view of all the bars in the app. Click on a bar to go the the location.{"\n"}{"\n"}
                Click on a map marker to place a description at a bar, for example a review.
            </Text>
        </View>
    )
}
