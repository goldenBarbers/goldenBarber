import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const router = useRouter();
  const { usuario } = useAuth();
  const { width } = useWindowDimensions();
  const [telaGrande, setTelaGrande] = useState(false);

  useEffect(() => {
    setTelaGrande(width >= 768);
  }, [width]);

  // Lista base de links do menu
  const menuItens = ['Início', 'Loja', 'Agendar', 'Trabalhos'];

  // Alterna condicionalmente entre "Minha Conta" e "Login"
  if (usuario) {
    menuItens.push('Minha Conta');
  } else {
    menuItens.push('Login');
  }

  const navegacaoMenu: Record<string, () => void> = {
    'Início': () => router.push('/'),
    'Loja': () => router.push('/produtos'),
    'Agendar': () => router.push('/agenda'),
    'Trabalhos': () => router.push('/trabalhos'),
    'Minha Conta': () => router.push('/perfil'),
    'Login': () => router.push('/login'),
  };

  return (
    <View style={styles.cabecalhoWrapper}>
      <View style={[styles.cabecalho, telaGrande && styles.cabecalhoGrande]}>
        <TouchableOpacity onPress={() => router.push('/')} activeOpacity={0.8}>
          <Image
            source={require('../../assets/images/homepage/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={styles.menu}>
          {menuItens.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.itemMenu}
              onPress={navegacaoMenu[item]}
            >
              <Text style={styles.textoMenu}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cabecalhoWrapper: {
    width: '100%',
    backgroundColor: '#0f1314',
    alignItems: 'center',
  },
  cabecalho: {
    width: '100%',
    maxWidth: 1200,
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 16,
  },
  cabecalhoGrande: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  logo: {
    width: 90,
    height: 75,
  },
  menu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  itemMenu: {
    paddingVertical: 6,
  },
  textoMenu: {
    color: '#E8E5DF',
    fontSize: 14,
    fontWeight: '500',
  },
});