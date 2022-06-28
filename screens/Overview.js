import { useState, useEffect } from 'react'
import { Text, FlatList, SafeAreaView } from 'react-native';

export default function Overview({ navigation, colorScheme }) {
    const [bars, setBars] = useState([{}])

    const getBars = async () => {
        try {
            const response = await fetch('https://stud.hosted.hr.nl/1004149/bars/bars.json');
            const json = await response.json();
            setBars(json.bars);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getBars();
    }, []);
    
    console.log(bars);
    

    return (
        <SafeAreaView style={colorScheme.containerStyle}>
            <Text style={colorScheme.titleStyle}>
                List Screen!
            </Text>
            {/* Create a Flatlist with the fetched bars */}
            <FlatList
                data={bars}
                renderItem={({ item }) =>
                    <Text
                        style={[colorScheme.flatlistItemSyle, colorScheme.textStyle]}
                        // On press go the map screen and go to the coordinates
                        onPress={() => navigation.navigate("Map", {
                            "latitude": item.lat,
                            "longitude": item.lon,
                        })}
                    >
                        {item.name}
                    </Text>
                }
            />
                </SafeAreaView>
                )
            }
