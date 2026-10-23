import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function TelaLoginEscandinava() {
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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Pressable style={styles.btnVoltar} onPress={() => router.back()}>
            <Text style={styles.txtBtnVoltar}>← VOLTAR</Text>
          </Pressable>

          <View style={styles.headerContainer}>
            <Text style={styles.tagHeader}>COLLEZIONE PRIVATA</Text>
            <Text style={styles.tituloHeader}>Acessar Conta</Text>
            <Text style={styles.subtituloHeader}>
              Entre com suas credenciais para gerenciar seus agendamentos e preferências.
            </Text>
          </View>

          <View style={styles.formCard}>
            {erro !== '' && (
              <View style={styles.containerErro}>
                <Text style={styles.txtErro}>{erro}</Text>
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.labelInput}>NOME COMPLETO</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Gabriel Santos"
                placeholderTextColor="#6C7A89"
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
                placeholderTextColor="#6C7A89"
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
                placeholderTextColor="#6C7A89"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
              />
            </View>

            <Pressable style={styles.btnEntrar} onPress={handleLogin}>
              <Text style={styles.txtBtnEntrar}>ENTRAR NO ATELIER</Text>
            </Pressable>

            <Pressable style={styles.btnTeste} onPress={preencherDadosTeste}>
              <Text style={styles.txtBtnTeste}>⚡ Preencher Dados de Teste</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1D24' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 32 },
  btnVoltar: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: '#222732', borderWidth: 1, borderColor: '#2E3646', marginBottom: 24 },
  txtBtnVoltar: { color: '#8FBCBB', fontSize: 10, fontWeight: 'bold', letterSpacing: 0.8 },
  headerContainer: { marginBottom: 24 },
  tagHeader: { color: '#E5C07B', fontSize: 9, fontWeight: 'bold', letterSpacing: 2, marginBottom: 4 },
  tituloHeader: { color: '#ECEFF4', fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  subtituloHeader: { color: '#98A2B3', fontSize: 12.5, lineHeight: 18 },
  formCard: { backgroundColor: '#222732', borderRadius: 16, padding: 20, borderWidth: 1.5, borderColor: '#2E3646' },
  containerErro: { backgroundColor: 'rgba(191, 97, 106, 0.15)', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#BF616A', marginBottom: 16 },
  txtErro: { color: '#BF616A', fontSize: 11, textAlign: 'center', fontWeight: '600' },
  inputGroup: { marginBottom: 16 },
  labelInput: { color: '#8FBCBB', fontSize: 9, fontWeight: 'bold', letterSpacing: 1.2, marginBottom: 6 },
  input: { backgroundColor: '#1A1D24', borderRadius: 10, borderWidth: 1, borderColor: '#2E3646', paddingHorizontal: 14, paddingVertical: 12, color: '#ECEFF4', fontSize: 13 },
  btnEntrar: { backgroundColor: '#8FBCBB', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  txtBtnEntrar: { color: '#1A1D24', fontSize: 12, fontWeight: 'bold', letterSpacing: 1 },
  btnTeste: { marginTop: 14, alignItems: 'center', paddingVertical: 8 },
  txtBtnTeste: { color: '#E5C07B', fontSize: 11, fontWeight: '600' },
});