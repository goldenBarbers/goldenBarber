import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

const SERVICOS = [
  { id: 'corte', nome: 'Corte de Cabelo Minimalista', duracaoMin: 40, preco: 'R$ 65,00' },
  { id: 'barba', nome: 'Ritual de Barba & Vapor', duracaoMin: 35, preco: 'R$ 50,00' },
  { id: 'combo', nome: 'Experiência Completa Nórdica', duracaoMin: 75, preco: 'R$ 105,00' },
];

const DIAS_SEMANA = [
  { id: 'Seg', nome: 'Segunda-feira', data: '26/10' },
  { id: 'Ter', nome: 'Terça-feira', data: '27/10' },
  { id: 'Qua', nome: 'Quarta-feira', data: '28/10' },
  { id: 'Qui', nome: 'Quinta-feira', data: '29/10' },
  { id: 'Sex', nome: 'Sexta-feira', data: '30/10' },
  { id: 'Sab', nome: 'Sábado', data: '31/10' },
];

export default function TelaAgendaEscandinava() {
  const router = useRouter();
  const { agendar } = useAuth();

  const [servicoId, setServicoId] = useState('corte');
  const [diaId, setDiaId] = useState('Seg');
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);

  const [horariosReservados, setHorariosReservados] = useState<{ [key: string]: string[] }>({
    Seg: ['09:00', '11:00'],
    Ter: ['10:15'],
  });

  const [modalSucesso, setModalSucesso] = useState(false);

  const servicoAtual = SERVICOS.find((s) => s.id === servicoId) || SERVICOS[0];
  const diaAtual = DIAS_SEMANA.find((d) => d.id === diaId) || DIAS_SEMANA[0];

  const gerarHorariosDisponiveis = () => {
    const slots: string[] = [];
    let atualMin = 9 * 60;
    const fimMin = 19 * 60;
    const duracao = servicoAtual.duracaoMin;

    while (atualMin + duracao <= fimMin) {
      const horas = Math.floor(atualMin / 60);
      const minutos = atualMin % 60;
      const horaFormatada = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}`;
      slots.push(horaFormatada);
      atualMin += duracao;
    }

    const reservadosNoDia = horariosReservados[diaId] || [];
    return slots.filter((horario) => !reservadosNoDia.includes(horario));
  };

  const horariosLivres = gerarHorariosDisponiveis();

  const confirmarAgendamento = () => {
    if (!horarioSelecionado) return;

    // Salva o horário na lista local de bloqueios
    setHorariosReservados((prev) => ({
      ...prev,
      [diaId]: [...(prev[diaId] || []), horarioSelecionado],
    }));

    // Envia o novo agendamento para o estado global do AuthContext
    agendar({
      id: `ag-${Date.now()}`,
      servico: servicoAtual.nome,
      barbeiro: 'Paulo Rogério',
      data: `${diaAtual.nome}, ${diaAtual.data}`,
      horario: horarioSelecionado,
      duracao: `${servicoAtual.duracaoMin} min`,
      preco: servicoAtual.preco,
      status: 'Confirmado',
    });

    setModalSucesso(true);
  };

  const fecharModalEIrParaPerfil = () => {
    setModalSucesso(false);
    setHorarioSelecionado(null);
    router.push('/perfil');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topHeader}>
        <Pressable style={styles.btnVoltar} onPress={() => router.back()}>
          <Text style={styles.txtBtnVoltar}>← VOLTAR</Text>
        </Pressable>

        <View style={styles.tituloHeaderContainer}>
          <Text style={styles.tagHeader}>AGENDA NÓRDICA</Text>
          <Text style={styles.tituloHeader}>Escolha o Horário</Text>
        </View>

        <View style={styles.spacerHeader} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.secao}>
          <Text style={styles.labelSecao}>1. SERVIÇO E DURAÇÃO</Text>
          <View style={styles.containerServicos}>
            {SERVICOS.map((servico) => {
              const isSelected = servicoId === servico.id;
              return (
                <Pressable
                  key={servico.id}
                  style={[styles.cardServicoOption, isSelected && styles.cardServicoOptionAtivo]}
                  onPress={() => {
                    setServicoId(servico.id);
                    setHorarioSelecionado(null);
                  }}
                >
                  <Text style={[styles.txtNomeServico, isSelected && styles.txtNomeServicoAtivo]}>
                    {servico.nome}
                  </Text>
                  <Text style={styles.txtDuracaoServico}>
                    ⏱ {servico.duracaoMin} min • {servico.preco}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.secao}>
          <Text style={styles.labelSecao}>2. DIA DA SEMANA</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carrosselDias}>
            {DIAS_SEMANA.map((dia) => {
              const isSelected = diaId === dia.id;
              return (
                <Pressable
                  key={dia.id}
                  style={[styles.cardDia, isSelected && styles.cardDiaAtivo]}
                  onPress={() => {
                    setDiaId(dia.id);
                    setHorarioSelecionado(null);
                  }}
                >
                  <Text style={[styles.txtNomeDia, isSelected && styles.txtNomeDiaAtivo]}>
                    {dia.nome}
                  </Text>
                  <Text style={[styles.txtDataDia, isSelected && styles.txtDataDiaAtivo]}>
                    {dia.data}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.secao}>
          <View style={styles.headerHorarios}>
            <Text style={styles.labelSecao}>
              3. HORÁRIOS DISPONÍVEIS ({servicoAtual.duracaoMin} MIN)
            </Text>
            <Text style={styles.sublabelHorarios}>
              Intervalos calculados para {servicoAtual.nome}
            </Text>
          </View>

          {horariosLivres.length === 0 ? (
            <View style={styles.cardSemHorario}>
              <Text style={styles.txtSemHorario}>
                Não há horários disponíveis para este serviço na {diaAtual.nome}.
              </Text>
            </View>
          ) : (
            <View style={styles.gridHorarios}>
              {horariosLivres.map((horario) => {
                const isSelected = horarioSelecionado === horario;
                return (
                  <Pressable
                    key={horario}
                    style={[styles.chipHorario, isSelected && styles.chipHorarioAtivo]}
                    onPress={() => setHorarioSelecionado(horario)}
                  >
                    <Text style={[styles.txtHorario, isSelected && styles.txtHorarioAtivo]}>
                      {horario}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.containerCTAFlutuante}>
        <View style={styles.resumoCTA}>
          <Text style={styles.txtResumoTop}>RESUMO DA RESERVA</Text>
          <Text style={styles.txtResumoItens} numberOfLines={1}>
            {diaAtual.nome} • {horarioSelecionado ? horarioSelecionado : 'Escolha um horário'}
          </Text>
        </View>

        <Pressable
          style={[styles.btnCTA, !horarioSelecionado && styles.btnCTADesabilitado]}
          disabled={!horarioSelecionado}
          onPress={confirmarAgendamento}
        >
          <Text style={[styles.txtBtnCTA, !horarioSelecionado && styles.txtBtnCTADesabilitado]}>
            CONFIRMAR AGENDAMENTO
          </Text>
        </Pressable>
      </View>

      <Modal visible={modalSucesso} transparent={true} animationType="fade" onRequestClose={fecharModalEIrParaPerfil}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.iconeSucesso}>✓</Text>
            <Text style={styles.tituloModal}>Agendamento Confirmado!</Text>
            <Text style={styles.subtituloModal}>
              Seu horário para {servicoAtual.nome} na {diaAtual.nome} às {horarioSelecionado} foi reservado com sucesso.
            </Text>

            <Pressable style={styles.btnModalFechar} onPress={fecharModalEIrParaPerfil}>
              <Text style={styles.txtModalFechar}>VER NO PERFIL →</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem} onPress={() => router.push('/')}>
          <Text style={styles.navIcone}>✂️</Text>
          <Text style={styles.navTexto}>Serviços</Text>
        </Pressable>
        <Pressable style={styles.navItem} onPress={() => router.push('/produtos')}>
          <Text style={styles.navIcone}>🛍️</Text>
          <Text style={styles.navTexto}>Produtos</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <Text style={styles.navIconeAtivo}>📅</Text>
          <Text style={styles.navTextoAtivo}>Agenda</Text>
        </Pressable>
        <Pressable style={styles.navItem} onPress={() => router.push('/perfil')}>
          <Text style={styles.navIcone}>👤</Text>
          <Text style={styles.navTexto}>Perfil</Text>
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
  secao: { marginBottom: 24 },
  labelSecao: { color: '#8FBCBB', fontSize: 9.5, fontWeight: 'bold', letterSpacing: 1.5, marginBottom: 10 },
  containerServicos: { gap: 8 },
  cardServicoOption: { backgroundColor: '#222732', padding: 12, borderRadius: 12, borderWidth: 1.5, borderColor: '#2E3646', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardServicoOptionAtivo: { borderColor: '#8FBCBB', backgroundColor: '#28303C' },
  txtNomeServico: { color: '#ECEFF4', fontSize: 13.5, fontWeight: 'bold' },
  txtNomeServicoAtivo: { color: '#8FBCBB' },
  txtDuracaoServico: { color: '#98A2B3', fontSize: 11 },
  carrosselDias: { paddingRight: 16 },
  cardDia: { width: 110, paddingVertical: 12, paddingHorizontal: 8, backgroundColor: '#222732', borderRadius: 12, borderWidth: 1.5, borderColor: '#2E3646', alignItems: 'center', marginRight: 10 },
  cardDiaAtivo: { borderColor: '#8FBCBB', backgroundColor: '#8FBCBB' },
  txtNomeDia: { color: '#ECEFF4', fontSize: 11.5, fontWeight: 'bold' },
  txtNomeDiaAtivo: { color: '#1A1D24' },
  txtDataDia: { color: '#98A2B3', fontSize: 10, marginTop: 2 },
  txtDataDiaAtivo: { color: '#1A1D24', fontWeight: 'bold' },
  headerHorarios: { marginBottom: 10 },
  sublabelHorarios: { color: '#98A2B3', fontSize: 11, marginTop: -6, marginBottom: 10 },
  gridHorarios: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chipHorario: { width: '30%', paddingVertical: 12, backgroundColor: '#222732', borderRadius: 10, borderWidth: 1, borderColor: '#2E3646', alignItems: 'center' },
  chipHorarioAtivo: { backgroundColor: '#8FBCBB', borderColor: '#8FBCBB' },
  txtHorario: { color: '#ECEFF4', fontSize: 13, fontWeight: 'bold' },
  txtHorarioAtivo: { color: '#1A1D24' },
  cardSemHorario: { padding: 20, backgroundColor: '#222732', borderRadius: 12, borderWidth: 1, borderColor: '#2E3646', alignItems: 'center' },
  txtSemHorario: { color: '#98A2B3', fontSize: 12, textAlign: 'center' },
  containerCTAFlutuante: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#222732', borderTopWidth: 1, borderTopColor: '#2E3646' },
  resumoCTA: { flex: 1, marginRight: 10 },
  txtResumoTop: { color: '#98A2B3', fontSize: 8.5, fontWeight: 'bold', letterSpacing: 1 },
  txtResumoItens: { color: '#ECEFF4', fontSize: 12, fontWeight: 'bold', marginTop: 1 },
  btnCTA: { backgroundColor: '#8FBCBB', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  btnCTADesabilitado: { backgroundColor: '#2E3646' },
  txtBtnCTA: { fontSize: 11, fontWeight: 'bold', color: '#1A1D24', letterSpacing: 0.8 },
  txtBtnCTADesabilitado: { color: '#98A2B3' },
  modalBackground: { flex: 1, backgroundColor: 'rgba(26, 29, 36, 0.92)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContainer: { width: '100%', backgroundColor: '#222732', borderRadius: 16, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: '#8FBCBB' },
  iconeSucesso: { fontSize: 36, color: '#8FBCBB', marginBottom: 10 },
  tituloModal: { fontSize: 18, fontWeight: 'bold', color: '#ECEFF4', marginBottom: 8 },
  subtituloModal: { fontSize: 12, color: '#98A2B3', textAlign: 'center', lineHeight: 18, marginBottom: 20 },
  btnModalFechar: { backgroundColor: '#8FBCBB', width: '100%', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  txtModalFechar: { color: '#1A1D24', fontWeight: 'bold', fontSize: 12, letterSpacing: 1 },
  bottomNav: { flexDirection: 'row', height: 58, backgroundColor: '#1A1D24', borderTopWidth: 1, borderTopColor: '#2E3646', alignItems: 'center' },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  navIcone: { fontSize: 16, opacity: 0.4 },
  navIconeAtivo: { fontSize: 16 },
  navTexto: { fontSize: 9.5, color: '#98A2B3', marginTop: 2 },
  navTextoAtivo: { fontSize: 9.5, fontWeight: 'bold', color: '#8FBCBB', marginTop: 2 },
});