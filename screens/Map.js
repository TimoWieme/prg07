import MapView, { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import * as Location from 'expo-location';

export default function Map({ navigation, route, colorScheme }) {
    // Make variables
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [bars, setBars] = useState([{}])
    // Set region
    const [region, setRegion] = useState({
        latitude: 51.926517,
        longitude: 4.462456,
        latitudeDelta: 0.0022,
        longitudeDelta: 0.0221
    })

    useEffect(() => {
        // console.log(route);
        // If pressed on map, go to current location
        navigation.addListener('tabPress', (e) => {
            if (location) {
                setRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0022,
                    longitudeDelta: 0.0221
                })
            }
        })
        //If statement when region is given by route than show that
        if (route.params?.latitude) {
            setRegion({
                latitude: route.params.latitude,
                longitude: route.params.longitude,
                latitudeDelta: 0.0022,
                longitudeDelta: 0.0221
            })
            // console.log(region);
        }
        // Else if location is given than go to current location
        else if (location) {
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0022,
                longitudeDelta: 0.0221
            })
        }
    }, [location, route.params?.latitude, route])

    // console.log(bars);

    useEffect(() => {
        (async () => {
            // Ask permission to get the location
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    useEffect(() => {
        // Fetch bars and put them in Setbars
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

    // make bar foreach bar in bars
    const markers = bars.map((bar, index) => {
        // console.log(bar)
        return (
            // Make marker foreach bar
            <Marker
                key={index}
                coordinate={{
                    latitude: bar.lat,
                    longitude: bar.lon
                }}
                title={bar.name}
                // Gets huge after publish, so went back to normal markers
                // image = {require('../src/flag-marker.png')}
                onPress={() => navigation.navigate("Descriptions", {
                    bar: bar
                })
                }
            >
            </Marker>
        )
    })

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                // Show the location of the user on the map
                showsUserLocation
                region={region}
            >
                {markers}
            </MapView>
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