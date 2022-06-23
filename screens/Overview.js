import React, {useState, useEffect} from 'react'
import { Text, View, ScrollView } from 'react-native';

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

    // console.log(bars);


        // const cards = bars.map((bar, index) => {

        //     return (
        //             <Card
        //             key={index}
        //             title={bar.name}
        //             />
        //     )
        // })
        return(
           <View style={colorScheme.containerStyle}>
                <Text style={colorScheme.titleStyle}>
                    Overview Screen!
                </Text>           
            </View>
        )
    }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'column',
//         backgroundColor: '#fff',
//     },
//     text: {

//     },
    
// });