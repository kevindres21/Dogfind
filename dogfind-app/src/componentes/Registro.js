import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebaseConfig'; // Asegúrate de que esta ruta sea correcta
import { useNavigation } from '@react-navigation/native';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [fecha, setFecha] = useState('');
  const [telefono, setTelefono] = useState('');
  const navigation = useNavigation();

  const handleRegistro = async () => {
    try {
      // 1. Creamos el usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
      const user = userCredential.user;

      // 2. Guardamos los datos extra en Firestore
      await setDoc(doc(db, 'usuarios', user.uid), {
        uid: user.uid,
        nombre: nombre,
        correo: correo,
        fecha: fecha,
        telefono: telefono,
      });

      Alert.alert('Éxito', 'Usuario registrado correctamente');
      
      // 3. Lo mandamos al Login
      navigation.navigate('Login'); 

           } catch (error) {
      console.error("ERROR DE FIREBASE:", error);
      alert("Error: " + error.message); // Usamos alert de JS puro
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro</Text>
      
      <TextInput 
        placeholder="Nombre" 
        value={nombre} 
        onChangeText={setNombre} 
        style={styles.input} 
      />
      
      <TextInput 
        placeholder="Correo" 
        value={correo} 
        onChangeText={setCorreo} 
        style={styles.input} 
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <TextInput 
        placeholder="Contraseña" 
        value={contrasena} 
        onChangeText={setContrasena} 
        secureTextEntry 
        style={styles.input} 
      />
      
      <TextInput 
        placeholder="Fecha de nacimiento" 
        value={fecha} 
        onChangeText={setFecha} 
        style={styles.input} 
      />
      
      <TextInput 
        placeholder="Teléfono" 
        value={telefono} 
        onChangeText={setTelefono} 
        keyboardType="phone-pad" 
        style={styles.input} 
      />
      
      <Button title="Registrarse" onPress={handleRegistro} />
      
      <View style={{ marginTop: 10 }}>
        <Button 
          title="¿Ya tienes cuenta? Inicia sesión" 
          onPress={() => navigation.navigate('Login')} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20 
  },
  titulo: { 
    fontSize: 24, 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 12, 
    marginBottom: 12, 
    borderRadius: 6 
  }
});