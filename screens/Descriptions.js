import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, TextInput, SafeAreaView, KeyboardAvoidingView, Button, FlatList, TouchableOpacity, Dimensions } from 'react-native';
// Import expo biometric auth
import * as LocalAuthentication from 'expo-local-authentication';

export default function Description({ navigation, colorScheme, route }) {
    const [text, setText] = useState('')
    // Set bar name
    const [name, setName] = useState(route.params?.bar.name)
    const [descriptions, setDescriptions] = useState('Description')
    // Get and set the latitude and longitude
    const [lat, setLatitude] = useState(route.params?.bar.lat)
    const [lon, setLongitude] = useState(route.params?.bar.lon)

    const Auth = async () => {

        try {
            // Check if device is compatible
            const isCompatible = await
                LocalAuthentication.hasHardwareAsync();

            if (!isCompatible) {
                throw new Error('Your device isn\'t compatible.')
            }
            // Checking if device has biometrics records
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();

            if (!isEnrolled) {
                throw new Error('No Faces / Fingers found.')
            }

            // Authenticate user
            await LocalAuthentication.authenticateAsync();

            Alert.alert('Authenticated', 'Welcome back !')
        } catch (error) {
            Alert.alert('An error as occured', error?.message);
        }
    }

    // Get the descriptions from the LocalStorage
    const getDescriptions = async () => {
        try {
            const storedDescriptions = await AsyncStorage.getItem('descriptions')
            if (descriptions !== null) {
                setDescriptions(JSON.parse(storedDescriptions))
            } else {
            }
        } catch (err) {
            console.log(err)
        }
    }

    // Store the notes from LocalStorage
    const storeDescriptions = () => {
        if (descriptions) {
            try {
                AsyncStorage.setItem('descriptions', JSON.stringify(descriptions))
            } catch (err) {
                console.log(err)
            }
        }
    }
    //Delete description when delete button is pressed
    const deleteHandler = (id) => {
        setDescriptions((prevDescriptions) => {
            return prevDescriptions.filter(description => description.id != id)
        })
    }

    //change description value
    const changeHandler = (value) => {
        setText(`${name} : ` + value)
    }

    //Submit description to add the data to the bar
    const submitHandler = (text, name, lat, lon) => {
        if (name != undefined) {
            setDescriptions((prevDescriptions) => {
                return [
                    { text: text, id: Math.random().toString(), name: name, lat: lat, lon: lon },
                    ...prevDescriptions
                ]
            })
            storeDescriptions
        }
    }

    // Create the flatlist with the descriptions
    const DescriptionsItem = ({ description, deleteHandler }) => {
        return (
            // go to the map screen and go to the coordinates of the bar clicked on
            <TouchableOpacity
                style={colorScheme.touchableopacityStyle}
                onPress={() => navigation.navigate("Map", {
                    "latitude": description.lat,
                    "longitude": description.lon,
                })}>
                {/* Make the card for the description */}
                <View style=
                    {[colorScheme.touchableopacityStyle, {
                        backgroundColor: '#6eccad',
                        padding: 10,
                        margin: 10,
                        marginBottom: 10
                    }]}>
                    {/* Text of the description */}
                    <Text style={[colorScheme.textStyle,
                    {
                        width: Dimensions.get("window").width - 90,
                        alignItems: 'center'
                    }
                    ]}>
                        {description.text}
                    </Text>
                    {/* Button to delete description */}
                    <Button
                        title="Delete"
                        onPress={() => deleteHandler(description.id)} >
                    </Button>
                </View>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        // set the name, latitude, longitude
        setName(route.params?.bar.name)
        if (route.params?.bar.lat) {
            setLatitude(route.params?.bar.lat)
            setLongitude(route.params?.bar.lon)
        }
    }, [route, route.params?.lat])

    // Get descriptions
    useEffect(() => {
        getDescriptions()
        Auth()
    }, [])

    // store descriptions
    useEffect(() => {
        storeDescriptions()
    }, [descriptions])

    return (
        <SafeAreaView style={colorScheme.containerStyle}>
            <KeyboardAvoidingView>
                <View>
                    <Text style={colorScheme.titleStyle}>
                        Descriptions:
                    </Text>
                </View>
                <View>
                    {/* Input the description */}
                    <TextInput
                        style={colorScheme.input}
                        onChangeText={changeHandler}
                        placeholder="Zet description hier"
                    ></TextInput>
                    <Button title="Add Description" onPress={() => {
                        submitHandler(text, name, lat, lon)
                    }} />
                </View>
                {/* Descriptions flatlist */}
                <FlatList
                    data={descriptions}
                    renderItem={({ item }) => (
                        <DescriptionsItem description={item} deleteHandler={deleteHandler} />
                    )}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}