// import { Text, TouchableOpacity, View, ImageBackground, TextInput, FlatList } from "react-native";
// import DateTimePicker from '@react-native-community/datetimepicker';
// import React, { useState } from "react";
// import { styles } from "./Styles-Criar-Alarme";
// import { useAppNavigation } from "../../../utils/useAppNavigation";
// import AsyncStorage from '@react-native-async-storage/async-storage';




// const CriarAlarme = () => {
//     const navgation = useAppNavigation();
//     const [nome, setNome] = useState<string>('');
//     const [hora, setHora] = useState<Date>(new Date());
//     const [showTimePicker, setShowTimePicker] = useState(false);
    

//     const salvarAlarme = async () => {
//         try {
//             const novoAlarme = { nome, hora: hora.toLocaleTimeString() };
//             const alarmesExistentes: Alarme[] = JSON.parse((await AsyncStorage.getItem('alarmes')) || '[]');
//             alarmesExistentes.push(novoAlarme);
//             await AsyncStorage.setItem('alarmes', JSON.stringify(alarmesExistentes));
            
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <ImageBackground source={require('../../../../assets/imagens/backgroundColor.png')} style={styles.image}>
//                     <Text style={styles.titulo}>Criar Alarme</Text>
//             </ImageBackground>

//             <TextInput
                
//                 placeholder="Nome do Alarme"
//                 value={nome}
//                 onChangeText={setNome}
//             />

//             {showTimePicker && (
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
//             )}

//             <TouchableOpacity onPress={() => setShowTimePicker(true)} >
//                 <Text >Selecionar Hora</Text>
//             </TouchableOpacity>

//             <TouchableOpacity onPress={salvarAlarme}>
//                 <Text style={styles.buttonText}>Salvar</Text>
//             </TouchableOpacity>

//             <FlatList
//                 data={alarmes}
//                 renderItem={renderItem}
//                 keyExtractor={(item, index) => index.toString()}
//                 style={styles.alarmList}
//             />

//             <TouchableOpacity onPress={() => navgation.goBack()} style={styles.botaoVoltar}>
//                     <Text style={styles.buttonText}>Voltar</Text>
//             </TouchableOpacity>
//         </View>
//     )
// };

// interface Alarme {
//     nome: string;
//     hora: string;
// }

// export default CriarAlarme;
import { Text, TouchableOpacity, View, ImageBackground, TextInput, FlatList } from "react-native";
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
            const novoAlarme = { nome, hora: hora.toLocaleTimeString() };
            const alarmesExistentes: Alarme[] = JSON.parse((await AsyncStorage.getItem('alarmes')) || '[]');
            alarmesExistentes.push(novoAlarme);
            await AsyncStorage.setItem('alarmes', JSON.stringify(alarmesExistentes));
            setAlarmes(alarmesExistentes); // Atualiza a lista na tela
        } catch (error) {
            console.log(error);
        }
    };

    const renderItem = ({ item }: { item: Alarme }) => (
        <View >
            <Text>Nome: {item.nome}</Text>
            <Text>Hora: {item.hora}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../../assets/imagens/backgroundColor.png')} style={styles.image}>
                <Text style={styles.titulo}>Criar Alarme</Text>
            </ImageBackground>

            <TextInput
                placeholder="Nome do Alarme"
                value={nome}
                onChangeText={setNome}
               
            />

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

            <TouchableOpacity onPress={() => setShowTimePicker(true)} >
                <Text>Selecionar Hora</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={salvarAlarme} >
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>

            <FlatList
                data={alarmes}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              
            />

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.botaoVoltar}>
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
};

interface Alarme {
    nome: string;
    hora: string;
}

export default CriarAlarme;
