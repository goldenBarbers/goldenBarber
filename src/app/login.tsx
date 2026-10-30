import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

import Header from '../components/Header';
import Footer from '../components/Footer';

// =====================================================
// GOLDEN BARBER - ACESSAR CONTA / LOGIN
// Ficheiro: src/app/login.tsx
// =====================================================

const CORES = {
  fundo: '#0f1314',
  marrom: '#2c251d',
  dourado: '#bb975a',
  texto: '#F4F0E8',
  cinza: '#A59A8B',
  card: '#151817',
  cardBorda: '#242A28',
  inputFundo: '#181b1c',
  vermelho: '#BF616A',
};

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = () => {
    if (!email.trim() || !senha.trim()) {
      setErro('Por favor, preencha o e-mail e a senha.');
      return;
    }

    // Se o usuário não preencher o nome, utiliza o prefixo do e-mail
    const nomeFinal = nome.trim() || email.split('@')[0];

    // Envia o Nome e o E-mail para o estado global
    login(nomeFinal, email.trim());

    // Redireciona para o Perfil
    router.replace('/perfil');
  };

  const preencherDadosTeste = () => {
    setNome('Gabriel Santos');
    setEmail('gabriel.santos@email.com');
    setSenha('123456');
    setErro('');
  };

  return (
    <SafeAreaView style={styles.tela}>
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
      >
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* CABEÇALHO REUTILIZÁVEL */}
          <Header />

          {/* HERO DA PÁGINA */}
          <View style={styles.heroSecao}>
            <View style={styles.heroConteudo}>
              <Text style={styles.subtituloDourado}>COLLEZIONE PRIVATA</Text>
              <Text style={styles.tituloHero}>Acessar Conta</Text>
              <Text style={styles.descricaoHero}>
                Entre com suas credenciais para gerenciar seus agendamentos,
                histórico e preferências exclusivas na Golden Barber.
              </Text>
            </View>
          </View>

          {/* FORMULÁRIO DE LOGIN */}
          <View style={styles.secaoFormulario}>
            <View style={styles.containerInner}>
              <View style={styles.formCard}>
                {erro !== '' && (
                  <View style={styles.containerErro}>
                    <Text style={styles.txtErro}>{erro}</Text>
                  </View>
                )}

                <View style={styles.inputGroup}>
                  <Text style={styles.labelInput}>NOME COMPLETO (OPCIONAL)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: Gabriel Santos"
                    placeholderTextColor={CORES.cinza}
                    value={nome}
                    onChangeText={setNome}
                    autoCapitalize="words"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.labelInput}>E-MAIL</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="seu.email@exemplo.com"
                    placeholderTextColor={CORES.cinza}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.labelInput}>SENHA</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    placeholderTextColor={CORES.cinza}
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry
                  />
                </View>

                <TouchableOpacity
                  style={styles.btnEntrar}
                  onPress={handleLogin}
                  activeOpacity={0.85}
                >
                  <Text style={styles.txtBtnEntrar}>ENTRAR NA CONTA</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.btnTeste}
                  onPress={preencherDadosTeste}
                  activeOpacity={0.7}
                >
                  <Text style={styles.txtBtnTeste}>
                    ⚡ Preencher Dados de Teste
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* RODAPÉ REUTILIZÁVEL */}
          <Footer />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// =====================================================
// ESTILOS - GOLDEN BARBER
// =====================================================

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: CORES.fundo,
  },
  keyboardContainer: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },

  // HERO
  heroSecao: {
    width: '100%',
    backgroundColor: CORES.marrom,
    paddingVertical: 45,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: CORES.dourado + '33',
  },
  heroConteudo: {
    maxWidth: 700,
    alignItems: 'center',
  },
  subtituloDourado: {
    color: CORES.dourado,
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tituloHero: {
    color: CORES.texto,
    fontSize: 34,
    fontWeight: 'bold',
    fontFamily: 'serif',
    marginBottom: 14,
    textAlign: 'center',
  },
  descricaoHero: {
    color: CORES.cinza,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },

  // FORMULÁRIO
  secaoFormulario: {
    width: '100%',
    backgroundColor: CORES.fundo,
    paddingVertical: 50,
    alignItems: 'center',
  },
  containerInner: {
    width: '100%',
    maxWidth: 480,
    paddingHorizontal: 20,
  },
  formCard: {
    backgroundColor: CORES.card,
    borderRadius: 6,
    padding: 28,
    borderWidth: 1,
    borderColor: CORES.cardBorda,
  },
  containerErro: {
    backgroundColor: 'rgba(191, 97, 106, 0.15)',
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: CORES.vermelho,
    marginBottom: 20,
  },
  txtErro: {
    color: CORES.vermelho,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 20,
  },
  labelInput: {
    color: CORES.dourado,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  input: {
    backgroundColor: CORES.inputFundo,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#2f3633',
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: CORES.texto,
    fontSize: 14,
  },
  btnEntrar: {
    backgroundColor: CORES.dourado,
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  txtBtnEntrar: {
    color: '#171510',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  btnTeste: {
    marginTop: 18,
    alignItems: 'center',
    paddingVertical: 8,
  },
  txtBtnTeste: {
    color: CORES.dourado,
    fontSize: 12,
    fontWeight: '600',
  },
});