import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';

export default function Home() {
  const [razas, setRazas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await fetch("https://dog.ceo/api/breeds/list/all");
        const json = await res.json();
        
        // La API devuelve un objeto. Lo convertimos a un array de strings con los nombres de las razas.
        const listaRazas = Object.keys(json.message);
        setRazas(listaRazas);
      } catch (error) {
        console.error("Error al cargar las razas:", error);
      } finally {
        setCargando(false);
      }
    };
    obtenerDatos();
  }, []);

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando razas...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.lista}>
        <Text style={styles.titulo}>Razas de Perros</Text>
        {razas.map((raza, index) => {
          return (
            <View key={index} style={styles.item}>
              {/* Capitalizamos la primera letra de la raza */}
              <Text style={styles.nombre}>
                {raza.charAt(0).toUpperCase() + raza.slice(1)}
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centrado: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  lista: { padding: 15 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f9f9f9',
    marginBottom: 5,
    borderRadius: 5,
  },
  nombre: { fontSize: 16, textTransform: 'capitalize' },
});