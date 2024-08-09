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
        { hora: '08:00', nome: 'Acordar' },
        { hora: '12:00', nome: 'Almoço' },
        { hora: '07:00', nome: 'Exercício' },
    ]);

    const renderItem = ({ item }: { item: Alarme }) => (
        <View style={styles.alarmeDaLista}>
            <View>
                <Text style={styles.hora}>{item.hora} </Text>
                <Text style={styles.horaDetalhes}>{item.nome}</Text>
            </View>
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
