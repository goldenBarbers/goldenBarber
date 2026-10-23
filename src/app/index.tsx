import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

// 1. LOGO DA BARBEARIA (Sua imagem do símbolo em assets/images/logo.png)
const LOGO_BARBEARIA = require('../../assets/images/logo.png');

// 2. DADOS DOS 3 BARBEIROS
const BARBEIROS = [
  {
    id: '1',
    nome: 'Guilherme Melos',
    especialidade: 'Fade & Tesoura',
    nota: '★ 5.0',
    imagem: require('../../assets/images/barbers/guilherme.webp'),
  },
  {
    id: '2',
    nome: 'Paulo Rogério',
    especialidade: 'Mestre & Visagismo',
    nota: '★ 4.9',
    imagem: require('../../assets/images/barbers/paulo.webp'),
  },
  {
    id: '3',
    nome: 'Renan Pereira',
    especialidade: 'Barba & Navalha',
    nota: '★ 4.8',
    imagem: require('../../assets/images/barbers/renan.png'),
  },
];

// 3. DADOS DOS 3 SERVIÇOS EM DESTAQUE
const SERVICOS = [
  {
    id: '1',
    nome: 'Corte de Cabelo',
    duracao: '30 min',
    preco: 'R$ 45,00',
    imagem: require('../../assets/images/services/corte.jpg'),
  },
  {
    id: '2',
    nome: 'Barba & Toalha Quente',
    duracao: '25 min',
    preco: 'R$ 35,00',
    imagem: require('../../assets/images/services/barba.jpg'),
  },
  {
    id: '3',
    nome: 'Combo Cabelo + Barba',
    duracao: '50 min',
    preco: 'R$ 70,00',
    imagem: require('../../assets/images/services/combo.jpg'),
  },
];

export default function TelaInicialProfissional() {
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState('2');
  const [servicoSelecionado, setServicoSelecionado] = useState('1');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ========================================== */}
        {/* 1. TOPO: LOGO (SÍMBOLO + NOME) + STATUS    */}
        {/* ========================================== */}
        <View style={styles.topHeader}>
          <View style={styles.containerLogo}>
            <View style={styles.logoComTexto}>
              {/* Imagem do Símbolo */}
              <Image
                source={LOGO_BARBEARIA}
                style={styles.logoSimboloImage}
                resizeMode="contain"
              />
              {/* Nome da Empresa ao lado */}
              <View style={styles.textoBrandContainer}>
                <Text style={styles.textoLogoPequeno}>GOLDEN</Text>
                <Text style={styles.textoLogoGrande}>BARBER</Text>
              </View>
            </View>
          </View>

          {/* Badge de Status / Horário */}
          <View style={styles.badgeStatus}>
            <View style={styles.pontoVerde} />
            <Text style={styles.textoStatus}>Aberto agora</Text>
          </View>
        </View>

        {/* ========================================== */}
        {/* 2. BANNER DE BOAS-VINDAS / DESTAQUE         */}
        {/* ========================================== */}
        <View style={styles.heroBanner}>
          <View style={styles.heroConteudo}>
            <Text style={styles.heroTag}>EXPERIÊNCIA PREMIUM</Text>
            <Text style={styles.heroTitulo}>Agende seu visual impecável</Text>
            <Text style={styles.heroSubtitulo}>
              Escolha seu especialista e horário preferido em poucos segundos.
            </Text>
          </View>
        </View>

        {/* ========================================== */}
        {/* 3. SEÇÃO: BARBEIROS (CARROSSEL HORIZONTAL) */}
        {/* ========================================== */}
        <View style={styles.secao}>
          <View style={styles.headerSecao}>
            <Text style={styles.tituloSecao}>Selecione o Profissional</Text>
            <Text style={styles.subtituloSecao}>Equipe especializada</Text>
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
                    <Image
                      source={barbeiro.imagem}
                      style={styles.fotoBarbeiro}
                    />
                    <View style={styles.badgeNota}>
                      <Text style={styles.textoBadgeNota}>{barbeiro.nota}</Text>
                    </View>
                  </View>

                  <Text style={styles.nomeBarbeiro} numberOfLines={1}>
                    {barbeiro.nome}
                  </Text>
                  <Text style={styles.especialidadeBarbeiro} numberOfLines={1}>
                    {barbeiro.especialidade}
                  </Text>

                  <View
                    style={[
                      styles.botaoSelecionarBarbeiro,
                      isSelected && styles.botaoSelecionarBarbeiroAtivo,
                    ]}
                  >
                    <Text
                      style={[
                        styles.textoBotaoBarbeiro,
                        isSelected && styles.textoBotaoBarbeiroAtivo,
                      ]}
                    >
                      {isSelected ? 'Selecionado' : 'Escolher'}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* ========================================== */}
        {/* 4. SEÇÃO: SERVIÇOS (LISTA VERTICAL)        */}
        {/* ========================================== */}
        <View style={styles.secao}>
          <View style={styles.headerSecao}>
            <Text style={styles.tituloSecao}>Serviços Recomendados</Text>
            <Text style={styles.subtituloSecao}>Cuidado completo para homens</Text>
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
                <View
                  style={[
                    styles.containerImagemServico,
                    isSelected && styles.imagemServicoSelecionada,
                  ]}
                >
                  <Image source={servico.imagem} style={styles.imagemServico} />
                </View>

                <View style={styles.infoServico}>
                  <Text style={styles.nomeServico}>{servico.nome}</Text>
                  <View style={styles.tagDuracao}>
                    <Text style={styles.duracaoServico}>⏱️ {servico.duracao}</Text>
                  </View>
                  <Text style={styles.precoServico}>{servico.preco}</Text>
                </View>

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

      {/* ========================================== */}
      {/* 5. BOTÃO FIXO CTA + BOTTOM NAVIGATION       */}
      {/* ========================================== */}
      <View style={styles.containerCTA}>
        <Pressable style={styles.botaoCTA}>
          <Text style={styles.textoBotaoCTA}>Avançar para Horários</Text>
        </Pressable>
      </View>

      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem}>
          <Text style={styles.navIconeAtivo}>💈</Text>
          <Text style={styles.navTextoAtivo}>Início</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <Text style={styles.navIcone}>📅</Text>
          <Text style={styles.navTexto}>Agendamentos</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <Text style={styles.navIcone}>👤</Text>
          <Text style={styles.navTexto}>Minha Conta</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// ----------------------------------------------------------------------
