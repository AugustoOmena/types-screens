// import React, { useState } from "react";
// import { styles } from "../../../../styles";
// import { View, Text, TouchableOpacity, Alert } from "react-native";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// type Alarme = {
//     index: number;
//     hora: string;
//     nome: string;
// };

// let alarme: Alarme;

// const [alarmes, setAlarmes] = useState<Alarme[]>([]);

// const excluirAlarme = async (index: number) => {
//     try {
//         const novosAlarmes = alarmes.filter((_, i) => i !== index);
//         await AsyncStorage.setItem('alarmes', JSON.stringify(novosAlarmes));
//         setAlarmes(novosAlarmes);
//     } catch (error) {
//         console.error('Erro ao excluir alarme', error);
//     }
// };

// export default function(props: any){
//     alarme.hora=props.hora
//     alarme.nome=props.nome
//     alarme.index=props.index
//     return(
//         <View style={styles.alarmeDaLista}>
//             <View>
//                 <Text style={styles.hora}>{alarme.hora}</Text>
//                 <Text style={styles.horaDetalhes}>{alarme.nome}</Text>
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
//                                     onPress: () => excluirAlarme(alarme.index),
//                                 },
//                             ],
//                             { cancelable: false }
//                         );
//                     }}
                    
//                 >
//                     <Text>Excluir</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     )
// }

import { Text, TouchableOpacity, View, FlatList, Alert, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../../../../styles";
import { useAppNavigation } from "../../../utils/useAppNavigation";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

type Alarme = {
    hora: string;
    nome: string;
};


const AccordionAlarme = (props: any) => {


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
        //<AccordionAlarme hora={item.hora} nome={item.nome} index={index}></AccordionAlarme>
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
        <View>
            <FlatList
                data={alarmes}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContainer}
            />

        </View>
    );
};

export default AccordionAlarme;
