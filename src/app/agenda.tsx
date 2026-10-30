import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Modal,
  useWindowDimensions,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

import Header from '../components/Header';
import Footer from '../components/Footer';

// =====================================================
// GOLDEN BARBER - AGENDA EXCLUSIVA
// Ficheiro: src/app/agenda.tsx
// =====================================================

const CORES = {
  fundo: '#0f1314',
  marrom: '#2c251d',
  dourado: '#bb975a',
  douradoHover: '#d4af37',
  texto: '#F4F0E8',
  cinza: '#A59A8B',
  cinzaEscuro: '#1e2322',
  card: '#151817',
  cardInterno: '#1c201f',
  cardBorda: '#2d3330',
  sucesso: '#4CAF50',
};

// DADOS DE SERVIÇOS
const SERVICOS = [
  { id: '1', nome: 'Corte de Cabelo', duracaoMin: 40, preco: 'R$ 65,00', valorNum: 65 },
  { id: '2', nome: 'Barba & Vapor', duracaoMin: 35, preco: 'R$ 50,00', valorNum: 50 },
  { id: '3', nome: 'Corte + Barba', duracaoMin: 75, preco: 'R$ 105,00', valorNum: 105 },
  { id: '4', nome: 'Sobrancelha', duracaoMin: 15, preco: 'R$ 25,00', valorNum: 25 },
  { id: '5', nome: 'Combo Completo', duracaoMin: 90, preco: 'R$ 130,00', valorNum: 130 },
];

// DADOS DE BARBEIROS
const BARBEIROS = [
  {
    id: '1',
    nome: 'Guilherme',
    avaliacao: '5.0',
    imagem: require('../../assets/images/barbers/guilherme.webp'),
  },
  {
    id: '2',
    nome: 'Paulo',
    avaliacao: '4.9',
    imagem: require('../../assets/images/barbers/paulo.webp'),
  },
  {
    id: '3',
    nome: 'Renan',
    avaliacao: '4.8',
    imagem: require('../../assets/images/barbers/renan.png'),
  },
];

// HORÁRIOS
const HORARIOS_DISPONIVEIS = [
  '09:00', '10:00', '11:00',
  '14:00', '15:00', '16:00',
  '17:00', '18:00', '19:00',
];

// DIAS DO MÊS
const DIAS_CALENDARIO = Array.from({ length: 31 }, (_, i) => i + 1);

