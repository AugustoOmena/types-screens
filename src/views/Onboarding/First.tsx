import { Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { styles } from "../styles";
import { useAppNavigation } from "../../utils/useAppNavigation";

import CalendarioNoTopo from "./shared/Calendario";
import AccordionAlarme from "./shared/Acordion/AccordionAlarme";


const First = () => {
    const navigation = useAppNavigation();


    return (
        <View style={styles.fullScreenContainer}>
            <CalendarioNoTopo />

            <AccordionAlarme />

            <View style={styles.bottomBaixo}>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("Onboarding", {
                            screen: "CriarAlarme"
                        })
                    }
                    style={styles.button}
                >
                    <Image source={require('../../../assets/imagens/adicionar-alarme.png')} style={styles.imagemAlarme}></Image>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default First;
