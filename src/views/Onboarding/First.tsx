import { Text, TouchableOpacity, View, FlatList, Alert, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../../../styles";
import { useAppNavigation } from "../../utils/useAppNavigation";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import CalendarioNoTopo from "./shared/Calendario";

type Alarme = {
    hora: string;
    nome: string;
};

const First = () => {
    const navigation = useAppNavigation();
    const [alarmes, setAlarmes] = useState<Alarme[]>([]);

    const carregarAlarmes = async () => {
        try {
            const alarmesExistentes = await AsyncStorage.getItem('alarmes');
            if (alarmesExistentes) {
                setAlarmes(JSON.parse(alarmesExistentes));
            }
        } catch (error) {
            console.error('Erro ao carregar alarmes', error);
        }
    };

    useEffect(() => {
        carregarAlarmes();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            carregarAlarmes();
        }, [])
    );

    const excluirAlarme = async (index: number) => {
        try {
            const novosAlarmes = alarmes.filter((_, i) => i !== index);
            await AsyncStorage.setItem('alarmes', JSON.stringify(novosAlarmes));
            setAlarmes(novosAlarmes);
        } catch (error) {
            console.error('Erro ao excluir alarme', error);
        }
    };
    
    const renderItem = ({ item, index }: { item: Alarme, index: number }) => (
        <View style={styles.alarmeDaLista}>
            <View>
                <Text style={styles.hora}>{item.hora}</Text>
                <Text style={styles.horaDetalhes}>{item.nome}</Text>
                <TouchableOpacity
                    onPress={() => {
                        Alert.alert(
                            'Excluir Alarme',
                            'Tem certeza de que deseja excluir este alarme?',
                            [
                                {
                                    text: 'Cancelar',
                                    style: 'cancel',
                                },
                                {
                                    text: 'Excluir',
                                    onPress: () => excluirAlarme(index),
                                },
                            ],
                            { cancelable: false }
                        );
                    }}
                    
                >
                    <Text>Excluir</Text>
                </TouchableOpacity>
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
