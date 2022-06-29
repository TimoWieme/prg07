import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { Text, View, TextInput, SafeAreaView, KeyboardAvoidingView, Button, FlatList, TouchableOpacity } from 'react-native';

export default function Description({ navigation, colorScheme, route }) {
    const [text, setText] = useState('Put description here')
    const [name, setName] = useState(route.params?.bar.name)
    const [descriptions, setDescriptions] = useState('Description')
    const [latitude, setLatitude] = useState(route.params?.bar.latitude)
    const [longitude, setLongitude] = useState(route.params?.bar.longitude)


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
       //Delete description when trashcan is pressed
       const deleteHandler = (id) => {
        setDescriptions((prevDescriptions) => {
            return prevDescriptions.filter(description => description.id != id)
        })
    }

        //change description value
        const changeHandler = (value) => {
            setText(value + ` (${name})`)
        }

            //Submit description to add the data to the bar
    const submitHandler = (text, name, latitude, longitude) => {
        if (name != undefined) {
            setDescriptions((prevDescriptions) => {
                return [
                    { text: text, id: Math.random().toString(), name: name, latitude: latitude, longitude: longitude },
                    ...prevDescriptions
                ]
            })
            storeDescriptions
        }
    }

    // get descriptions
    useEffect(() => {
        getDescriptions()
    }, [])

    // Create the notes for the flatlist
    const DescriptionsItem = ({ description, deleteHandler }) => {
        return (
            // Touchable to go to the map screen and go to the coordinates
            <TouchableOpacity
                style={[colorScheme.flatlistItemStyle, { flex: 1 }]}
                onPress={() => navigation.navigate("Map", {
                    "latitude": description.latitude,
                    "longitude": description.longitude,
                })}>
                {/* Text of the note */}
                <Text style={colorScheme.textStyle}>
                    {description.text}
                    <TouchableOpacity>
                        <View style={{
                            height: 25,
                            width: 25,
                        }}>
                            {/* Trash Icon */}
                            <Ionicons
                                name="trash"
                                size={20}
                                onPress={() => deleteHandler(description.id)} />
                        </View>
                    </TouchableOpacity>
                </Text>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        // set the name, latitude, longitude
        setName(route.params?.bar.name)
        if (route.params?.bar.latitude) {
            setLatitude(route.params?.bar.latitude)
            setLongitude(route.params?.bar.longitude)
        }
    }, [route, route.params?.latitude])

    // Use Effect to get the notes
    useEffect(() => {
        getDescriptions()
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
                    />
                    <Button title="Add Description" onPress={() => {
                        submitHandler(text, name, latitude, longitude)
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