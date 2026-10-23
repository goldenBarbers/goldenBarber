import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

const HISTORICO_VISITAS = [
  { id: 'h1', servico: 'Ritual de Barba & Vapor', barbeiro: 'Renan Pereira', data: '12/09/2026', preco: 'R$ 50,00' },
  { id: 'h2', servico: 'Corte de Cabelo Minimalista', barbeiro: 'Paulo Rogério', data: '10/08/2026', preco: 'R$ 65,00' },
];

export default function TelaPerfilEscandinava() {
  const router = useRouter();
  const { usuario, logout, agendamento, cancelarAgendamento } = useAuth();

  const [modalCancelarVisible, setModalCancelarVisible] = useState(false);

  const confirmarCancelamento = () => {
    cancelarAgendamento();
    setModalCancelarVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* CABEÇALHO */}
      <View style={styles.topHeader}>
        <Pressable style={styles.btnVoltar} onPress={() => router.back()}>
          <Text style={styles.txtBtnVoltar}>← VOLTAR</Text>
        </Pressable>

        <View style={styles.tituloHeaderContainer}>
          <Text style={styles.tagHeader}>ÁREA DO CLIENTE</Text>
          <Text style={styles.tituloHeader}>Meu Perfil</Text>
        </View>

        <View style={styles.spacerHeader} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* EXIBIÇÃO DAS INFORMAÇÕES DO USUÁRIO LOGADO */}
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

              <Pressable style={styles.btnSairConta} onPress={logout}>
                <Text style={styles.txtBtnSairConta}>Sair da Conta</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.cardNaoAutenticado}>
            <Text style={styles.tituloNaoAutenticado}>Você não está conectado</Text>
            <Text style={styles.subtituloNaoAutenticado}>
              Faça login para visualizar seus agendamentos, histórico e informações pessoais.
            </Text>
            <Pressable style={styles.btnFazerLogin} onPress={() => router.push('/login')}>
              <Text style={styles.txtBtnFazerLogin}>ENTRAR COM SUA CONTA</Text>
            </Pressable>
          </View>
        )}

        {/* AGENDAMENTO CONECTADO AO ESTADO GLOBAL */}
        <View style={styles.secao}>
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

              <Pressable
                style={styles.btnCancelarAtendimento}
                onPress={() => setModalCancelarVisible(true)}
              >
                <Text style={styles.txtBtnCancelar}>CANCELAR ATENDIMENTO</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.cardSemAgendamento}>
              <Text style={styles.txtSemAgendamento}>
                Você não possui nenhum atendimento agendado no momento.
              </Text>
              <Pressable
                style={styles.btnAgendarAgora}
                onPress={() => router.push('/agenda')}
              >
                <Text style={styles.txtBtnAgendarAgora}>NOVO AGENDAMENTO</Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* HISTÓRICO DE VISITAS */}
        <View style={styles.secao}>
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
      </ScrollView>

      {/* MODAL DE CANCELAMENTO */}
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
              Esta ação liberará o horário de {agendamento?.horario} na {agendamento?.data} para outros clientes.
            </Text>

            <View style={styles.botoesModalContainer}>
              <Pressable style={styles.btnModalVoltar} onPress={() => setModalCancelarVisible(false)}>
                <Text style={styles.txtModalVoltar}>MANTER</Text>
              </Pressable>

              <Pressable style={styles.btnModalConfirmarCancelar} onPress={confirmarCancelamento}>
                <Text style={styles.txtModalConfirmarCancelar}>SIM, CANCELAR</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* BOTTOM NAVIGATION */}
      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem} onPress={() => router.push('/')}>
          <Text style={styles.navIcone}>✂️</Text>
          <Text style={styles.navTexto}>Serviços</Text>
        </Pressable>
        <Pressable style={styles.navItem} onPress={() => router.push('/produtos')}>
          <Text style={styles.navIcone}>🛍️</Text>
          <Text style={styles.navTexto}>Produtos</Text>
        </Pressable>
        <Pressable style={styles.navItem} onPress={() => router.push('/agenda')}>
          <Text style={styles.navIcone}>📅</Text>
          <Text style={styles.navTexto}>Agenda</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <Text style={styles.navIconeAtivo}>👤</Text>
          <Text style={styles.navTextoAtivo}>Perfil</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1D24' },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 28 },
  topHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#2E3646' },
  btnVoltar: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, backgroundColor: '#222732', borderWidth: 1, borderColor: '#2E3646' },
  txtBtnVoltar: { color: '#8FBCBB', fontSize: 10, fontWeight: 'bold', letterSpacing: 0.8 },
  tituloHeaderContainer: { alignItems: 'center' },
  tagHeader: { color: '#E5C07B', fontSize: 8, fontWeight: 'bold', letterSpacing: 1.5 },
  tituloHeader: { color: '#ECEFF4', fontSize: 15, fontWeight: 'bold' },
  spacerHeader: { width: 60 },
  cardPerfilUsuario: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#222732', padding: 16, borderRadius: 16, borderWidth: 1.5, borderColor: '#2E3646', marginBottom: 24 },
  avatarUsuario: { width: 68, height: 68, borderRadius: 34, backgroundColor: '#1A1D24', borderWidth: 2, borderColor: '#8FBCBB' },
  infoUsuario: { flex: 1, marginLeft: 14 },
  linhaNomeBadge: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  nomeUsuario: { color: '#ECEFF4', fontSize: 15, fontWeight: 'bold', flex: 1, marginRight: 6 },
  badgeVip: { backgroundColor: '#1A1D24', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, borderWidth: 1, borderColor: '#E5C07B' },
  txtBadgeVip: { color: '#E5C07B', fontSize: 8.5, fontWeight: 'bold', letterSpacing: 1 },
  emailUsuario: { color: '#8FBCBB', fontSize: 11.5, marginTop: 2 },
  detalheUsuario: { color: '#98A2B3', fontSize: 10.5, marginTop: 3 },
  btnSairConta: { marginTop: 8, alignSelf: 'flex-start' },
  txtBtnSairConta: { color: '#BF616A', fontSize: 10.5, fontWeight: 'bold' },
  cardNaoAutenticado: { backgroundColor: '#222732', padding: 20, borderRadius: 16, borderWidth: 1.5, borderColor: '#2E3646', marginBottom: 24, alignItems: 'center' },
  tituloNaoAutenticado: { color: '#ECEFF4', fontSize: 16, fontWeight: 'bold' },
  subtituloNaoAutenticado: { color: '#98A2B3', fontSize: 11.5, textAlign: 'center', marginTop: 4, marginBottom: 14, lineHeight: 16 },
  btnFazerLogin: { backgroundColor: '#8FBCBB', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  txtBtnFazerLogin: { color: '#1A1D24', fontSize: 10.5, fontWeight: 'bold', letterSpacing: 0.8 },
  secao: { marginBottom: 24 },
  labelSecao: { color: '#8FBCBB', fontSize: 9.5, fontWeight: 'bold', letterSpacing: 1.5, marginBottom: 10 },
  cardAgendamentoAtivo: { backgroundColor: '#222732', borderRadius: 16, borderWidth: 1.5, borderColor: '#8FBCBB', padding: 16 },
  topoCardAgendamento: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  badgeStatusConfirmado: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1D24', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, borderWidth: 1, borderColor: '#2E3646' },
  pontoVerde: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#A3BE8C', marginRight: 6 },
  txtStatusConfirmado: { color: '#A3BE8C', fontSize: 9, fontWeight: 'bold', letterSpacing: 0.8 },
  precoAgendamento: { color: '#E5C07B', fontSize: 16, fontWeight: 'bold' },
  servicoAgendamento: { color: '#ECEFF4', fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  divisorCard: { height: 1, backgroundColor: '#2E3646', marginBottom: 12 },
  gridDetalhesAgendamento: { gap: 10, marginBottom: 16 },
  itemDetalhe: { justifyContent: 'center' },
  labelDetalhe: { color: '#98A2B3', fontSize: 8.5, fontWeight: 'bold', letterSpacing: 1 },
  valorDetalhe: { color: '#ECEFF4', fontSize: 12.5, fontWeight: '600', marginTop: 2 },
  btnCancelarAtendimento: { backgroundColor: '#1A1D24', paddingVertical: 10, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#BF616A' },
  txtBtnCancelar: { color: '#BF616A', fontSize: 10, fontWeight: 'bold', letterSpacing: 0.8 },
  cardSemAgendamento: { backgroundColor: '#222732', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#2E3646', alignItems: 'center' },
  txtSemAgendamento: { color: '#98A2B3', fontSize: 12, textAlign: 'center', marginBottom: 14 },
  btnAgendarAgora: { backgroundColor: '#8FBCBB', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  txtBtnAgendarAgora: { color: '#1A1D24', fontSize: 10.5, fontWeight: 'bold', letterSpacing: 0.8 },
  cardHistorico: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#222732', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#2E3646', marginBottom: 10 },
  infoHistorico: { flex: 1 },
  nomeServicoHistorico: { color: '#ECEFF4', fontSize: 13, fontWeight: 'bold' },
  detalheHistorico: { color: '#98A2B3', fontSize: 10.5, marginTop: 2 },
  precoHistorico: { color: '#98A2B3', fontSize: 12, fontWeight: 'bold' },
  modalBackground: { flex: 1, backgroundColor: 'rgba(26, 29, 36, 0.92)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContainer: { width: '100%', backgroundColor: '#222732', borderRadius: 16, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: '#BF616A' },
  iconeAlerta: { fontSize: 32, marginBottom: 8 },
  tituloModal: { fontSize: 17, fontWeight: 'bold', color: '#ECEFF4', marginBottom: 6 },
  subtituloModal: { fontSize: 12, color: '#98A2B3', textAlign: 'center', lineHeight: 17, marginBottom: 20 },
  botoesModalContainer: { flexDirection: 'row', gap: 10, width: '100%' },
  btnModalVoltar: { flex: 1, paddingVertical: 10, borderRadius: 8, backgroundColor: '#1A1D24', borderWidth: 1, borderColor: '#2E3646', alignItems: 'center' },
  txtModalVoltar: { color: '#ECEFF4', fontSize: 10.5, fontWeight: 'bold' },
  btnModalConfirmarCancelar: { flex: 1, paddingVertical: 10, borderRadius: 8, backgroundColor: '#BF616A', alignItems: 'center' },
  txtModalConfirmarCancelar: { color: '#ECEFF4', fontSize: 10.5, fontWeight: 'bold' },
  bottomNav: { flexDirection: 'row', height: 58, backgroundColor: '#1A1D24', borderTopWidth: 1, borderTopColor: '#2E3646', alignItems: 'center' },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  navIcone: { fontSize: 16, opacity: 0.4 },
  navIconeAtivo: { fontSize: 16 },
  navTexto: { fontSize: 9.5, color: '#98A2B3', marginTop: 2 },
  navTextoAtivo: { fontSize: 9.5, fontWeight: 'bold', color: '#8FBCBB', marginTop: 2 },
});