import React, {useState, useEffect} from 'react'
import { Text, View, FlatList, SafeAreaView } from 'react-native';
import BarCard from '../components/BarCard.js'

// import Card, {DarkTheme, DefaultTheme} from '../components/BarCard'


export default function Overview({ navigation, colorScheme }) {
    const [bars, setBars] = useState([]);

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


        const barList = bars.map((bar, index) => {

            return (
                <BarCard
                bar={bar} 
                />
            )
        })
        return(
           <View style={colorScheme.containerStyle}>
                <Text style={colorScheme.titleStyle}>
                    Overview Screen!
                </Text>  
                {/* <SafeAreaView style={colorScheme.safeAreaViewStyle}>
                <FlatList
                id={barList.name}
                title={barList}
                >
                </FlatList>
                </SafeAreaView>  */}
                {barList}  
            </View>
        )
    }
