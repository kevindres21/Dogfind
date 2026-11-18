import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, Text, View, ScrollView, TouchableOpacity, 
  Image, ActivityIndicator, Modal, StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
  const [razas, setRazas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [imagenSeleccionada, setImagenSeleccionada] = useState('');
  const [razaSeleccionada, setRazaSeleccionada] = useState('');

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await fetch("https://dog.ceo/api/breeds/list/all");
        const json = await res.json();
        setRazas(Object.keys(json.message));
      } catch (error) {
        console.error(error);
      } finally {
        setCargando(false);
      }
    };
    obtenerDatos();
  }, []);

  const seleccionarPerro = async (raza) => {
    setRazaSeleccionada(raza);
    setModalVisible(true);
    setImagenSeleccionada('');

    try {
      const res = await fetch(`https://dog.ceo/api/breed/${raza}/images/random`);
      const json = await res.json();
      setImagenSeleccionada(json.message);
    } catch (error) {
      console.error(error);
    }
  };

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color="#2C3E50" />
        <Text style={{ marginTop: 10, color: '#7F8C8D' }}>Cargando perritos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2C3E50" />
      
      {/* CABECERA ELEGANTE */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dogfind</Text>
        <Text style={styles.headerSubtitle}>Encuentra tu raza favorita</Text>
      </View>

      <ScrollView contentContainerStyle={styles.lista}>
        {razas.map((raza, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.card} 
            onPress={() => seleccionarPerro(raza)}
            activeOpacity={0.7}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>
                {raza.charAt(0).toUpperCase() + raza.slice(1)}
              </Text>
              <Ionicons name="paw" size={20} color="#E67E22" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* MODAL CON IMAGEN CENTRADA */}
      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {razaSeleccionada.charAt(0).toUpperCase() + razaSeleccionada.slice(1)}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close-circle" size={30} color="#BDC3C7" />
              </TouchableOpacity>
            </View>

            {/* Contenedor de la imagen con fondo gris suave */}
            <View style={styles.imageContainer}>
              {imagenSeleccionada ? (
                <Image 
                  source={{ uri: imagenSeleccionada }} 
                  style={styles.modalImage} 
                  resizeMode="contain" // <--- ESTO CENTRA Y AJUSTA LA IMAGEN SIN DEFORMARLA
                />
              ) : (
                <ActivityIndicator size="large" color="#2C3E50" />
              )}
            </View>

            <Text style={styles.modalDescription}>
              Una hermosa raza canina lista para ser tu mejor amigo.
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // Colores base: Fondo #F4F6F7, Azul oscuro #2C3E50, Naranja #E67E22
  container: { flex: 1, backgroundColor: '#F4F6F7' },
  centrado: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4F6F7' },
  
  // Cabecera oscura
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#2C3E50',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerTitle: { fontSize: 30, fontWeight: 'bold', color: '#FFF' },
  headerSubtitle: { fontSize: 14, color: '#BDC3C7', marginTop: 5 },

  lista: { paddingHorizontal: 20, paddingBottom: 30 },
  card: {
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
    borderLeftWidth: 4, // Un detalle de color a la izquierda
    borderLeftColor: '#E67E22',
  },
  cardContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#34495E', textTransform: 'capitalize' },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(44, 62, 80, 0.8)', // Fondo oscuro azulado
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '90%',
    maxWidth: 500, // Para que no se estire demasiado en pantallas grandes
    backgroundColor: '#FFF',
    borderRadius: 25,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#2C3E50', textTransform: 'capitalize' },
  
  // Contenedor de la imagen ajustado
  imageContainer: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    backgroundColor: '#ECF0F1', // Fondo gris claro por si la imagen no llena todo
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 15,
    padding: 10, // Un pequeño margen interno
  },
  modalImage: { 
    width: '100%', 
    height: '100%', 
    borderRadius: 10,
  },
  modalDescription: { 
    fontSize: 15, 
    color: '#7F8C8D', 
    textAlign: 'center', 
    lineHeight: 22,
    marginTop: 5
  },
});