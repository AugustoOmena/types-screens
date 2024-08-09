import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 525,
    paddingHorizontal: 20,
    marginTop: 180,
  },
  container: {
    top: 170,
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: 'orange',
    borderRadius: 47,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 50,
  },
  imagemAlarme: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  alarmeDaLista: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 15,
    borderRadius: 25,
  },
  hora: {
    fontSize: 47,
  },
  horaDetalhes: {
    fontSize: 20,
  }
  });
  