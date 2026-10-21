import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

// Dados simulados de serviços
const SERVICOS = [
  { id: '1', nome: 'Corte de Cabelo', duracao: '30 min', preco: 'R$ 45,00', icone: '✂️' },
  { id: '2', nome: 'Barba Completa', duracao: '20 min', preco: 'R$ 35,00', icone: '🪒' },
  { id: '3', nome: 'Combo Cabelo + Barba', duracao: '50 min', preco: 'R$ 70,00', icone: '💈' },
];

// Dados simulados de barbeiros
const BARBEIROS = [
  { id: '1', nome: 'Qualquer um', nota: '★ 5.0', icone: '👥' },
  { id: '2', nome: 'Carlos', nota: '★ 4.9', icone: '👨‍🦱' },
  { id: '3', nome: 'Rafael', nota: '★ 4.8', icone: '🧔' },
];

export default function TelaInicial() {
  // Estados para controlar a seleção do usuário
  const [servicoSelecionado, setServicoSelecionado] = useState('1');
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState('1');

  return (
    <SafeAreaView style={styles.container}>
      {/* CONTEÚDO ROLÁVEL */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. CABEÇALHO */}
        <View style={styles.header}>
          <View>
            <Text style={styles.saudacao}>Olá, Lucas 👋</Text>
            <Text style={styles.subtitulo}>Qual o estilo de hoje?</Text>
          </View>
          <View style={styles.headerAcoes}>
            <View style={styles.iconeNotificacaoContainer}>
              <Text style={styles.textoIcone}>🔔</Text>
              <View style={styles.pontoNotificacao} />
            </View>
            <View style={styles.avatarContainer}>
              <Text style={styles.textoAvatar}>L</Text>
            </View>
          </View>
        </View>

        {/* 2. SEÇÃO DE SERVIÇOS */}
        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>Serviços</Text>
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
                <View style={styles.iconeServicoBox}>
                  <Text style={styles.iconeServicoText}>{servico.icone}</Text>
                </View>
                <View style={styles.infoServico}>
                  <Text style={styles.nomeServico}>{servico.nome}</Text>
                  <Text style={styles.duracaoServico}>{servico.duracao}</Text>
                </View>
                <View style={styles.precoECheckbox}>
                  <Text style={styles.precoServico}>{servico.preco}</Text>
                  <View
                    style={[
                      styles.checkbox,
                      isSelected && styles.checkboxSelecionado,
                    ]}
                  >
                    {isSelected && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* 3. SEÇÃO DE BARBEIROS (CARROSSEL HORIZONTAL) */}
        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>Profissional</Text>
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
                  <View style={styles.avatarBarbeiro}>
                    <Text style={styles.iconeBarbeiroText}>{barbeiro.icone}</Text>
                  </View>
                  <Text style={styles.nomeBarbeiro} numberOfLines={1}>
                    {barbeiro.nome}
                  </Text>
                  <Text style={styles.notaBarbeiro}>{barbeiro.nota}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>

      {/* 4. BOTÃO DE AÇÃO PRINCIPAL (CTA FIXO) */}
      <View style={styles.containerCTA}>
        <Pressable style={styles.botaoCTA}>
          <Text style={styles.textoBotaoCTA}>Avançar para Horários</Text>
        </Pressable>
      </View>

      {/* 5. BARRA DE NAVEGAÇÃO INFERIOR */}
      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem}>
          <Text style={styles.navIconeAtivo}>🏠</Text>
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

// ESTILOS COM PALETA VINTAGE (#121212, #1E1E1E, #C5A059, #F5F5F5, #9E9E9E)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  saudacao: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F5F5F5',
  },
  subtitulo: {
    fontSize: 14,
    color: '#9E9E9E',
    marginTop: 2,
  },
  headerAcoes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconeNotificacaoContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textoIcone: {
    fontSize: 18,
  },
  pontoNotificacao: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#C5A059',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    borderWidth: 1.5,
    borderColor: '#C5A059',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoAvatar: {
    color: '#F5F5F5',
    fontWeight: 'bold',
  },

  // Seções Gerais
  secao: {
    marginBottom: 24,
  },
  tituloSecao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F5F5F5',
    marginBottom: 12,
  },

  // Cards de Serviço
  cardServico: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
    padding: 16,
    marginBottom: 12,
  },
  cardServicoSelecionado: {
    borderColor: '#C5A059',
    borderWidth: 1.5,
  },
  iconeServicoBox: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconeServicoText: {
    fontSize: 20,
  },
  infoServico: {
    flex: 1,
    marginLeft: 12,
  },
  nomeServico: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F5F5F5',
  },
  duracaoServico: {
    fontSize: 13,
    color: '#9E9E9E',
    marginTop: 2,
  },
  precoECheckbox: {
    alignItems: 'flex-end',
  },
  precoServico: {
    fontSize: 15,
    fontWeight: '600',
    color: '#C5A059',
    marginBottom: 6,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#9E9E9E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelecionado: {
    backgroundColor: '#C5A059',
    borderColor: '#C5A059',
  },
  checkmark: {
    color: '#121212',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // Carrossel de Barbeiros
  carrosselBarbeiros: {
    paddingRight: 16,
  },
  cardBarbeiro: {
    width: 110,
    height: 132,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
    padding: 12,
    alignItems: 'center',
    marginRight: 12,
  },
  cardBarbeiroSelecionado: {
    borderColor: '#C5A059',
    borderWidth: 2,
  },
  avatarBarbeiro: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  iconeBarbeiroText: {
    fontSize: 22,
  },
  nomeBarbeiro: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F5F5F5',
    marginTop: 8,
  },
  notaBarbeiro: {
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 4,
  },

  // Botão CTA Fixo
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

  // Navigation Bar Inferior
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
    opacity: 0.5,
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
