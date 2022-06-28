import MapView, { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';

export default function Map({ navigation, route, colorScheme}) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [bars, setBars] = useState([{}]);
    const [isLoading, setLoading] = useState(true);
    const [region, setRegion] = useState({
        latitude: 51.926517,
        longitude: 4.462456,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })

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

    useEffect(() => {
        console.log(route);
        navigation.addListener('tabPress', (e) => {
            if (location) {
                setRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                })
            }
        })
        //If statement when region is given by route than show that
        if (route.params?.latitude) {
            setRegion({
                latitude: route.params.latitude,
                longitude: route.params.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            })
            console.log(region);
        }
        // Else if location is given than go to current location
        else if (location) {
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
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
                />
                )
            })

    return (
        <View style={styles.container}>
                <MapView
                    style={styles.map}
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