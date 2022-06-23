import MapView, { Marker, DarkTheme, DefaultTheme } from 'react-native-maps';
import React, { useEffect, useState, useContext } from 'react';
import { FlatList, ActivityIndicator, StyleSheet, Text, View, Dimensions } from 'react-native';

import themeContext from '../config/themeContext';



export default function Map() {
    const theme = useContext(themeContext)
    const [mode, setMode] = useState(false);
    const [bars, setBars] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const rotterdamRegion = {
        latitude: 51.926517,
        longitude: 4.462456,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

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

    const markers = bars.map((bar, index) => {
        return (
            <Marker
                key={index}
                coordinate={{ 
                    latitude: bar.lat,
                    longitude: bar.lon 
                }}
                title={bar.name}
                image = {require('../src/marker.png')}
                >
            </Marker>
        )
    })

    return (
        <View style={[styles.container, {backgroundColor: theme.background}]}>
            {isLoading ? <ActivityIndicator /> : (
                <MapView
                    style={styles.map}
                    showsUserLocation
                    initialRegion={rotterdamRegion}
                >
                    {markers}
                </MapView>
            )}


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});