import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { styles } from "../../../styles";
import { useAppNavigation } from "../../utils/useAppNavigation";
import CalendarioNoTopo from "./Calendario";

const First = () => {
    const navigation = useAppNavigation();
    return (
        <View>
            <CalendarioNoTopo></CalendarioNoTopo>
            
            <View style={styles.container}>
                <Text>First</Text>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("Onboarding", {
                            screen: "Second"
                        })
                    }
                >
                    <Text style={styles.button}>Go to Second</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    )
};

export default First;
