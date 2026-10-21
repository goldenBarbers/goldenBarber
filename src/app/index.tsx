import React, { useState } from 'react';
import {
  View,
  Text,
  Image, // Importado para renderizar suas imagens futuramente
  Pressable,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

// 1. DADOS DOS 3 BARBEIROS (Substitua os caminhos das imagens em 'imagem' quando tiver os arquivos)
const BARBEIROS = [
  {
    id: '1',
    nome: 'Guilherme Melos',
    especialidade: 'Fade & Tesoura',
    nota: '★ 5.0',
    imagem: require('../../assets/images/barbers/guilherme.webp'), // IMAGEM 1
  },
  {
    id: '2',
    nome: 'Paulo Rogério',
    especialidade: 'Mestre & Visagismo',
    nota: '★ 4.9',
    imagem: require('../../assets/images/barbers/paulo.webp'),     // IMAGEM 2
  },
  {
    id: '3',
    nome: 'Renan Pereira',
    especialidade: 'Barba & Navalha',
    nota: '★ 4.8',
    imagem: require('../../assets/images/barbers/renan.png'),     // IMAGEM 3
  },
];

// 2. DADOS DOS 3 SERVIÇOS EM DESTAQUE
const SERVICOS = [
  {
    id: '1',
    nome: 'Corte de Cabelo',
    duracao: '30 min',
    preco: 'R$ 45,00',
    // imagem: require('../../assets/images/services/corte-cabelo.jpg'),         // IMAGEM 4
  },
  {
    id: '2',
    nome: 'Barba & Toalha Quente',
    duracao: '25 min',
    preco: 'R$ 35,00',
    // imagem: require('../../assets/images/services/barba-toalha-quente.jpg'),  // IMAGEM 5
  },
  {
    id: '3',
    nome: 'Combo Cabelo + Barba',
    duracao: '50 min',
    preco: 'R$ 70,00',
    // imagem: require('../../assets/images/services/combo-cabelo-barba.jpg'),   // IMAGEM 6
  },
];

export default function TelaInicialProfissional() {
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState('2'); // Paulo Rogério selecionado por padrão
  const [servicoSelecionado, setServicoSelecionado] = useState('1');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* CABEÇALHO DA BARBEARIA */}
        <View style={styles.header}>
          <View>
            <Text style={styles.subtituloHeader}>BEM-VINDO À</Text>
            <Text style={styles.tituloHeader}>GOLDEN BARBER</Text>
          </View>
          <View style={styles.badgeStatus}>
            <View style={styles.pontoVerde} />
            <Text style={styles.textoStatus}>Aberto</Text>
          </View>
        </View>

        {/* SEÇÃO 1: FOTOS DOS BARBEIROS (3 CARDS COM ESPAÇO PARA IMAGEM) */}
        <View style={styles.secao}>
          <View style={styles.headerSecao}>
            <Text style={styles.tituloSecao}>Nossos Barbeiros</Text>
            <Text style={styles.subtituloSecao}>Escolha seu profissional</Text>
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
                  {/* ESPAÇO RESERVADO PARA FOTO DO BARBEIRO */}
                  <View style={styles.containerFotoBarbeiro}>
                    {barbeiro.imagem ? (
                      <Image source={barbeiro.imagem} style={styles.fotoBarbeiro} />
                    ) : (
                      <View style={styles.placeholderFotoBarbeiro}>
                        <Text style={styles.textoPlaceholderFoto}>📷 Foto</Text>
                      </View>
                    )}
                    <View style={styles.badgeNota}>
                      <Text style={styles.textoBadgeNota}>{barbeiro.nota}</Text>
                    </View>
                  </View>

                  <Text style={styles.nomeBarbeiro}>{barbeiro.nome}</Text>
                  <Text style={styles.especialidadeBarbeiro}>
                    {barbeiro.especialidade}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* SEÇÃO 2: SERVIÇOS (3 CARDS COM ESPAÇO PARA IMAGEM) */}
        <View style={styles.secao}>
          <View style={styles.headerSecao}>
            <Text style={styles.tituloSecao}>Serviços em Destaque</Text>
            <Text style={styles.subtituloSecao}>Selecione o atendimento</Text>
          </View>

          {SERVICOS.map((servico) => {
            const isSelected = servicoSelecionado === servico.id;
            return (
              <Pressable
                key={servico.id}
                style={[
                  styles.cardServico,
                  isSelected && styles.cardServicoSelecionado,
                ]}
                onPress={() => setServicoSelecionado(servico.id)}
              >
                {/* ESPAÇO RESERVADO PARA IMAGEM DO SERVIÇO */}
                <View style={styles.containerImagemServico}>
                  {servico.imagem ? (
                    <Image source={servico.imagem} style={styles.imagemServico} />
                  ) : (
                    <View style={styles.placeholderImagemServico}>
                      <Text style={styles.textoPlaceholderFoto}>📷 Imagem</Text>
                    </View>
                  )}
                </View>

                {/* DETALHES DO SERVIÇO */}
                <View style={styles.infoServico}>
                  <Text style={styles.nomeServico}>{servico.nome}</Text>
                  <Text style={styles.duracaoServico}>⏱️ {servico.duracao}</Text>
                  <Text style={styles.precoServico}>{servico.preco}</Text>
                </View>

                {/* BOTÃO/RADIO DE SELEÇÃO */}
                <View style={styles.containerRadio}>
                  <View
                    style={[
                      styles.radioOuter,
                      isSelected && styles.radioOuterSelecionado,
                    ]}
                  >
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* BOTÃO FIXO DE AGENDAMENTO */}
      <View style={styles.containerCTA}>
        <Pressable style={styles.botaoCTA}>
          <Text style={styles.textoBotaoCTA}>Continuar Agendamento</Text>
        </Pressable>
      </View>

      {/* BARRA INFERIOR DE NAVEGAÇÃO */}
      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem}>
          <Text style={styles.navIconeAtivo}>💈</Text>
          <Text style={styles.navTextoAtivo}>Início</Text>
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

// ESTILIZAÇÃO - PALETA BARBER VINTAGE (#121212, #1E1E1E, #C5A059, #F5F5F5, #9E9E9E)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  subtituloHeader: {
    fontSize: 11,
    color: '#C5A059',
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  tituloHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F5F5F5',
  },
  badgeStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  pontoVerde: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2E7D32',
    marginRight: 6,
  },
  textoStatus: {
    fontSize: 12,
    color: '#F5F5F5',
    fontWeight: '500',
  },

  // Estrutura das Seções
  secao: {
    marginBottom: 28,
  },
  headerSecao: {
    marginBottom: 14,
  },
  tituloSecao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F5F5F5',
  },
  subtituloSecao: {
    fontSize: 13,
    color: '#9E9E9E',
    marginTop: 2,
  },

  // Carrossel e Cards dos Barbeiros
  carrosselBarbeiros: {
    paddingRight: 16,
  },
  cardBarbeiro: {
    width: 150,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
    padding: 12,
    marginRight: 14,
  },
  cardBarbeiroSelecionado: {
    borderColor: '#C5A059',
    borderWidth: 1.5,
  },
  containerFotoBarbeiro: {
    width: '100%',
    height: 140, // Proporção ideal para foto vertical de perfil
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#121212',
    marginBottom: 10,
    position: 'relative',
  },
  fotoBarbeiro: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderFotoBarbeiro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
    borderStyle: 'dashed',
    borderRadius: 8,
  },
  textoPlaceholderFoto: {
    color: '#9E9E9E',
    fontSize: 12,
  },
  badgeNota: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(18, 18, 18, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  textoBadgeNota: {
    color: '#C5A059',
    fontSize: 11,
    fontWeight: 'bold',
  },
  nomeBarbeiro: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#F5F5F5',
  },
  especialidadeBarbeiro: {
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 2,
  },

  // Cards dos Serviços
  cardServico: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
    padding: 12,
    marginBottom: 12,
  },
  cardServicoSelecionado: {
    borderColor: '#C5A059',
    borderWidth: 1.5,
  },
  containerImagemServico: {
    width: 80,
    height: 80, // Proporção 1:1 para card de serviço em lista
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#121212',
  },
  imagemServico: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImagemServico: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
    borderStyle: 'dashed',
    borderRadius: 8,
  },
  infoServico: {
    flex: 1,
    marginLeft: 14,
  },
  nomeServico: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F5F5F5',
  },
  duracaoServico: {
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 4,
  },
  precoServico: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#C5A059',
    marginTop: 6,
  },

  // Controles de Seleção Radio
  containerRadio: {
    paddingLeft: 8,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#9E9E9E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelecionado: {
    borderColor: '#C5A059',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#C5A059',
  },

  // Botão Fixo CTA
  containerCTA: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#121212',
  },
  botaoCTA: {
    height: 52,
    backgroundColor: '#C5A059',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBotaoCTA: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#121212',
  },

  // Menu Inferior
  bottomNav: {
    flexDirection: 'row',
    height: 64,
    backgroundColor: '#1E1E1E',
    borderTopWidth: 1,
    borderTopColor: '#333333',
    alignItems: 'center',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcone: {
    fontSize: 18,
    opacity: 0.4,
  },
  navIconeAtivo: {
    fontSize: 18,
  },
  navTexto: {
    fontSize: 11,
    color: '#9E9E9E',
    marginTop: 4,
  },
  navTextoAtivo: {
    fontSize: 11,
    fontWeight: '600',
    color: '#C5A059',
    marginTop: 4,
  },
});
