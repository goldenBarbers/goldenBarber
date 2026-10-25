import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Linking,
  useWindowDimensions,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

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
  const { width } = useWindowDimensions();

  const [telaGrande, setTelaGrande] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

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

  const navegacaoMenu: Record<string, () => void> = {
    'Início': () => router.push('/'),
    'Loja': () => router.push('/produtos'),
    'Agendar': () => router.push('/agenda'),
    'Trabalhos': () => router.push('/trabalhos'),
    'Minha Conta': () => router.push('/perfil'),
    'Login': () => {},
  };

  return (
    <SafeAreaView style={styles.tela}>
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
      >
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* ==========================================
              1. CABEÇALHO
          ========================================== */}
          <View style={styles.cabecalhoWrapper}>
            <View
              style={[
                styles.cabecalho,
                telaGrande && styles.cabecalhoGrande,
              ]}
            >
              <TouchableOpacity onPress={() => router.push('/')}>
                <Image
                  source={require('../../assets/images/homepage/logo.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <View style={styles.menu}>
                {['Início', 'Loja', 'Agendar', 'Trabalhos', 'Minha Conta', 'Login'].map(
                  (item) => (
                    <TouchableOpacity
                      key={item}
                      style={styles.itemMenu}
                      onPress={navegacaoMenu[item]}
                    >
                      <Text
                        style={[
                          styles.textoMenu,
                          item === 'Login' && styles.textoMenuAtivo,
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ),
                )}
              </View>
            </View>
          </View>

          {/* ==========================================
              2. HERO DA PÁGINA
          ========================================== */}
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

          {/* ==========================================
              3. FORMULÁRIO DE LOGIN
          ========================================== */}
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

          {/* ==========================================
              4. RODAPÉ PRINCIPAL
          ========================================== */}
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
                    style={styles.botaoDestaqueRodape}
                    onPress={() => router.push('/agenda')}
                  >
                    <Text style={styles.textoBotaoDestaqueRodape}>
                      Agendar Horário
                    </Text>
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

  // CABEÇALHO
  cabecalhoWrapper: {
    width: '100%',
    backgroundColor: CORES.fundo,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1e2422',
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
  textoMenuAtivo: {
    color: CORES.dourado,
    fontWeight: 'bold',
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

  // RODAPÉ
  rodape: {
    width: '100%',
    backgroundColor: CORES.fundo,
    paddingVertical: 45,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#1e2422',
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
  botaoDestaqueRodape: {
    backgroundColor: CORES.dourado,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  textoBotaoDestaqueRodape: {
    color: '#171510',
    fontWeight: '600',
    fontSize: 13,
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
});