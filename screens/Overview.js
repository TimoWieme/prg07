import { useState, useEffect } from 'react'
import { Text, FlatList, SafeAreaView } from 'react-native';
import OverviewCard from '../components/OverviewCard'

export default function Overview({ navigation, colorScheme }) {
    const [bars, setBars] = useState([{}])

    useEffect(() => {
        // Fetch bars and put them in bars
        const getBars = async () => {
            try {
                await fetch("https://stud.hosted.hr.nl/1004149/bars/bars.json")
                    .then((response) => response.json())
                    .then((results) => {
                        let arr = []
                        // console.log(results);
                        for (let result of results) {
                            arr.push(result)
                        }
                        setBars(arr)
                    })
            } catch (err) {
                console.log(err)
            }
        }
        getBars()
    }, [])

    // console.log(bars);


    return (
        <SafeAreaView style={colorScheme.containerStyle}>
            <Text style={colorScheme.titleStyle}>
                List Screen!
            </Text>
            {/* Create a Flatlist with the fetched bars */}
            <FlatList
                data={bars}
                renderItem={({ item }) =>
                    <OverviewCard
                        input={item.name}
                        style={[colorScheme.flatlistItemStyle, colorScheme.textStyle]}
                        onPress={() => navigation.navigate("Map", {
                            "latitude": item.lat,
                            "longitude": item.lon,
                        })} />
                }
            />
        </SafeAreaView>
    )
}
