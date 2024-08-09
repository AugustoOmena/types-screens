import { Text, TouchableOpacity, View, ImageBackground, TextInput, FlatList, Image } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState, useEffect } from "react";
import { styles } from "./Styles-Criar-Alarme";
import { useAppNavigation } from "../../../utils/useAppNavigation";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CriarAlarme = () => {
    const navigation = useAppNavigation();
    const [nome, setNome] = useState<string>('');
    const [hora, setHora] = useState<Date>(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [alarmes, setAlarmes] = useState<Alarme[]>([]);

    useEffect(() => {
        const carregarAlarmes = async () => {
            const alarmesExistentes = await AsyncStorage.getItem('alarmes');
            if (alarmesExistentes) {
                setAlarmes(JSON.parse(alarmesExistentes));
            }
        };

        carregarAlarmes();
    }, []);

    const salvarAlarme = async () => {
        try {
            if (nome === "") { return; }
            
            // Formatar hora para mostrar apenas horas e minutos
            const horaFormatada = hora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            const novoAlarme = { nome, hora: horaFormatada };
            const alarmesExistentes: Alarme[] = JSON.parse((await AsyncStorage.getItem('alarmes')) || '[]');
            alarmesExistentes.push(novoAlarme);
            await AsyncStorage.setItem('alarmes', JSON.stringify(alarmesExistentes));
            setAlarmes(alarmesExistentes);
            navigation.goBack();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../../assets/imagens/backgroundColor.png')} style={styles.image}>
                    <TouchableOpacity
                            onPress={() =>
                                navigation.goBack()
                            }
                        >
                        <View style={styles.voltarContainer}>
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
                    <Text style={styles.inputText}>Selecionar Hora</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.bottomBaixo}>
                <TouchableOpacity
                    onPress={() =>
                        salvarAlarme()
                    }
                    style={styles.button}
                >
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