// ESTILOS COM PALETA BARBER VINTAGE
// ----------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
  },

  // 1. Topo Header & Logo
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 6,
  },
  containerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoComTexto: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoSimboloImage: {
    width: 42,
    height: 42,
    marginRight: 10,
  },
  textoBrandContainer: {
    justifyContent: 'center',
  },
  textoLogoPequeno: {
    color: '#C5A059',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2.5,
    marginBottom: -2,
  },
  textoLogoGrande: {
    color: '#F5F5F5',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 1.5,
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
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#2E7D32',
    marginRight: 6,
  },
  textoStatus: {
    fontSize: 11,
    color: '#F5F5F5',
    fontWeight: '500',
  },

  // 2. Hero Banner
  heroBanner: {
    backgroundColor: '#1E1E1E',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#2A2A2E',
    borderLeftWidth: 4,
    borderLeftColor: '#C5A059',
    marginBottom: 24,
  },
  heroConteudo: {
    justifyContent: 'center',
  },
  heroTag: {
    color: '#C5A059',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  heroTitulo: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  heroSubtitulo: {
    color: '#9E9E9E',
    fontSize: 12,
    lineHeight: 16,
  },

  // 3. Seções Gerais
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
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 2,
  },

  // Carrossel Barbeiros
  carrosselBarbeiros: {
    paddingRight: 16,
  },
  cardBarbeiro: {
    width: 145,
    backgroundColor: '#1E1E1E',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#333333',
    padding: 10,
    marginRight: 12,
    alignItems: 'center',
  },
  cardBarbeiroSelecionado: {
    borderColor: '#C5A059',
    backgroundColor: '#242428',
  },
  containerFotoBarbeiro: {
    width: '100%',
    height: 130,
    borderRadius: 10,
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
  badgeNota: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(18, 18, 18, 0.85)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  textoBadgeNota: {
    color: '#C5A059',
    fontSize: 10,
    fontWeight: 'bold',
  },
  nomeBarbeiro: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F5F5F5',
    textAlign: 'center',
  },
  especialidadeBarbeiro: {
    fontSize: 11,
    color: '#9E9E9E',
    marginTop: 2,
    marginBottom: 10,
    textAlign: 'center',
  },
  botaoSelecionarBarbeiro: {
    width: '100%',
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#121212',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  botaoSelecionarBarbeiroAtivo: {
    backgroundColor: '#C5A059',
    borderColor: '#C5A059',
  },
  textoBotaoBarbeiro: {
    color: '#9E9E9E',
    fontSize: 11,
    fontWeight: '600',
  },
  textoBotaoBarbeiroAtivo: {
    color: '#121212',
    fontWeight: 'bold',
  },

  // 4. Cards de Serviços
  cardServico: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#333333',
    padding: 12,
    marginBottom: 12,
  },
  cardServicoSelecionado: {
    borderColor: '#C5A059',
    backgroundColor: '#242428',
  },
  containerImagemServico: {
    width: 84,
    height: 84,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#121212',
  },
  imagemServicoSelecionada: {
    borderWidth: 1,
    borderColor: '#C5A059',
  },
  imagemServico: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoServico: {
    flex: 1,
    marginLeft: 14,
  },
  nomeServico: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#F5F5F5',
  },
  tagDuracao: {
    marginTop: 4,
  },
  duracaoServico: {
    fontSize: 11,
    color: '#9E9E9E',
  },
  precoServico: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C5A059',
    marginTop: 6,
  },

  // Radio Buttons
  containerRadio: {
    paddingLeft: 8,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#555555',
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

  // 5. Botão Fixo CTA & Bottom Nav
  containerCTA: {
    paddingHorizontal: 16,
    paddingVertical: 10,
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
  bottomNav: {
    flexDirection: 'row',
    height: 60,
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
    fontSize: 10,
    color: '#9E9E9E',
    marginTop: 3,
  },
  navTextoAtivo: {
    fontSize: 10,
    fontWeight: '600',
    color: '#C5A059',
    marginTop: 3,
  },
});