import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: "center",
      },
    image: {
        width: '100%',
        height: 150,
        paddingTop: 80,
      },
      voltarContainer: {
        marginLeft: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imagemVoltar: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    textoVoltar: {
        marginLeft: 5,
        fontSize: 16,
    },
    bottomBaixo: {
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: 'white',
      borderRadius: 47,
      width: 80,
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputNomeDoAlarmeContainer : {
     
      backgroundColor: 'white',
      padding: 15,
      margin: 10,
      borderRadius: 7,
    },
    inputText: {
      fontSize: 20,
    },
    formularioCadastraAlarme: {
      paddingTop: 20,
    },
    centralizar: {
      justifyContent: 'center',
      alignItems: 'center',
    }, 
    tituloDaTela: {
      fontSize: 25,
      fontWeight: "500",
    },
});
  