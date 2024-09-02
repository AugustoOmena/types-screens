// import { Text, TouchableOpacity, View, ImageBackground, TextInput, Image } from "react-native";
// import DateTimePicker from '@react-native-community/datetimepicker';
// import React, { useState, useEffect } from "react";
// import { styles } from "./Styles-Criar-Alarme";
// import { useAppNavigation } from "../../../utils/useAppNavigation";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const CriarAlarme = () => {
//     const navigation = useAppNavigation();
//     const [nome, setNome] = useState<string>('');
//     const [hora, setHora] = useState<Date>(new Date());
//     const [showTimePicker, setShowTimePicker] = useState(false);
//     const [alarmes, setAlarmes] = useState<Alarme[]>([]);

//     useEffect(() => {
//         const carregarAlarmes = async () => {
//             const alarmesExistentes = await AsyncStorage.getItem('alarmes');
//             if (alarmesExistentes) {
//                 setAlarmes(JSON.parse(alarmesExistentes));
//             }
//         };

//         carregarAlarmes();
//     }, []);

//     const salvarAlarme = async () => {
//         try {
//             if (nome === "") { return; }
            
//             const horaFormatada = hora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
//             const novoAlarme = { nome, hora: horaFormatada };
//             const alarmesExistentes: Alarme[] = JSON.parse((await AsyncStorage.getItem('alarmes')) || '[]');
//             alarmesExistentes.push(novoAlarme);
//             await AsyncStorage.setItem('alarmes', JSON.stringify(alarmesExistentes));
//             setAlarmes(alarmesExistentes);
//             navigation.goBack();
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <View style={styles.containerCriarAlarme}>
//             <ImageBackground source={require('../../../../assets/imagens/backgroundColor.png')} style={styles.imagemDeFundoNoTopo}>
//                     <TouchableOpacity
//                             onPress={() =>
//                                 navigation.goBack()
//                             }
//                         >
//                         <View style={styles.containerVoltarAnterior}>
//                             <Image source={require('../../../../assets/imagens/seta-esquerda.png')} style={styles.imagemVoltar} />
//                             <Text style={styles.textoVoltar}>Voltar</Text>
//                         </View>
//                     </TouchableOpacity>
                     
//                     <View style={styles.centralizar}>
//                         <Text style={styles.tituloDaTela}>Criar Alarme</Text>
//                     </View>
//             </ImageBackground>

//             <View style={styles.formularioCadastraAlarme}>

//                 <View style={styles.inputNomeDoAlarmeContainer}>
//                     <TextInput
//                         style={styles.inputText}
//                         placeholder="Nome do Alarme"
//                         value={nome}
//                         onChangeText={setNome}
//                     />
//                 </View>

//                 {showTimePicker && (
//                 <DateTimePicker
//                     value={hora}
//                     mode="time"
//                     display="default"
//                     onChange={(event, selectedDate) => {
//                         setShowTimePicker(false);
//                         if (selectedDate) {
//                             setHora(selectedDate);
//                         }
//                     }}
//                 />
//                 )}

//                 <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.inputNomeDoAlarmeContainer}>
//                     <Text style={styles.inputText}>Selecionar Hora    {hora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
//                 </TouchableOpacity>

//             </View>

//             <View style={styles.bottomBaixo}>
//                 <TouchableOpacity
//                     onPress={() =>
//                         salvarAlarme()
//                     }
//                     style={styles.button}
//                 >
//                     <Image source={require('../../../../assets/imagens/verificar.png')} style={styles.imagemVoltar} />
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// interface Alarme {
//     nome: string;
//     hora: string;
// }

// export default CriarAlarme;


import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, ImageBackground, TextInput, Image } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Audio } from 'expo-av'; // Importação do expo-av
import { styles } from "./Styles-Criar-Alarme";
import { useAppNavigation } from "../../../utils/useAppNavigation";

const CriarAlarme = () => {
    const navigation = useAppNavigation();
    const [nome, setNome] = useState<string>('');
    const [hora, setHora] = useState<Date>(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [alarmes, setAlarmes] = useState<Alarme[]>([]);
    const [sound, setSound] = useState<Audio.Sound | null>(null);

    useEffect(() => {
        const carregarAlarmes = async () => {
            const alarmesExistentes = await AsyncStorage.getItem('alarmes');
            if (alarmesExistentes) {
                setAlarmes(JSON.parse(alarmesExistentes));
            }
        };
        carregarAlarmes();

        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: false,
            }),
        });
    }, []);

    const salvarAlarme = async () => {
        try {
            if (nome === "") { return; }
            
            const horaFormatada = hora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const novoAlarme = { nome, hora: horaFormatada };
            const alarmesExistentes: Alarme[] = JSON.parse((await AsyncStorage.getItem('alarmes')) || '[]');
            alarmesExistentes.push(novoAlarme);
            await AsyncStorage.setItem('alarmes', JSON.stringify(alarmesExistentes));
            setAlarmes(alarmesExistentes);
            scheduleNotification(hora, nome);
            navigation.goBack();
        } catch (error) {
            console.log(error);
        }
    };

    const scheduleNotification = (alarmTime: Date, alarmName: string) => {
        const notificationDate = new Date(alarmTime);
        notificationDate.setSeconds(0);

        Notifications.scheduleNotificationAsync({
            content: {
                title: "Alarme",
                body: `O alarme "${alarmName}" está tocando!`,
                sound: true, // Tocar o som
            },
            trigger: {
                hour: notificationDate.getHours(),
                minute: notificationDate.getMinutes(),
                repeats: false, // Se você quiser que o alarme se repita, altere para true
            },
        });

        const currentTime = new Date();
        const delay = notificationDate.getTime() - currentTime.getTime();

        if (delay > 0) {
            setTimeout(() => {
                playAlarmSound();
            }, delay);
        }
    };

    const playAlarmSound = async () => {
        try {
            const { sound } = await Audio.Sound.createAsync(
                require('../../../../assets/alarm.mp3')
            );
            setSound(sound);
            await sound.playAsync();
        } catch (error) {
            console.log('Erro ao tocar som:', error);
        }
    };

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    return (
        <View style={styles.containerCriarAlarme}>
            <ImageBackground source={require('../../../../assets/imagens/backgroundColor.png')} style={styles.imagemDeFundoNoTopo}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={styles.containerVoltarAnterior}>
                        <Image source={require('../../../../assets/imagens/seta-esquerda.png')} style={styles.imagemVoltar} />
                        <Text style={styles.textoVoltar}>Voltar</Text>
                    </View>
                </TouchableOpacity>
                
                <View style={styles.centralizar}>
                    <Text style={styles.tituloDaTela}>Criar Alarme</Text>
                </View>
            </ImageBackground>

            <View style={styles.formularioCadastraAlarme}>
                <View style={styles.inputNomeDoAlarmeContainer}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Nome do Alarme"
                        value={nome}
                        onChangeText={setNome}
                    />
                </View>

                {showTimePicker && (
                    <DateTimePicker
                        value={hora}
                        mode="time"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShowTimePicker(false);
                            if (selectedDate) {
                                setHora(selectedDate);
                            }
                        }}
                    />
                )}

                <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.inputNomeDoAlarmeContainer}>
                    <Text style={styles.inputText}>Selecionar Hora    {hora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.bottomBaixo}>
                <TouchableOpacity onPress={salvarAlarme} style={styles.button}>
                    <Image source={require('../../../../assets/imagens/verificar.png')} style={styles.imagemVoltar} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

interface Alarme {
    nome: string;
    hora: string;
}

export default CriarAlarme;
