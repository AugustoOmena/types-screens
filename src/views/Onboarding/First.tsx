// import { Text, TouchableOpacity, View, FlatList, Alert } from "react-native";
// import React, { useEffect, useState } from "react";
// import { styles } from "../../../styles";
// import { useAppNavigation } from "../../utils/useAppNavigation";
// import CalendarioNoTopo from "./Calendario";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// type Alarme = {
//     hora: string;
//     nome: string;
// };

// const First = () => {

//     const navigation = useAppNavigation();
//     const [alarmes, setAlarmes] = useState<Alarme[]>([]);

//     useEffect(() => {
//         const carregarAlarmes = async () => {
//             try {
//                 const alarmesExistentes = await AsyncStorage.getItem('alarmes');
//                 if (alarmesExistentes) {
//                     setAlarmes(JSON.parse(alarmesExistentes));
//                 }
//             } catch (error) {
//                 console.error('Erro ao carregar alarmes', error);
//             }
//         };

//         carregarAlarmes();
//     }, []);

//     const excluirAlarme = async (index: number) => {
//         try {
//             const novosAlarmes = alarmes.filter((_, i) => i !== index);
//             await AsyncStorage.setItem('alarmes', JSON.stringify(novosAlarmes));
//             setAlarmes(novosAlarmes);
//         } catch (error) {
//             console.error('Erro ao excluir alarme', error);
//         }
//     };

//     const renderItem = ({ item }: { item: Alarme }) => (
//         <View style={styles.alarmeDaLista}>
//             <View>
//                 <Text style={styles.hora}>{item.hora} </Text>
//                 <Text style={styles.horaDetalhes}>{item.nome}</Text>
//                 <TouchableOpacity
//                     onPress={() => {
//                         Alert.alert(
//                             'Excluir Alarme',
//                             'Tem certeza de que deseja excluir este alarme?',
//                             [
//                                 {
//                                     text: 'Cancelar',
//                                     style: 'cancel',
//                                 },
//                                 {
//                                     text: 'Excluir',
//                                     onPress: () => excluirAlarme(index),
//                                 },
//                             ],
//                             { cancelable: false }
//                         );
//                     }}
                    
//                 >
//                     <Text style={styles.buttonText}>Excluir</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );

//     return (
//         <View style={styles.fullScreenContainer}>
//             <CalendarioNoTopo />

//             <FlatList
//                 data={alarmes}
//                 renderItem={renderItem}
//                 keyExtractor={(item, index) => index.toString()}
//                 contentContainerStyle={styles.listContainer}
//             />

//             <View style={styles.Bottom}>
//                 <TouchableOpacity
//                     onPress={() =>
//                         navigation.navigate("Onboarding", {
//                             screen: "CriarAlarme"
//                         })
//                     }
//                     style={styles.button}
//                 >
//                     <Text style={styles.buttonText}>+</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
        
//     )
// };

// export default First;
import { Text, TouchableOpacity, View, FlatList, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../../../styles";
import { useAppNavigation } from "../../utils/useAppNavigation";
import CalendarioNoTopo from "./Calendario";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

type Alarme = {
    hora: string;
    nome: string;
};

const First = () => {
    const navigation = useAppNavigation();
    const [alarmes, setAlarmes] = useState<Alarme[]>([]);

    // Função para carregar os alarmes do AsyncStorage
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

    // Carregar alarmes ao montar o componente
    useEffect(() => {
        carregarAlarmes();
    }, []);

    // Atualizar a lista de alarmes quando a tela ganhar foco
    useFocusEffect(
        React.useCallback(() => {
            carregarAlarmes();
        }, [])
    );

    // Função para excluir um alarme
    const excluirAlarme = async (index: number) => {
        try {
            const novosAlarmes = alarmes.filter((_, i) => i !== index);
            await AsyncStorage.setItem('alarmes', JSON.stringify(novosAlarmes));
            setAlarmes(novosAlarmes);
        } catch (error) {
            console.error('Erro ao excluir alarme', error);
        }
    };

    // Renderizar cada item da lista de alarmes
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
                    <Text style={styles.buttonText}>Excluir</Text>
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
    );
};

export default First;
