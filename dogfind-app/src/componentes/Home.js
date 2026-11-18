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
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={{ marginTop: 10, color: '#666' }}>Cargando perritos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f7fa" />
      
      {/* CABECERA */}
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
              <Ionicons name="paw" size={20} color="#4A90E2" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* MODAL ELEGANTE */}
      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {razaSeleccionada.charAt(0).toUpperCase() + razaSeleccionada.slice(1)}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close-circle" size={30} color="#ccc" />
              </TouchableOpacity>
            </View>

            <View style={styles.imageContainer}>
              {imagenSeleccionada ? (
                <Image source={{ uri: imagenSeleccionada }} style={styles.modalImage} />
              ) : (
                <ActivityIndicator size="large" color="#4A90E2" />
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
  container: { flex: 1, backgroundColor: '#f5f7fa' },
  centrado: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f7fa' },
  
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 15,
  },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  headerSubtitle: { fontSize: 14, color: '#888', marginTop: 5 },

  lista: { paddingHorizontal: 20, paddingBottom: 20 },
  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#444', textTransform: 'capitalize' },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  modalTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', textTransform: 'capitalize' },
  imageContainer: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 15,
  },
  modalImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  modalDescription: { fontSize: 14, color: '#666', textAlign: 'center', lineHeight: 20 },
});