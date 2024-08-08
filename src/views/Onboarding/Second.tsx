import {   Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { styles } from "../../../styles";
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