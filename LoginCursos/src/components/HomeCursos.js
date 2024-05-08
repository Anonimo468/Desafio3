import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const Home = () => {
  const imageUrl = 'https://cdn1.iconfinder.com/data/icons/3d-isometric-color/512/target-iso-color.png'; // Reemplaza esto con la URL de tu imagen
  
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido a cursos técnicos aqui encontraras cursos de tu preferencia</Text>
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.image} 
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00bbff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 20, 
    fontWeight: '400', 
  },
  image: {
    width: 200, 
    height: 200, 
  },
});

export default Home;
