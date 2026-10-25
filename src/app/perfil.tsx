import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Linking,
  useWindowDimensions,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

// =====================================================
// GOLDEN BARBER - ÁREA DO CLIENTE / MEU PERFIL
// Ficheiro: src/app/perfil.tsx
// =====================================================

const CORES = {
  fundo: '#0f1314',
  marrom: '#2c251d',
  dourado: '#bb975a',
  texto: '#F4F0E8',
  cinza: '#A59A8B',
  card: '#151817',
  cardBorda: '#242A28',
  vermelho: '#BF616A',
  verde: '#A3BE8C',
};

const HISTORICO_VISITAS = [
  { id: 'h1', servico: 'Ritual de Barba & Vapor', barbeiro: 'Renan Pereira', data: '12/09/2026', preco: 'R$ 50,00' },
  { id: 'h2', servico: 'Corte de Cabelo Minimalista', barbeiro: 'Paulo Rogério', data: '10/08/2026', preco: 'R$ 65,00' },
];

export default function Perfil() {
  const router = useRouter();
  const { usuario, logout, agendamento, cancelarAgendamento } = useAuth();
  const { width } = useWindowDimensions();

  const [telaGrande, setTelaGrande] = useState(false);
  const [modalCancelarVisible, setModalCancelarVisible] = useState(false);

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

  const confirmarCancelamento = () => {
    cancelarAgendamento();
    setModalCancelarVisible(false);
  };

  const navegacaoMenu: Record<string, () => void> = {
    'Início': () => router.push('/'),
    'Loja': () => router.push('/produtos'),
    'Agendar': () => router.push('/agenda'),
    'Trabalhos': () => router.push('/trabalhos'),
    'Minha Conta': () => {},
    'Login': () => router.push('/login'),
  };

  return (
    <SafeAreaView style={styles.tela}>
      <StatusBar barStyle="light-content" />

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
                        item === 'Minha Conta' && styles.textoMenuAtivo,
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
            2. HERO / CABEÇALHO DA PÁGINA
        ========================================== */}
        <View style={styles.heroSecao}>
          <View style={styles.heroConteudo}>
            <Text style={styles.subtituloDourado}>ÁREA DO CLIENTE</Text>
            <Text style={styles.tituloHero}>Meu Perfil</Text>
            <Text style={styles.descricaoHero}>
              Gerencie seus agendamentos, acompanhe seu histórico de atendimento
              e acesse suas informações pessoais de forma exclusiva.
            </Text>
          </View>
        </View>

        {/* ==========================================
            3. CONTEÚDO PRINCIPAL DO PERFIL
        ========================================== */}
        <View style={styles.secaoConteudo}>
          <View style={styles.containerInner}>
            {/* INFORMAÇÕES DO USUÁRIO LOGADO */}
            {usuario ? (
              <View style={styles.cardPerfilUsuario}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300' }}
                  style={styles.avatarUsuario}
                />

                <View style={styles.infoUsuario}>
                  <View style={styles.linhaNomeBadge}>
                    <Text style={styles.nomeUsuario} numberOfLines={1}>
                      {usuario.nome}
                    </Text>
                    <View style={styles.badgeVip}>
                      <Text style={styles.txtBadgeVip}>MEMBER</Text>
                    </View>
                  </View>

                  <Text style={styles.emailUsuario} numberOfLines={1}>
                    {usuario.email}
                  </Text>
                  <Text style={styles.detalheUsuario}>🗓 Membro Ativo</Text>

                  <TouchableOpacity
                    style={styles.btnSairConta}
                    onPress={logout}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.txtBtnSairConta}>Sair da Conta</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.cardNaoAutenticado}>
                <Text style={styles.tituloNaoAutenticado}>
                  Você não está conectado
                </Text>
                <Text style={styles.subtituloNaoAutenticado}>
                  Faça login para visualizar seus agendamentos, histórico e
                  informações pessoais.
                </Text>
                <TouchableOpacity
                  style={styles.btnFazerLogin}
                  onPress={() => router.push('/login')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.txtBtnFazerLogin}>ENTRAR COM SUA CONTA</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* PRÓXIMO ATENDIMENTO */}
            <View style={styles.secaoBloco}>
              <Text style={styles.labelSecao}>PRÓXIMO ATENDIMENTO</Text>

              {agendamento ? (
                <View style={styles.cardAgendamentoAtivo}>
                  <View style={styles.topoCardAgendamento}>
                    <View style={styles.badgeStatusConfirmado}>
                      <View style={styles.pontoVerde} />
                      <Text style={styles.txtStatusConfirmado}>
                        {agendamento.status.toUpperCase()}
                      </Text>
                    </View>
                    <Text style={styles.precoAgendamento}>{agendamento.preco}</Text>
                  </View>

                  <Text style={styles.servicoAgendamento}>{agendamento.servico}</Text>

                  <View style={styles.divisorCard} />

                  <View style={styles.gridDetalhesAgendamento}>
                    <View style={styles.itemDetalhe}>
                      <Text style={styles.labelDetalhe}>PROFISSIONAL</Text>
                      <Text style={styles.valorDetalhe}>✂️ {agendamento.barbeiro}</Text>
                    </View>

                    <View style={styles.itemDetalhe}>
                      <Text style={styles.labelDetalhe}>DATA E HORÁRIO</Text>
                      <Text style={styles.valorDetalhe}>
                        📅 {agendamento.data} às {agendamento.horario}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.btnCancelarAtendimento}
                    onPress={() => setModalCancelarVisible(true)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.txtBtnCancelar}>CANCELAR ATENDIMENTO</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.cardSemAgendamento}>
                  <Text style={styles.txtSemAgendamento}>
                    Você não possui nenhum atendimento agendado no momento.
                  </Text>
                  <TouchableOpacity
                    style={styles.btnAgendarAgora}
                    onPress={() => router.push('/agenda')}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.txtBtnAgendarAgora}>NOVO AGENDAMENTO</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* HISTÓRICO DE VISITAS */}
            <View style={styles.secaoBloco}>
              <Text style={styles.labelSecao}>HISTÓRICO DE VISITAS</Text>

              {HISTORICO_VISITAS.map((item) => (
                <View key={item.id} style={styles.cardHistorico}>
                  <View style={styles.infoHistorico}>
                    <Text style={styles.nomeServicoHistorico}>{item.servico}</Text>
                    <Text style={styles.detalheHistorico}>
                      {item.barbeiro} • {item.data}
                    </Text>
                  </View>
                  <Text style={styles.precoHistorico}>{item.preco}</Text>
                </View>
              ))}
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

      {/* ==========================================
          5. MODAL DE CANCELAMENTO DE ATENDIMENTO
      ========================================== */}
      <Modal
        visible={modalCancelarVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalCancelarVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.iconeAlerta}>⚠️</Text>
            <Text style={styles.tituloModal}>Cancelar Atendimento?</Text>
            <Text style={styles.subtituloModal}>
              Esta ação liberará o horário de {agendamento?.horario} na{' '}
              {agendamento?.data} para outros clientes.
            </Text>

            <View style={styles.botoesModalContainer}>
              <TouchableOpacity
                style={styles.btnModalVoltar}
                onPress={() => setModalCancelarVisible(false)}
              >
                <Text style={styles.txtModalVoltar}>MANTER</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnModalConfirmarCancelar}
                onPress={confirmarCancelamento}
              >
                <Text style={styles.txtModalConfirmarCancelar}>
                  SIM, CANCELAR
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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

  // CONTEÚDO PRINCIPAL
  secaoConteudo: {
    width: '100%',
    backgroundColor: CORES.fundo,
    paddingVertical: 40,
    alignItems: 'center',
  },
  containerInner: {
    width: '100%',
    maxWidth: 800,
    paddingHorizontal: 20,
  },

  // USER CARD
  cardPerfilUsuario: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CORES.card,
    padding: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: CORES.cardBorda,
    marginBottom: 28,
  },
  avatarUsuario: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#1c1f1e',
    borderWidth: 2,
    borderColor: CORES.dourado,
  },
  infoUsuario: {
    flex: 1,
    marginLeft: 18,
  },
  linhaNomeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nomeUsuario: {
    color: CORES.texto,
    fontSize: 18,
    fontFamily: 'serif',
    fontWeight: 'bold',
    flex: 1,
    marginRight: 6,
  },
  badgeVip: {
    backgroundColor: '#1c1e1d',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: CORES.dourado,
  },
  txtBadgeVip: {
    color: CORES.dourado,
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  emailUsuario: {
    color: CORES.cinza,
    fontSize: 13,
    marginTop: 4,
  },
  detalheUsuario: {
    color: CORES.dourado,
    fontSize: 12,
    marginTop: 4,
  },
  btnSairConta: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  txtBtnSairConta: {
    color: CORES.vermelho,
    fontSize: 12,
    fontWeight: 'bold',
  },

  // NÃO AUTENTICADO
  cardNaoAutenticado: {
    backgroundColor: CORES.card,
    padding: 28,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: CORES.cardBorda,
    marginBottom: 28,
    alignItems: 'center',
  },
  tituloNaoAutenticado: {
    color: CORES.texto,
    fontSize: 18,
    fontFamily: 'serif',
    fontWeight: 'bold',
  },
  subtituloNaoAutenticado: {
    color: CORES.cinza,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 18,
    lineHeight: 18,
    maxWidth: 450,
  },
  btnFazerLogin: {
    backgroundColor: CORES.dourado,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 4,
  },
  txtBtnFazerLogin: {
    color: '#171510',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.8,
  },

  // BLOCOS DE SEÇÃO
  secaoBloco: {
    marginBottom: 32,
  },
  labelSecao: {
    color: CORES.dourado,
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: 12,
  },

  // AGENDAMENTO CARD
  cardAgendamentoAtivo: {
    backgroundColor: CORES.card,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: CORES.dourado,
    padding: 20,
  },
  topoCardAgendamento: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  badgeStatusConfirmado: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181f1b',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: CORES.verde,
  },
  pontoVerde: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: CORES.verde,
    marginRight: 6,
  },
  txtStatusConfirmado: {
    color: CORES.verde,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.8,
  },
  precoAgendamento: {
    color: CORES.dourado,
    fontSize: 18,
    fontWeight: 'bold',
  },
  servicoAgendamento: {
    color: CORES.texto,
    fontSize: 18,
    fontFamily: 'serif',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  divisorCard: {
    height: 1,
    backgroundColor: '#242a27',
    marginBottom: 14,
  },
  gridDetalhesAgendamento: {
    gap: 10,
    marginBottom: 18,
  },
  itemDetalhe: {
    justifyContent: 'center',
  },
  labelDetalhe: {
    color: CORES.cinza,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  valorDetalhe: {
    color: CORES.texto,
    fontSize: 13.5,
    fontWeight: '600',
    marginTop: 2,
  },
  btnCancelarAtendimento: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: CORES.vermelho,
  },
  txtBtnCancelar: {
    color: CORES.vermelho,
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.8,
  },

  // SEM AGENDAMENTO
  cardSemAgendamento: {
    backgroundColor: CORES.card,
    padding: 24,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: CORES.cardBorda,
    alignItems: 'center',
  },
  txtSemAgendamento: {
    color: CORES.cinza,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 16,
  },
  btnAgendarAgora: {
    backgroundColor: CORES.dourado,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 4,
  },
  txtBtnAgendarAgora: {
    color: '#171510',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.8,
  },

  // HISTÓRICO VISITAS
  cardHistorico: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: CORES.card,
    padding: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: CORES.cardBorda,
    marginBottom: 12,
  },
  infoHistorico: {
    flex: 1,
  },
  nomeServicoHistorico: {
    color: CORES.texto,
    fontSize: 14,
    fontFamily: 'serif',
    fontWeight: 'bold',
  },
  detalheHistorico: {
    color: CORES.cinza,
    fontSize: 12,
    marginTop: 3,
  },
  precoHistorico: {
    color: CORES.dourado,
    fontSize: 13,
    fontWeight: 'bold',
  },

  // MODAL CANCELAMENTO
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(15, 19, 20, 0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: CORES.card,
    borderRadius: 6,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: CORES.vermelho,
  },
  iconeAlerta: {
    fontSize: 32,
    marginBottom: 10,
  },
  tituloModal: {
    fontSize: 18,
    fontFamily: 'serif',
    fontWeight: 'bold',
    color: CORES.texto,
    marginBottom: 8,
  },
  subtituloModal: {
    fontSize: 13,
    color: CORES.cinza,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 22,
  },
  botoesModalContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  btnModalVoltar: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 4,
    backgroundColor: '#1f2422',
    borderWidth: 1,
    borderColor: CORES.cardBorda,
    alignItems: 'center',
  },
  txtModalVoltar: {
    color: CORES.texto,
    fontSize: 11,
    fontWeight: 'bold',
  },
  btnModalConfirmarCancelar: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 4,
    backgroundColor: CORES.vermelho,
    alignItems: 'center',
  },
  txtModalConfirmarCancelar: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
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