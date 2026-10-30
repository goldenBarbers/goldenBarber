import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';

const CORES = {
  fundo: '#0f1314',
  dourado: '#bb975a',
  texto: '#F4F0E8',
};

export default function Footer() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [telaGrande, setTelaGrande] = useState(false);

  useEffect(() => {
    setTelaGrande(width >= 768);
  }, [width]);

  const whatsapp = '5511999999999';

  const abrirWhatsApp = () => {
    Linking.openURL(`https://wa.me/${whatsapp}`);
  };

  const abrirInstagram = () => {
    Linking.openURL('https://www.instagram.com/');
  };

  return (
    <View style={styles.rodape}>
      <View style={styles.rodapeInner}>
        <View
          style={[
            styles.conteudoRodape,
            telaGrande && styles.conteudoRodapeGrande,
          ]}
        >
          <Image
            source={require('../../assets/images/homepage/logo.png')}
            style={styles.logoRodape}
            resizeMode="contain"
          />

          <View style={styles.colunaCentral}>
            <Text style={styles.nomeRodape}>Golden Barber</Text>
            <TouchableOpacity
              style={styles.botaoDestaque}
              onPress={() => router.push('/produtos')}
              activeOpacity={0.8}
            >
              <Text style={styles.textoBotaoDestaque}>Explorar Loja</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.colunaEndereco}>
            <Text style={styles.tituloEndereco}>Horário & Local</Text>
            <Text style={styles.textoEndereco}>
              Segunda a Sábado: 09h às 20h
            </Text>
            <Text style={styles.textoEndereco}>
              Av. Principal, 1000 - Centro
            </Text>
            <Text style={styles.textoEndereco}>Sorocaba - SP</Text>
          </View>
        </View>

        <View style={styles.linhaDourada} />

        <View style={styles.informacoesFinais}>
          <Text style={styles.textoFinal}>© 2026 Golden Barber</Text>

          <TouchableOpacity onPress={abrirInstagram}>
            <Text style={styles.textoFinal}>Instagram</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={abrirWhatsApp}>
            <Text style={styles.textoFinal}>WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rodape: {
    width: '100%',
    backgroundColor: CORES.fundo,
    paddingVertical: 45,
    alignItems: 'center',
  },
  rodapeInner: {
    width: '100%',
    maxWidth: 1200,
    paddingHorizontal: 25,
  },
  conteudoRodape: {
    alignItems: 'center',
    gap: 28,
  },
  conteudoRodapeGrande: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoRodape: {
    width: 120,
    height: 120,
  },
  colunaCentral: {
    alignItems: 'center',
    gap: 16,
  },
  nomeRodape: {
    color: CORES.dourado,
    fontSize: 28,
    fontFamily: 'serif',
    fontWeight: 'bold',
  },
  colunaEndereco: {
    alignItems: 'center',
  },
  tituloEndereco: {
    color: CORES.texto,
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textoEndereco: {
    color: '#D5D4CF',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
  linhaDourada: {
    height: 1,
    backgroundColor: CORES.dourado,
    marginTop: 32,
    marginBottom: 20,
    opacity: 0.6,
  },
  informacoesFinais: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textoFinal: {
    color: '#77766F',
    fontSize: 12,
  },
  botaoDestaque: {
    minWidth: 160,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: CORES.dourado,
    borderWidth: 1,
    borderColor: CORES.dourado,
  },
  textoBotaoDestaque: {
    color: '#171510',
    fontWeight: '600',
    fontSize: 13,
    letterSpacing: 0.3,
  },
});