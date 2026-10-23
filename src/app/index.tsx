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
import { Video, ResizeMode } from 'expo-av';
import { useRouter } from 'expo-router';

// ----------------------------------------------------------------------
// 0. DADOS LOCAIS (ESTILO ESCANDINAVO MINIMALISTA)
// ----------------------------------------------------------------------

const LOGO_BARBEARIA = require('../../assets/images/logo.png');

const CATEGORIAS = ['Todos', 'Cabelo', 'Barba', 'Combos Especiais'];

const BARBEIROS = [
  {
    id: '1',
    nome: 'Guilherme Melos',
    especialidade: 'Especialista em Corte & Tesoura',
    nota: '★ 5.0',
    imagem: require('../../assets/images/barbers/guilherme.webp'),
    videoSource: { uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' },
  },
  {
    id: '2',
    nome: 'Paulo Rogério',
    especialidade: 'Visagismo Escandinavo',
    nota: '★ 4.9',
    imagem: require('../../assets/images/barbers/paulo.webp'),
    videoSource: { uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' },
  },
  {
    id: '3',
    nome: 'Renan Pereira',
    especialidade: 'Cuidado & Navalha Clássica',
    nota: '★ 4.8',
    imagem: require('../../assets/images/barbers/renan.png'),
    videoSource: { uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' },
  },
];

const SERVICOS = [
  {
    id: '1',
    nome: 'Corte de Cabelo Minimalista',
    subtitulo: 'Análise de caimento natural, lavagem orgânica e alinhamento',
    duracao: '40 min',
    preco: 'R$ 65,00',
    precoNum: 65,
    categoria: 'Cabelo',
    imagem: require('../../assets/images/services/corte.jpg'),
  },
  {
    id: '2',
    nome: 'Ritual de Barba & Vapor',
    subtitulo: 'Toalha aquecida, óleos botânicos e alinhamento de precisão',
    duracao: '35 min',
    preco: 'R$ 50,00',
    precoNum: 50,
    categoria: 'Barba',
    imagem: require('../../assets/images/services/barba.jpg'),
  },
  {
    id: '3',
    nome: 'Experiência Completa Nórdica',
    subtitulo: 'Corte artesanal, ritual de barba completo e higienização capilar',
    duracao: '75 min',
    preco: 'R$ 105,00',
    precoNum: 105,
    categoria: 'Combos Especiais',
    imagem: require('../../assets/images/services/combo.jpg'),
  },
];

// ----------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------
export default function TelaInicialEscandinava() {
  const router = useRouter();

  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState('2');
  const [servicoSelecionado, setServicoSelecionado] = useState('1');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');
  const [barbeiroVideoModal, setBarbeiroVideoModal] = useState<any>(null);

  const servicosFiltrados = SERVICOS.filter((servico) => {
    if (categoriaSelecionada === 'Todos') return true;
    return servico.categoria === categoriaSelecionada;
  });

  const servicoAtual = SERVICOS.find((s) => s.id === servicoSelecionado);
  const valorTotalCalculado = servicoAtual ? servicoAtual.precoNum : 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ========================================== */}
        {/* 1. CABEÇALHO ESCANDINAVO                   */}
        {/* ========================================== */}
        <View style={styles.topHeader}>
          <View style={styles.containerLogo}>
            <Image
              source={LOGO_BARBEARIA}
              style={styles.logoSimboloImage}
              resizeMode="contain"
            />
            <View style={styles.textoBrandContainer}>
              <Text style={styles.textoLogoPequeno}>BARBEARIA & ESTÚDIO</Text>
              <Text style={styles.textoLogoGrande}>GOLDEN BARBER</Text>
            </View>
          </View>

          <View style={styles.badgeStatus}>
            <View style={styles.pontoVerde} />
            <Text style={styles.textoStatus}>ABERTO</Text>
          </View>
        </View>

        {/* ========================================== */}
        {/* 2. BANNER MINIMALISTA (HERO)               */}
        {/* ========================================== */}
        <View style={styles.heroBanner}>
          <Text style={styles.heroTag}>DESIGN & CUIDADO MASCULINO</Text>
          <Text style={styles.heroTitulo}>Simplicidade & Precisão</Text>
          <Text style={styles.heroSubtitulo}>
            Agendamentos descomplicados com foco no seu bem-estar e estilo natural.
          </Text>
        </View>

        {/* ========================================== */}
        {/* 3. SEÇÃO BARBEIROS (CARROSSEL)             */}
        {/* ========================================== */}
        <View style={styles.secao}>
          <View style={styles.headerSecao}>
            <Text style={styles.tituloSecao}>Profissionais</Text>
            <Text style={styles.subtituloSecao}>Selecione quem atenderá você hoje</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carrosselBarbeiros}
          >
            {BARBEIROS.map((barbeiro) => {
              const isSelected = barbeiroSelecionado === barbeiro.id;
              return (
                <Pressable
                  key={barbeiro.id}
                  style={[
                    styles.cardBarbeiro,
                    isSelected && styles.cardBarbeiroSelecionado,
                  ]}
                  onPress={() => setBarbeiroSelecionado(barbeiro.id)}
                >
                  <View style={styles.containerFotoBarbeiro}>
                    <Image source={barbeiro.imagem} style={styles.fotoBarbeiro} />

                    <View style={styles.badgeNota}>
                      <Text style={styles.textoBadgeNota}>{barbeiro.nota}</Text>
                    </View>

                    <Pressable
                      style={styles.badgeVideoFlutuante}
                      onPress={(e) => {
                        e.stopPropagation();
                        setBarbeiroVideoModal(barbeiro);
                      }}
                    >
                      <Text style={styles.textoBadgeVideo}>🎬 VER TRABALHO</Text>
                    </Pressable>
                  </View>

                  <View style={styles.corpoCardBarbeiro}>
                    <Text style={styles.nomeBarbeiro} numberOfLines={1}>
                      {barbeiro.nome}
                    </Text>
                    <Text style={styles.especialidadeBarbeiro} numberOfLines={1}>
                      {barbeiro.especialidade}
                    </Text>

                    <View
                      style={[
                        styles.indicadorBarbeiro,
                        isSelected && styles.indicadorBarbeiroAtivo,
                      ]}
                    >
                      <Text
                        style={[
                          styles.txtIndicadorBarbeiro,
                          isSelected && styles.txtIndicadorBarbeiroAtivo,
                        ]}
                      >
                        {isSelected ? 'SELECIONADO' : 'SELECIONAR'}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* ========================================== */}
        {/* 4. BANNER LOJA DE PRODUTOS AUTORAIS        */}
        {/* ========================================== */}
        <View style={styles.cardVitrineProdutos}>
          <View style={styles.infoVitrine}>
            <Text style={styles.tagVitrine}>LINHA AUTORAL</Text>
            <Text style={styles.tituloVitrine}>Loja de Cuidados</Text>
            <Text style={styles.subtituloVitrine}>
              Produtos orgânicos e pomadas exclusivas para o dia a dia.
            </Text>
          </View>
          <Pressable
            style={styles.btnAcessarLoja}
            onPress={() => router.push('/produtos')}
          >
            <Text style={styles.txtBtnAcessarLoja}>VER PRODUTOS →</Text>
          </Pressable>
        </View>

        {/* ========================================== */}
        {/* 5. CARROSSEL HORIZONTAL DE SERVIÇOS        */}
        {/* ========================================== */}
        <View style={styles.secao}>
          <View style={styles.headerSecao}>
            <Text style={styles.tituloSecao}>Serviços Disponíveis</Text>
            <Text style={styles.subtituloSecao}>Deslize para o lado e selecione a opção</Text>
          </View>

          {/* Abas de Categorias */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.containerFiltros}
          >
            {CATEGORIAS.map((cat) => {
              const isSelected = categoriaSelecionada === cat;
              return (
                <Pressable
                  key={cat}
                  style={[
                    styles.chipCategoria,
                    isSelected && styles.chipCategoriaAtivo,
                  ]}
                  onPress={() => setCategoriaSelecionada(cat)}
                >
                  <Text
                    style={[
                      styles.textoChip,
                      isSelected && styles.textoChipAtivo,
                    ]}
                  >
                    {cat}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* Carrossel de Cards de Serviços */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carrosselServicos}
          >
            {servicosFiltrados.map((servico) => {
              const isSelected = servicoSelecionado === servico.id;
              return (
                <Pressable
                  key={servico.id}
                  style={[
                    styles.cardServicoHorizontal,
                    isSelected && styles.cardServicoHorizontalSelecionado,
                  ]}
                  onPress={() => setServicoSelecionado(servico.id)}
                >
                  <View style={styles.containerImagemServicoHorizontal}>
                    <Image source={servico.imagem} style={styles.imagemServicoHorizontal} />
                    <View style={styles.pillDuracaoFlutuante}>
                      <Text style={styles.txtPillDuracaoFlutuante}>⏱ {servico.duracao}</Text>
                    </View>
                  </View>

                  <View style={styles.corpoServicoHorizontal}>
                    <Text
                      style={[
                        styles.nomeServicoHorizontal,
                        isSelected && styles.nomeServicoHorizontalSelecionado,
                      ]}
                      numberOfLines={1}
                    >
                      {servico.nome}
                    </Text>

                    <Text style={styles.subtituloServicoHorizontal} numberOfLines={2}>
                      {servico.subtitulo}
                    </Text>

                    <View style={styles.rodapeServicoHorizontal}>
                      <Text
                        style={[
                          styles.precoServicoHorizontal,
                          isSelected && styles.precoServicoHorizontalSelecionado,
                        ]}
                      >
                        {servico.preco}
                      </Text>

                      <View
                        style={[
                          styles.btnAcaoServicoHorizontal,
                          isSelected && styles.btnAcaoServicoHorizontalAtivo,
                        ]}
                      >
                        <Text
                          style={[
                            styles.txtBtnAcaoServicoHorizontal,
                            isSelected && styles.txtBtnAcaoServicoHorizontalAtivo,
                          ]}
                        >
                          {isSelected ? 'SELECIONADO ✓' : 'ESCOLHER'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>

      {/* ========================================== */}
      {/* MODAL DE VÍDEO DO BARBEIRO                 */}
      {/* ========================================== */}
      <Modal
        visible={barbeiroVideoModal !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setBarbeiroVideoModal(null)}
      >
        {barbeiroVideoModal && (
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Pressable
                style={styles.botaoFecharModal}
                onPress={() => setBarbeiroVideoModal(null)}
              >
                <Text style={styles.textoFecharModal}>✕ FECHAR</Text>
              </Pressable>

              <Video
                source={barbeiroVideoModal.videoSource}
                style={styles.videoPreview}
                resizeMode={ResizeMode.COVER}
                isLooping
                shouldPlay
                isMuted={true}
              />

              <View style={styles.modalInfoBarbeiro}>
                <Text style={styles.nomeBarbeiroModal}>
                  {barbeiroVideoModal.nome}
                </Text>
                <Text style={styles.especialidadeModal}>
                  {barbeiroVideoModal.especialidade}
                </Text>

                <Pressable
                  style={styles.botaoAgendarModal}
                  onPress={() => {
                    setBarbeiroSelecionado(barbeiroVideoModal.id);
                    setBarbeiroVideoModal(null);
                  }}
                >
                  <Text style={styles.textoAgendarModal}>
                    CONFIRMAR PROFISSIONAL
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      </Modal>

      {/* ========================================== */}
      {/* 6. BARRA DE AÇÃO FIXA (CTA)                 */}
      {/* ========================================== */}
      <View style={styles.containerCTAFlutuante}>
        <View style={styles.resumoCTA}>
          <Text style={styles.txtResumoTop}>SERVIÇO SELECIONADO</Text>
          <Text style={styles.txtResumoItens} numberOfLines={1}>
            {servicoAtual ? servicoAtual.nome : 'Selecione um serviço'}
          </Text>
        </View>

        <Pressable style={styles.btnCTA}>
          <Text style={styles.txtBtnCTA}>
            AVANÇAR • R$ {valorTotalCalculado},00
          </Text>
        </Pressable>
      </View>

      {/* NAVEGAÇÃO INFERIOR */}
      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem}>
          <Text style={styles.navIconeAtivo}>✂️</Text>
          <Text style={styles.navTextoAtivo}>Serviços</Text>
        </Pressable>
        <Pressable
          style={styles.navItem}
          onPress={() => router.push('/produtos')}
        >
          <Text style={styles.navIcone}>🛍️</Text>
          <Text style={styles.navTexto}>Produtos</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <Text style={styles.navIcone}>📅</Text>
          <Text style={styles.navTexto}>Agenda</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <Text style={styles.navIcone}>👤</Text>
          <Text style={styles.navTexto}>Perfil</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// ----------------------------------------------------------------------
// ESTILOS COM CARROSSEL HORIZONTAL DE SERVIÇOS
// ----------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1D24',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 28,
  },

  // Header
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
    marginTop: 6,
  },
  containerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoSimboloImage: {
    width: 38,
    height: 38,
    marginRight: 10,
  },
  textoBrandContainer: {
    justifyContent: 'center',
  },
  textoLogoPequeno: {
    color: '#8FBCBB',
    fontSize: 8.5,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: -1,
  },
  textoLogoGrande: {
    color: '#ECEFF4',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  badgeStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222732',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2E3646',
  },
  pontoVerde: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#A3BE8C',
    marginRight: 6,
  },
  textoStatus: {
    fontSize: 9,
    color: '#A3BE8C',
    fontWeight: 'bold',
    letterSpacing: 0.8,
  },

  // Hero Banner
  heroBanner: {
    backgroundColor: '#222732',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2E3646',
    marginBottom: 24,
  },
  heroTag: {
    color: '#8FBCBB',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 6,
  },
  heroTitulo: {
    color: '#ECEFF4',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  heroSubtitulo: {
    color: '#98A2B3',
    fontSize: 12,
    lineHeight: 17,
  },

  // Seções
  secao: {
    marginBottom: 28,
  },
  headerSecao: {
    marginBottom: 14,
  },
  tituloSecao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ECEFF4',
    letterSpacing: 0.3,
  },
  subtituloSecao: {
    fontSize: 11.5,
    color: '#98A2B3',
    marginTop: 2,
  },

  // Carrossel Barbeiros
  carrosselBarbeiros: {
    paddingRight: 16,
  },
  cardBarbeiro: {
    width: 155,
    backgroundColor: '#222732',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2E3646',
    overflow: 'hidden',
    marginRight: 12,
  },
  cardBarbeiroSelecionado: {
    borderColor: '#8FBCBB',
    backgroundColor: '#29303D',
  },
  containerFotoBarbeiro: {
    width: '100%',
    height: 145,
    backgroundColor: '#1A1D24',
    position: 'relative',
  },
  fotoBarbeiro: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  badgeNota: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(26, 29, 36, 0.88)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  textoBadgeNota: {
    color: '#E5C07B',
    fontSize: 10,
    fontWeight: 'bold',
  },
  badgeVideoFlutuante: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    backgroundColor: 'rgba(26, 29, 36, 0.88)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: '#8FBCBB',
  },
  textoBadgeVideo: {
    color: '#8FBCBB',
    fontSize: 8.5,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  corpoCardBarbeiro: {
    padding: 10,
  },
  nomeBarbeiro: {
    fontSize: 13.5,
    fontWeight: 'bold',
    color: '#ECEFF4',
  },
  especialidadeBarbeiro: {
    fontSize: 10.5,
    color: '#98A2B3',
    marginTop: 2,
    marginBottom: 10,
  },
  indicadorBarbeiro: {
    width: '100%',
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: '#1A1D24',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2E3646',
  },
  indicadorBarbeiroAtivo: {
    backgroundColor: '#8FBCBB',
    borderColor: '#8FBCBB',
  },
  txtIndicadorBarbeiro: {
    color: '#98A2B3',
    fontSize: 9.5,
    fontWeight: 'bold',
    letterSpacing: 0.8,
  },
  txtIndicadorBarbeiroAtivo: {
    color: '#1A1D24',
  },

  // Banner Produtos
  cardVitrineProdutos: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222732',
    borderRadius: 16,
    padding: 16,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#2E3646',
  },
  infoVitrine: {
    flex: 1,
    marginRight: 10,
  },
  tagVitrine: {
    color: '#E5C07B',
    fontSize: 8.5,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  tituloVitrine: {
    color: '#ECEFF4',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 2,
  },
  subtituloVitrine: {
    color: '#98A2B3',
    fontSize: 11,
    marginTop: 2,
  },
  btnAcessarLoja: {
    backgroundColor: '#1A1D24',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5C07B',
  },
  txtBtnAcessarLoja: {
    color: '#E5C07B',
    fontSize: 9.5,
    fontWeight: 'bold',
    letterSpacing: 0.8,
  },

  // Filtros
  containerFiltros: {
    marginBottom: 16,
    paddingRight: 16,
  },
  chipCategoria: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#222732',
    borderWidth: 1,
    borderColor: '#2E3646',
    marginRight: 8,
  },
  chipCategoriaAtivo: {
    backgroundColor: '#8FBCBB',
    borderColor: '#8FBCBB',
  },
  textoChip: {
    fontSize: 12,
    fontWeight: '500',
    color: '#98A2B3',
  },
  textoChipAtivo: {
    color: '#1A1D24',
    fontWeight: 'bold',
  },

  // CARROSSEL HORIZONTAL DE SERVIÇOS
  carrosselServicos: {
    paddingRight: 16,
  },
  cardServicoHorizontal: {
    width: 240,
    backgroundColor: '#222732',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#2E3646',
    marginRight: 14,
    overflow: 'hidden',
  },
  cardServicoHorizontalSelecionado: {
    borderColor: '#8FBCBB',
    backgroundColor: '#28303C',
  },
  containerImagemServicoHorizontal: {
    width: '100%',
    height: 120,
    backgroundColor: '#1A1D24',
    position: 'relative',
  },
  imagemServicoHorizontal: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  pillDuracaoFlutuante: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(26, 29, 36, 0.88)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2E3646',
  },
  txtPillDuracaoFlutuante: {
    color: '#98A2B3',
    fontSize: 10,
    fontWeight: 'bold',
  },
  corpoServicoHorizontal: {
    padding: 12,
  },
  nomeServicoHorizontal: {
    fontSize: 14.5,
    fontWeight: 'bold',
    color: '#ECEFF4',
  },
  nomeServicoHorizontalSelecionado: {
    color: '#8FBCBB',
  },
  subtituloServicoHorizontal: {
    fontSize: 11,
    color: '#98A2B3',
    marginTop: 4,
    lineHeight: 15,
    height: 30,
  },
  rodapeServicoHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#2E3646',
  },
  precoServicoHorizontal: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ECEFF4',
  },
  precoServicoHorizontalSelecionado: {
    color: '#E5C07B',
  },
  btnAcaoServicoHorizontal: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#1A1D24',
    borderWidth: 1,
    borderColor: '#2E3646',
  },
  btnAcaoServicoHorizontalAtivo: {
    backgroundColor: '#8FBCBB',
    borderColor: '#8FBCBB',
  },
  txtBtnAcaoServicoHorizontal: {
    color: '#98A2B3',
    fontSize: 9.5,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  txtBtnAcaoServicoHorizontalAtivo: {
    color: '#1A1D24',
  },

  // Modal
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(26, 29, 36, 0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    height: '75%',
    backgroundColor: '#222732',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#8FBCBB',
  },
  botaoFecharModal: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    backgroundColor: 'rgba(26, 29, 36, 0.85)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  textoFecharModal: {
    color: '#ECEFF4',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  videoPreview: {
    width: '100%',
    height: '70%',
  },
  modalInfoBarbeiro: {
    padding: 16,
    backgroundColor: '#222732',
    alignItems: 'center',
  },
  nomeBarbeiroModal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ECEFF4',
  },
  especialidadeModal: {
    fontSize: 12,
    color: '#98A2B3',
    marginBottom: 12,
  },
  botaoAgendarModal: {
    backgroundColor: '#8FBCBB',
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoAgendarModal: {
    color: '#1A1D24',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 1,
  },

  // Barra Flutuante CTA
  containerCTAFlutuante: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#222732',
    borderTopWidth: 1,
    borderTopColor: '#2E3646',
  },
  resumoCTA: {
    flex: 1,
    marginRight: 10,
  },
  txtResumoTop: {
    color: '#98A2B3',
    fontSize: 8.5,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  txtResumoItens: {
    color: '#ECEFF4',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 1,
  },
  btnCTA: {
    backgroundColor: '#8FBCBB',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBtnCTA: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1A1D24',
    letterSpacing: 0.8,
  },

  // Bottom Navigation
  bottomNav: {
    flexDirection: 'row',
    height: 58,
    backgroundColor: '#1A1D24',
    borderTopWidth: 1,
    borderTopColor: '#2E3646',
    alignItems: 'center',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcone: {
    fontSize: 16,
    opacity: 0.4,
  },
  navIconeAtivo: {
    fontSize: 16,
  },
  navTexto: {
    fontSize: 9.5,
    color: '#98A2B3',
    marginTop: 2,
  },
  navTextoAtivo: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#8FBCBB',
    marginTop: 2,
  },
});