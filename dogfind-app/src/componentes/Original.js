import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, ActivityIndicator } from 'react-native';

export default function Original() {
  const [imagenUrl, setImagenUrl] = useState(null);
  const [cargando, setCargando] = useState(true);

  const obtenerPerroAleatorio = async () => {
    setCargando(true);
    try {
      const res = await fetch("https://dog.ceo/api/breeds/image/random");
      const json = await res.json();
      setImagenUrl(json.message);
    } catch (error) {
      console.error("Error al obtener el perro:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerPerroAleatorio();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>¡Perro Aleatorio!</Text>
      
      {cargando ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Image 
          source={{ uri: imagenUrl }} 
          style={styles.imagen} 
        />
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="Siguiente Perrito 🐶" onPress={obtenerPerroAleatorio} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  imagen: { width: 300, height: 300, borderRadius: 10, resizeMode: 'cover' },
});