export default function Agenda() {
  const router = useRouter();
  const auth = useAuth();
  const { width } = useWindowDimensions();

  const [telaGrande, setTelaGrande] = useState(false);

  // ESTADOS DO AGENDAMENTO
  const [servicoSel, setServicoSel] = useState(SERVICOS[0]);
  const [barbeiroSel, setBarbeiroSel] = useState(BARBEIROS[0]);
  const [diaSel, setDiaSel] = useState(22);
  const [horarioSel, setHorarioSel] = useState('16:00');
  const [modalSucesso, setModalSucesso] = useState(false);

  useEffect(() => {
    setTelaGrande(width >= 992);
  }, [width]);

  const confirmarAgendamento = () => {
    if (auth && auth.agendar) {
      auth.agendar({
        id: `ag-${Date.now()}`,
        servico: servicoSel.nome,
        barbeiro: barbeiroSel.nome,
        data: `${diaSel} de Outubro de 2026`,
        horario: horarioSel,
        duracao: `${servicoSel.duracaoMin} min`,
        preco: servicoSel.preco,
        status: 'Confirmado',
      });
    }
    setModalSucesso(true);
  };

  return (
    <SafeAreaView style={styles.tela}>
      <StatusBar barStyle="light-content" />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* CABEÇALHO REUTILIZÁVEL */}
        <Header />

        {/* HERO / BANNER SUPERIOR */}
        <ImageBackground
          source={require('../../assets/images/homepage/barbeiro-e-ambiente.jpg')}
          style={styles.heroBanner}
          imageStyle={styles.heroBannerImg}
          resizeMode="cover"
        >
          <View style={styles.heroSombra} />
          <View style={styles.heroConteudoWrapper}>
            <View style={styles.heroConteudo}>
              <Text style={styles.heroTag}>ESTILO • CONFIANÇA • ATITUDE</Text>
              <Text style={styles.heroTitulo}>Seu estilo,{'\n'}nossa paixão.</Text>
              <Text style={styles.heroDescricao}>
                Agende seu horário e viva a melhor experiência de barbearia.
              </Text>
            </View>
          </View>
        </ImageBackground>

        {/* WIDGET PRINCIPAL DE AGENDAMENTO */}
        <View style={styles.secaoAgendamento}>
          <View style={styles.agendamentoCardPrincipal}>
            {/* TOPO DO WIDGET */}
            <View style={styles.widgetHeader}>
              <View>
                <Text style={styles.widgetTitulo}>Agende seu horário</Text>
                <View style={styles.linhaIndicadora} />
              </View>
              <View style={styles.atendimentoBox}>
                <Text style={styles.atendimentoIcone}>🕒</Text>
                <View>
                  <Text style={styles.atendimentoTag}>ATENDIMENTO</Text>
                  <Text style={styles.atendimentoHorario}>SEG - SÁB: 09h às 20h</Text>
                </View>
              </View>
            </View>

            {/* ETAPAS */}
            <View style={styles.etapasBarra}>
              <View style={[styles.etapaItem, styles.etapaAtiva]}>
                <View style={styles.etapaNumeroAtivo}>
                  <Text style={styles.etapaNumeroTextoAtivo}>1</Text>
                </View>
                <View style={styles.etapaTextos}>
                  <Text style={styles.etapaTituloAtivo}>Serviço</Text>
                  <Text style={styles.etapaSub}>Escolha o serviço</Text>
                </View>
              </View>

              <View style={styles.etapaItem}>
                <View style={styles.etapaNumero}>
                  <Text style={styles.etapaNumeroTexto}>2</Text>
                </View>
                <View style={styles.etapaTextos}>
                  <Text style={styles.etapaTitulo}>Barbeiro</Text>
                  <Text style={styles.etapaSub}>Escolha o profissional</Text>
                </View>
              </View>

              <View style={styles.etapaItem}>
                <View style={styles.etapaNumero}>
                  <Text style={styles.etapaNumeroTexto}>3</Text>
                </View>
                <View style={styles.etapaTextos}>
                  <Text style={styles.etapaTitulo}>Data e hora</Text>
                  <Text style={styles.etapaSub}>Selecione data e horário</Text>
                </View>
              </View>

              <View style={styles.etapaItem}>
                <View style={styles.etapaNumero}>
                  <Text style={styles.etapaNumeroTexto}>4</Text>
                </View>
                <View style={styles.etapaTextos}>
                  <Text style={styles.etapaTitulo}>Confirmar</Text>
                  <Text style={styles.etapaSub}>Revise e confirme</Text>
                </View>
              </View>
            </View>

            {/* GRID DAS COLUNAS DE AGENDAMENTO */}
            <View
              style={[
                styles.gridAgendamento,
                telaGrande ? styles.gridGrande : styles.gridMobile,
              ]}
            >
              {/* COLUNA 1: SERVIÇOS */}
              <View style={styles.coluna}>
                <Text style={styles.colunaTitulo}>Escolha o serviço</Text>
                <View style={styles.listaOpcoes}>
                  {SERVICOS.map((servico) => {
                    const ativo = servicoSel.id === servico.id;
                    return (
                      <TouchableOpacity
                        key={servico.id}
                        style={[styles.cardOpcao, ativo && styles.cardOpcaoAtivo]}
                        onPress={() => setServicoSel(servico)}
                      >
                        <View style={styles.opcaoInfo}>
                          <Text
                            style={[
                              styles.opcaoTitulo,
                              ativo && styles.textoDourado,
                            ]}
                          >
                            {servico.nome}
                          </Text>
                          <Text style={styles.opcaoPreco}>{servico.preco}</Text>
                        </View>
                        <View
                          style={[
                            styles.radioOuter,
                            ativo && styles.radioOuterAtivo,
                          ]}
                        >
                          {ativo && <View style={styles.radioInner} />}
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <Text style={styles.notaRodapeOpcoes}>
                  ⓘ Todos os serviços incluem toalha quente e finalização.
                </Text>
              </View>

              {/* COLUNA 2: BARBEIROS */}
              <View style={styles.coluna}>
                <Text style={styles.colunaTitulo}>Escolha o barbeiro</Text>
                <View style={styles.listaOpcoes}>
                  {BARBEIROS.map((barbeiro) => {
                    const ativo = barbeiroSel.id === barbeiro.id;
                    return (
                      <TouchableOpacity
                        key={barbeiro.id}
                        style={[
                          styles.cardBarbeiroOption,
                          ativo && styles.cardOpcaoAtivo,
                        ]}
                        onPress={() => setBarbeiroSel(barbeiro)}
                      >
                        <Image
                          source={barbeiro.imagem}
                          style={styles.avatarBarbeiro}
                        />
                        <View style={styles.infoBarbeiroBox}>
                          <Text
                            style={[
                              styles.nomeBarbeiroOption,
                              ativo && styles.textoDourado,
                            ]}
                          >
                            {barbeiro.nome}
                          </Text>
                          <Text style={styles.ratingBarbeiro}>
                            ★ {barbeiro.avaliacao}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.radioOuter,
                            ativo && styles.radioOuterAtivo,
                          ]}
                        >
                          {ativo && <View style={styles.radioInner} />}
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* COLUNA 3: CALENDÁRIO E HORÁRIOS */}
              <View style={styles.coluna}>
                <Text style={styles.colunaTitulo}>Escolha a data</Text>

                {/* CALENDÁRIO COMPACTO */}
                <View style={styles.calendarioBox}>
                  <Text style={styles.mesAnoTexto}>Outubro 2026</Text>
                  <View style={styles.diasSemanaHeader}>
                    {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'].map((d) => (
                      <Text key={d} style={styles.diaSemanaLabel}>
                        {d}
                      </Text>
                    ))}
                  </View>
                  <View style={styles.gridDias}>
                    {DIAS_CALENDARIO.slice(0, 28).map((dia) => {
                      const ativo = diaSel === dia;
                      return (
                        <TouchableOpacity
                          key={dia}
                          style={[styles.diaCell, ativo && styles.diaCellAtivo]}
                          onPress={() => setDiaSel(dia)}
                        >
                          <Text
                            style={[
                              styles.diaTexto,
                              ativo && styles.diaTextoAtivo,
                            ]}
                          >
                            {dia}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* GRID DE HORÁRIOS */}
                <Text style={[styles.colunaTitulo, { marginTop: 16 }]}>
                  Escolha o horário
                </Text>
                <View style={styles.gridHorarios}>
                  {HORARIOS_DISPONIVEIS.map((horario) => {
                    const ativo = horarioSel === horario;
                    return (
                      <TouchableOpacity
                        key={horario}
                        style={[
                          styles.chipHorario,
                          ativo && styles.chipHorarioAtivo,
                        ]}
                        onPress={() => setHorarioSel(horario)}
                      >
                        <Text
                          style={[
                            styles.chipHorarioTexto,
                            ativo && styles.chipHorarioTextoAtivo,
                          ]}
                        >
                          {horario}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* COLUNA 4: RESUMO DO AGENDAMENTO */}
              <View style={[styles.coluna, styles.colunaResumo]}>
                <Text style={styles.colunaTitulo}>Resumo do agendamento</Text>

                <View style={styles.resumoBox}>
                  <View style={styles.resumoLinha}>
                    <Text style={styles.resumoLabel}>Serviço</Text>
                    <Text style={styles.resumoValorMain}>{servicoSel.nome}</Text>
                    <Text style={styles.resumoPrecoItem}>{servicoSel.preco}</Text>
                  </View>

                  <View style={styles.resumoDivisor} />

                  <View style={styles.resumoLinha}>
                    <Text style={styles.resumoLabel}>Barbeiro</Text>
                    <Text style={styles.resumoValor}>{barbeiroSel.nome}</Text>
                  </View>

                  <View style={styles.resumoLinha}>
                    <Text style={styles.resumoLabel}>Data</Text>
                    <Text style={styles.resumoValor}>
                      {diaSel} de Outubro de 2026
                    </Text>
                  </View>

                  <View style={styles.resumoLinha}>
                    <Text style={styles.resumoLabel}>Horário</Text>
                    <Text style={styles.resumoValor}>{horarioSel}</Text>
                  </View>

                  <View style={styles.resumoLinha}>
                    <Text style={styles.resumoLabel}>Duração</Text>
                    <Text style={styles.resumoValor}>
                      {servicoSel.duracaoMin} min
                    </Text>
                  </View>

                  <View style={styles.resumoDivisorDourado} />

                  <View style={styles.resumoTotalLinha}>
                    <Text style={styles.resumoTotalLabel}>Total</Text>
                    <Text style={styles.resumoTotalValor}>{servicoSel.preco}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.btnConfirmar}
                    onPress={confirmarAgendamento}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.btnConfirmarTexto}>
                      CONFIRMAR AGENDAMENTO
                    </Text>
                  </TouchableOpacity>

                  <Text style={styles.segurancaTexto}>
                    Seus dados estão seguros conosco.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* BARRA DE DIFERENCIAIS */}
        <View style={styles.secaoDiferenciais}>
          <View style={styles.diferenciaisInner}>
            <View style={styles.diferencialCard}>
              <Text style={styles.diferencialIcone}>📅</Text>
              <Text style={styles.diferencialTitulo}>Agendamento rápido</Text>
              <Text style={styles.diferencialDesc}>
                Marque seu horário em poucos cliques.
              </Text>
            </View>

            <View style={styles.diferencialCard}>
              <Text style={styles.diferencialIcone}>💈</Text>
              <Text style={styles.diferencialTitulo}>Profissionais qualificados</Text>
              <Text style={styles.diferencialDesc}>
                Barbeiros experientes para um resultado impecável.
              </Text>
            </View>

            <View style={styles.diferencialCard}>
              <Text style={styles.diferencialIcone}>🛋️</Text>
              <Text style={styles.diferencialTitulo}>Ambiente premium</Text>
              <Text style={styles.diferencialDesc}>
                Conforto e qualidade que você merece.
              </Text>
            </View>

            <View style={styles.diferencialCard}>
              <Text style={styles.diferencialIcone}>💳</Text>
              <Text style={styles.diferencialTitulo}>Pagamento facilitado</Text>
              <Text style={styles.diferencialDesc}>
                Diversas formas de pagamento para sua comodidade.
              </Text>
            </View>
          </View>
        </View>

        {/* RODAPÉ REUTILIZÁVEL */}
        <Footer />
      </ScrollView>

      {/* MODAL DE SUCESSO */}
      <Modal
        visible={modalSucesso}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalSucesso(false)}
      >
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalIcone}>✓</Text>
            <Text style={styles.modalTitulo}>Agendamento Confirmado!</Text>
            <Text style={styles.modalDesc}>
              Seu agendamento para{' '}
              <Text style={{ color: CORES.dourado }}>{servicoSel.nome}</Text> com{' '}
              <Text style={{ color: CORES.dourado }}>{barbeiroSel.nome}</Text> no dia{' '}
              <Text style={{ color: CORES.dourado }}>
                {diaSel} de Outubro às {horarioSel}
              </Text>{' '}
              foi reservado com sucesso.
            </Text>

            <TouchableOpacity
              style={styles.modalBotao}
              onPress={() => {
                setModalSucesso(false);
                router.push('/perfil');
              }}
            >
              <Text style={styles.modalBotaoTexto}>VER MEUS AGENDAMENTOS →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// =====================================================
// ESTILOS
// =====================================================

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: CORES.fundo,
  },
  scroll: {
    flex: 1,
  },

  // HERO BANNER
  heroBanner: {
    width: '100%',
    height: 280,
    justifyContent: 'center',
    position: 'relative',
  },
  heroBannerImg: {
    opacity: 0.35,
  },
  heroSombra: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(15, 19, 20, 0.75)',
  },
  heroConteudoWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  heroConteudo: {
    width: '100%',
    maxWidth: 1200,
    paddingHorizontal: 30,
  },
  heroTag: {
    color: CORES.dourado,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 8,
  },
  heroTitulo: {
    color: CORES.texto,
    fontSize: 38,
    fontFamily: 'serif',
    fontWeight: 'bold',
    lineHeight: 44,
    marginBottom: 10,
  },
  heroDescricao: {
    color: CORES.cinza,
    fontSize: 15,
  },

  // SEÇÃO AGENDAMENTO WIDGET
  secaoAgendamento: {
    width: '100%',
    alignItems: 'center',
    marginTop: -40,
    paddingHorizontal: 16,
    marginBottom: 50,
  },
  agendamentoCardPrincipal: {
    width: '100%',
    maxWidth: 1200,
    backgroundColor: CORES.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: CORES.cardBorda,
    padding: 24,
  },

  // WIDGET HEADER
  widgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  widgetTitulo: {
    color: CORES.texto,
    fontSize: 26,
    fontFamily: 'serif',
    fontWeight: 'bold',
  },
  linhaIndicadora: {
    height: 3,
    width: 40,
    backgroundColor: CORES.dourado,
    marginTop: 6,
  },
  atendimentoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  atendimentoIcone: {
    fontSize: 20,
  },
  atendimentoTag: {
    color: CORES.cinza,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  atendimentoHorario: {
    color: CORES.texto,
    fontSize: 12,
    fontWeight: 'bold',
  },

  // ETAPAS
  etapasBarra: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    backgroundColor: CORES.cardInterno,
    padding: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#242a27',
    marginBottom: 28,
    gap: 12,
  },
  etapaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    opacity: 0.5,
  },
  etapaAtiva: {
    opacity: 1,
  },
  etapaNumero: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2a302d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  etapaNumeroAtivo: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: CORES.dourado,
    justifyContent: 'center',
    alignItems: 'center',
  },
  etapaNumeroTexto: {
    color: CORES.texto,
    fontWeight: 'bold',
    fontSize: 12,
  },
  etapaNumeroTextoAtivo: {
    color: '#171510',
    fontWeight: 'bold',
    fontSize: 12,
  },
  etapaTextos: {
    justifyContent: 'center',
  },
  etapaTitulo: {
    color: CORES.texto,
    fontSize: 13,
    fontWeight: 'bold',
  },
  etapaTituloAtivo: {
    color: CORES.dourado,
    fontSize: 13,
    fontWeight: 'bold',
  },
  etapaSub: {
    color: CORES.cinza,
    fontSize: 10,
  },

  // GRID DAS COLUNAS
  gridAgendamento: {
    width: '100%',
    gap: 20,
  },
  gridGrande: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  gridMobile: {
    flexDirection: 'column',
  },
  coluna: {
    flex: 1,
    backgroundColor: CORES.cardInterno,
    padding: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#222826',
    minWidth: 240,
  },
  colunaTitulo: {
    color: CORES.texto,
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  listaOpcoes: {
    gap: 10,
  },
  cardOpcao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: CORES.card,
    padding: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#2a302d',
  },
  cardOpcaoAtivo: {
    borderColor: CORES.dourado,
    backgroundColor: '#202624',
  },
  opcaoInfo: {
    flex: 1,
  },
  opcaoTitulo: {
    color: CORES.texto,
    fontSize: 14,
    fontWeight: '600',
  },
  opcaoPreco: {
    color: CORES.cinza,
    fontSize: 12,
    marginTop: 2,
  },
  textoDourado: {
    color: CORES.dourado,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: CORES.cinza,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterAtivo: {
    borderColor: CORES.dourado,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: CORES.dourado,
  },
  notaRodapeOpcoes: {
    color: CORES.cinza,
    fontSize: 11,
    marginTop: 14,
    lineHeight: 16,
  },

  // CARD BARBEIRO
  cardBarbeiroOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CORES.card,
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#2a302d',
    gap: 12,
  },
  avatarBarbeiro: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2a302d',
  },
  infoBarbeiroBox: {
    flex: 1,
  },
  nomeBarbeiroOption: {
    color: CORES.texto,
    fontSize: 14,
    fontWeight: 'bold',
  },
  ratingBarbeiro: {
    color: CORES.dourado,
    fontSize: 12,
    marginTop: 2,
  },

  // CALENDÁRIO
  calendarioBox: {
    backgroundColor: CORES.card,
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#2a302d',
  },
  mesAnoTexto: {
    color: CORES.texto,
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  diasSemanaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  diaSemanaLabel: {
    color: CORES.cinza,
    fontSize: 9,
    width: 28,
    textAlign: 'center',
  },
  gridDias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    justifyContent: 'center',
  },
  diaCell: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  diaCellAtivo: {
    backgroundColor: CORES.dourado,
  },
  diaTexto: {
    color: CORES.texto,
    fontSize: 11,
  },
  diaTextoAtivo: {
    color: '#171510',
    fontWeight: 'bold',
  },

  // HORÁRIOS
  gridHorarios: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chipHorario: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: CORES.card,
    borderWidth: 1,
    borderColor: '#2a302d',
  },
  chipHorarioAtivo: {
    backgroundColor: CORES.dourado,
    borderColor: CORES.dourado,
  },
  chipHorarioTexto: {
    color: CORES.texto,
    fontSize: 12,
  },
  chipHorarioTextoAtivo: {
    color: '#171510',
    fontWeight: 'bold',
  },

  // RESUMO
  colunaResumo: {
    backgroundColor: '#191e1d',
    borderColor: CORES.dourado + '44',
  },
  resumoBox: {
    marginTop: 4,
  },
  resumoLinha: {
    marginBottom: 10,
  },
  resumoLabel: {
    color: CORES.cinza,
    fontSize: 11,
  },
  resumoValorMain: {
    color: CORES.texto,
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 2,
  },
  resumoPrecoItem: {
    color: CORES.dourado,
    fontSize: 12,
    fontWeight: 'bold',
  },
  resumoValor: {
    color: CORES.texto,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  resumoDivisor: {
    height: 1,
    backgroundColor: '#2a302d',
    marginVertical: 10,
  },
  resumoDivisorDourado: {
    height: 1,
    backgroundColor: CORES.dourado,
    marginVertical: 14,
    opacity: 0.5,
  },
  resumoTotalLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  resumoTotalLabel: {
    color: CORES.texto,
    fontSize: 14,
    fontWeight: 'bold',
  },
  resumoTotalValor: {
    color: CORES.dourado,
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnConfirmar: {
    backgroundColor: CORES.dourado,
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnConfirmarTexto: {
    color: '#171510',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  segurancaTexto: {
    color: CORES.cinza,
    fontSize: 10,
    textAlign: 'center',
  },

  // DIFERENCIAIS
  secaoDiferenciais: {
    width: '100%',
    backgroundColor: CORES.marrom,
    paddingVertical: 40,
    alignItems: 'center',
  },
  diferenciaisInner: {
    width: '100%',
    maxWidth: 1200,
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 20,
  },
  diferencialCard: {
    flex: 1,
    minWidth: 200,
    alignItems: 'flex-start',
  },
  diferencialIcone: {
    fontSize: 24,
    marginBottom: 10,
  },
  diferencialTitulo: {
    color: CORES.texto,
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  diferencialDesc: {
    color: CORES.cinza,
    fontSize: 12,
    lineHeight: 18,
  },

  // MODAL
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: CORES.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: CORES.dourado,
    padding: 28,
    alignItems: 'center',
  },
  modalIcone: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: CORES.dourado,
    color: '#171510',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 50,
    marginBottom: 16,
  },
  modalTitulo: {
    color: CORES.texto,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalDesc: {
    color: CORES.cinza,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 24,
  },
  modalBotao: {
    backgroundColor: CORES.dourado,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    width: '100%',
    alignItems: 'center',
  },
  modalBotaoTexto: {
    color: '#171510',
    fontWeight: 'bold',
    fontSize: 13,
  },
});