import { StyleSheet,  Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAppNavigation } from "../../utils/useAppNavigation";

const Second = () => {
    const navgation = useAppNavigation();
    return (
        <View style={styles.container}>
            <Text>Second Screen</Text>
            <TouchableOpacity onPress={() => navgation.goBack()}>
                    <Text style={styles.button}>Go Back</Text>
            </TouchableOpacity>
        </View>
    )
};

export default Second;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: 'white',
        borderRadius: 11,
        width: 200,
        padding: 20,
        textAlign: 'center',
        margin: 20,
    }
});