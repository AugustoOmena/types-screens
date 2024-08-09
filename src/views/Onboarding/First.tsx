import { Text, TouchableOpacity, View, FlatList } from "react-native";
import React, { useState } from "react";
import { styles } from "../../../styles";
import { useAppNavigation } from "../../utils/useAppNavigation";
import CalendarioNoTopo from "./Calendario";

type Alarme = {
    hora: string;
    nome: string;
};

const First = () => {

    const navigation = useAppNavigation();
    const [alarmes, setAlarmes] = useState<Alarme[]>([
        { hora: '08:00 AM', nome: 'Acordar' },
        { hora: '12:00 PM', nome: 'Almoço' },
        { hora: '07:00 PM', nome: 'Exercício' },
    ]);

    const renderItem = ({ item }: { item: Alarme }) => (
        <View >
            <Text >Hora: {item.hora}</Text>
            <Text >Nome: {item.nome}</Text>
        </View>
    );

    return (
        <View style={styles.fullScreenContainer}>
            <CalendarioNoTopo />

            <FlatList
                data={alarmes}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContainer}
            />
            
            <View style={styles.Bottom}>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("Onboarding", {
                            screen: "CriarAlarme"
                        })
                    }
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    )
};

export default First;
