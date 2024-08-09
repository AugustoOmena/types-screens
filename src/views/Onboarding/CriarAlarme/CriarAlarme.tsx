import { Text, TouchableOpacity, View, ImageBackground } from "react-native";
import React from "react";
import { styles } from "./Styles-Criar-Alarme";
import { useAppNavigation } from "../../../utils/useAppNavigation";



const CriarAlarme = () => {
    const navgation = useAppNavigation();
    
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../../assets/imagens/backgroundColor.png')} style={styles.image}>
                    <Text style={styles.titulo}>Criar Alarme</Text>
            </ImageBackground>

            <Text>Second Screen</Text>

            <TouchableOpacity onPress={() => navgation.goBack()} style={styles.botaoVoltar}>
                    <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
        </View>
    )
};

export default CriarAlarme;