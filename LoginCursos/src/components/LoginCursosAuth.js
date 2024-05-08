import { Image, ScrollView, TouchableOpacity, TextInput, StyleSheet, Text, View, Alert } from 'react-native';
import React, { useEffect } from 'react'; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../utils/firebase';
import { useNavigation } from '@react-navigation/native';

const profilePicture = 'https://cdn1.iconfinder.com/data/icons/3d-isometric-color/512/rocket-iso-color.png'

const app = initializeApp(firebaseConfig);

export function LoginScreen(){
  const [email, setEmail] = React.useState(''); 
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();
  const auth = getAuth(app);

  const handleCreateAccount =() =>{
    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      console.log('Account created!')
      const user = userCredential.user;
      console.log(user)
      Alert.alert('¡Éxito!', 'Se creó la cuenta exitosamente. Ya puedes iniciar sesión.');
    })
    .catch(error =>{
      console.log(error)
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'Este correo ya está en uso.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'El correo electrónico debe tener el siguiente formato: nombre@gmail.com');
      } else {
        Alert.alert(error.message)
      }
    })
  }

  const handleSignIn =() =>{
    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      console.log('Signed in!')
      const user = userCredential.user;
      console.log(user)
      navigation.navigate('Home');
    })
    .catch(error =>{
      console.log(error)
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle= {{
        flex: 1,
        width:'100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
            <View style={styles.login}>
                <Image source={{uri: profilePicture}} style={styles.profilePicture} />
                <View>
                    <Text style={{fontSize: 20, fontWeight: '400', marginBottom: 20 }}>Bienvenido a tu apliacion de cursos tecnicos </Text>
                    <Text style={{fontSize: 15, marginBottom: 10 }}>Correo Electronico</Text>
                    <TextInput onChangeText={setEmail} style={styles.input} placeholder='E-mail'/>
                </View>
                <View>
                    <Text style={{fontSize: 15, marginTop: 20, marginBottom: 10}}>Contraseña</Text>
                    <TextInput onChangeText={setPassword} style={styles.input}  placeholder='Contraseña' secureTextEntry={true}/>
                </View>
                <TouchableOpacity onPress={handleSignIn} style={styles.button}>
                    <Text style={{fontSize: 17, fontWeight: '400', color: '#fff'}}>Iniciar Sesion</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCreateAccount} style={styles.button}>
                    <Text style={{fontSize: 17, fontWeight: '400', color: '#fff'}}>Crear Cuenta</Text>
                </TouchableOpacity>

            </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#00bbff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: '100%',
      height:'100%',
      resizeMode: 'cover',
    },
    login:{
      width: 350,
      height: 500,
      borderColor: 2,
      borderRadius: 10,
      padding: 10,
      alignItems: 'center',
       
    },
    profilePicture: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderColor: '#fff',
      borderWidth: 1,
      marginVertical: 30,
    },
    input:{
      width: 250,
      height: 40,
      borderColor: '#fff',
      borderWidth: 2,
      borderRadius: 10,
      padding: 10,
      marginVertical: 10,
      backgroundColor: '#fff',
      marginBottom: 20 
    },
  
    button: {
      width: 250,
      height: 40,
      borderRadius: 10,
      backgroundColor: '#000000',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
      borderWidth: 1,
    }
  });
