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
import { useRouter } from 'expo-router';

// ----------------------------------------------------------------------
// 0. CATÁLOGO DE PRODUTOS AUTORAIS
// ----------------------------------------------------------------------

const CATEGORIAS_PRODUTOS = ['Todos', 'Cabelo', 'Barba', 'Tratamento'];

const CATAGOLO_PRODUTOS = [
  {
    id: 'p1',
    nome: 'Pomada Matte Modeladora',
    subtitulo: 'Fixação forte e efeito seco natural',
    volume: '100g',
    preco: 'R$ 62,00',
    precoNum: 62,
    categoria: 'Cabelo',
    imagem: { uri: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400' },
  },
  {
    id: 'p2',
    nome: 'Óleo Fortificante para Barba',
    subtitulo: 'Hidratação profunda com aroma amadeirado',
    volume: '30ml',
    preco: 'R$ 54,00',
    precoNum: 54,
    categoria: 'Barba',
    imagem: { uri: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=400' },
  },
  {
    id: 'p3',
    nome: 'Balm Modelador de Barba',
    subtitulo: 'Alinha fios rebeldes e protege a pele',
    volume: '80g',
    preco: 'R$ 48,00',
    precoNum: 48,
    categoria: 'Barba',
    imagem: { uri: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400' },
  },
  {
    id: 'p4',
    nome: 'Shampoo Purificante Scalp Care',
    subtitulo: 'Limpeza profunda e controle de oleosidade',
    volume: '250ml',
    preco: 'R$ 58,00',
    precoNum: 58,
    categoria: 'Tratamento',
    imagem: { uri: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400' },
  },
];

// ----------------------------------------------------------------------
// COMPONENTE PRINCIPAL - TELA DE PRODUTOS
// ----------------------------------------------------------------------
export default function TelaProdutosEscandinava() {
  const router = useRouter();

  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');
  
  // Estado do carrinho: mapa armazenando a quantidade de cada produto { [id]: quantidade }
  const [carrinho, setCarrinho] = useState<{ [key: string]: number }>({});

  const produtosFiltrados = CATAGOLO_PRODUTOS.filter((prod) => {
    if (categoriaSelecionada === 'Todos') return true;
    return prod.categoria === categoriaSelecionada;
  });

  // Funções de controle do carrinho
  const adicionarAoCarrinho = (id: string) => {
    setCarrinho((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const removerDoCarrinho = (id: string) => {
    setCarrinho((prev) => {
      const novaQtd = (prev[id] || 0) - 1;
      const novoEstado = { ...prev };
      if (novaQtd <= 0) {
        delete novoEstado[id];
      } else {
        novoEstado[id] = novaQtd;
      }
      return novoEstado;
    });
  };

  // Cálculos de totais
  const totalItens = Object.values(carrinho).reduce((acc, curr) => acc + curr, 0);
  const valorTotal = Object.keys(carrinho).reduce((acc, id) => {
    const produto = CATAGOLO_PRODUTOS.find((p) => p.id === id);
    const qtd = carrinho[id];
    return acc + (produto ? produto.precoNum * qtd : 0);
  }, 0);

  return (
    <SafeAreaView style={styles.container}>
      {/* ========================================== */}
      {/* 1. CABEÇALHO COM BOTÃO DE VOLTAR           */}
      {/* ========================================== */}
      <View style={styles.topHeader}>
        <Pressable style={styles.btnVoltar} onPress={() => router.back()}>
          <Text style={styles.txtBtnVoltar}>← ATELIER</Text>
        </Pressable>

        <View style={styles.tituloHeaderContainer}>
          <Text style={styles.tagHeader}>COLLEZIONE PRIVATA</Text>
          <Text style={styles.tituloHeader}>Loja de Cuidados</Text>
        </View>

        <View style={styles.badgeQtdCarrinho}>
          <Text style={styles.txtBadgeCarrinho}>🛒 {totalItens}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ========================================== */}
        {/* 2. BANNER EDITORIAL DE PRODUTOS            */}
        {/* ========================================== */}
        <View style={styles.heroBanner}>
          <Text style={styles.heroTag}>LINHA AUTORAL GOLDEN BARBER</Text>
          <Text style={styles.heroTitulo}>Ingredientes Botânicos & Alta Performance</Text>
          <Text style={styles.heroSubtitulo}>
            Formulações exclusivas desenvolvidas para manter seu cuidado diário em casa.
          </Text>
        </View>

        {/* ========================================== */}
        {/* 3. FILTROS DE CATEGORIA                    */}
        {/* ========================================== */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.containerFiltros}
        >
          {CATEGORIAS_PRODUTOS.map((cat) => {
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

        {/* ========================================== */}
        {/* 4. GRADE DE PRODUTOS                       */}
        {/* ========================================== */}
        <View style={styles.gridProdutos}>
          {produtosFiltrados.map((produto) => {
            const qtd = carrinho[produto.id] || 0;
            const isSelected = qtd > 0;

            return (
              <View
                key={produto.id}
                style={[
                  styles.cardProduto,
                  isSelected && styles.cardProdutoSelecionado,
                ]}
              >
                <View style={styles.containerImagemProduto}>
                  <Image source={produto.imagem} style={styles.imagemProduto} />
                  <View style={styles.badgeVolume}>
                    <Text style={styles.txtBadgeVolume}>{produto.volume}</Text>
                  </View>
                </View>

                <View style={styles.corpoCardProduto}>
                  <Text style={styles.nomeProduto} numberOfLines={1}>
                    {produto.nome}
                  </Text>
                  <Text style={styles.subtituloProduto} numberOfLines={2}>
                    {produto.subtitulo}
                  </Text>

                  <Text style={styles.precoProduto}>{produto.preco}</Text>

                  {/* Controles do Carrinho */}
                  <View style={styles.containerControleCarrinho}>
                    {qtd === 0 ? (
                      <Pressable
                        style={styles.btnAdicionar}
                        onPress={() => adicionarAoCarrinho(produto.id)}
                      >
                        <Text style={styles.txtBtnAdicionar}>+ ADICIONAR</Text>
                      </Pressable>
                    ) : (
                      <View style={styles.seletorQuantidade}>
                        <Pressable
                          style={styles.btnQtd}
                          onPress={() => removerDoCarrinho(produto.id)}
                        >
                          <Text style={styles.txtBtnQtd}>-</Text>
                        </Pressable>

                        <Text style={styles.txtQuantidade}>{qtd}</Text>

                        <Pressable
                          style={styles.btnQtd}
                          onPress={() => adicionarAoCarrinho(produto.id)}
                        >
                          <Text style={styles.txtBtnQtd}>+</Text>
                        </Pressable>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* ========================================== */}
      {/* 5. BARRA FLUTUANTE DE RESUMO DO CARRINHO   */}
      {/* ========================================== */}
      {totalItens > 0 && (
        <View style={styles.containerCTAFlutuante}>
          <View style={styles.resumoCTA}>
            <Text style={styles.txtResumoTop}>MEU CARRINHO</Text>
            <Text style={styles.txtResumoItens}>
              {totalItens} {totalItens === 1 ? 'produto selecionado' : 'produtos selecionados'}
            </Text>
          </View>

          <Pressable style={styles.btnCTA}>
            <Text style={styles.txtBtnCTA}>
              FINALIZAR • R$ {valorTotal},00
            </Text>
          </Pressable>
        </View>
      )}

      {/* BOTTOM NAVIGATION */}
      <View style={styles.bottomNav}>
        <Pressable
          style={styles.navItem}
          onPress={() => router.push('/')}
        >
          <Text style={styles.navIcone}>✂️</Text>
          <Text style={styles.navTexto}>Serviços</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <Text style={styles.navIconeAtivo}>🛍️</Text>
          <Text style={styles.navTextoAtivo}>Produtos</Text>
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
// PALETA DE CORES ESCANDINAVA MINIMALISTA
// ----------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1D24', // Carvão Suave
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 28,
  },

  // Cabeçalho
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2E3646',
  },
  btnVoltar: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#222732',
    borderWidth: 1,
    borderColor: '#2E3646',
  },
  txtBtnVoltar: {
    color: '#8FBCBB',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.8,
  },
  tituloHeaderContainer: {
    alignItems: 'center',
  },
  tagHeader: {
    color: '#E5C07B',
    fontSize: 8,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  tituloHeader: {
    color: '#ECEFF4',
    fontSize: 15,
    fontWeight: 'bold',
  },
  badgeQtdCarrinho: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#222732',
    borderWidth: 1,
    borderColor: '#2E3646',
  },
  txtBadgeCarrinho: {
    color: '#ECEFF4',
    fontSize: 11,
    fontWeight: 'bold',
  },

  // Hero Banner
  heroBanner: {
    backgroundColor: '#222732',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#2E3646',
    marginBottom: 20,
    marginTop: 8,
  },
  heroTag: {
    color: '#8FBCBB',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 4,
  },
  heroTitulo: {
    color: '#ECEFF4',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  heroSubtitulo: {
    color: '#98A2B3',
    fontSize: 11.5,
    lineHeight: 16,
  },

  // Filtros
  containerFiltros: {
    marginBottom: 20,
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

  // Grade de Produtos
  gridProdutos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardProduto: {
    width: '48%',
    backgroundColor: '#222732',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#2E3646',
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardProdutoSelecionado: {
    borderColor: '#8FBCBB',
    backgroundColor: '#28303C',
  },
  containerImagemProduto: {
    width: '100%',
    height: 130,
    backgroundColor: '#1A1D24',
    position: 'relative',
  },
  imagemProduto: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  badgeVolume: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(26, 29, 36, 0.88)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: '#2E3646',
  },
  txtBadgeVolume: {
    color: '#98A2B3',
    fontSize: 9,
    fontWeight: 'bold',
  },
  corpoCardProduto: {
    padding: 10,
  },
  nomeProduto: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#ECEFF4',
  },
  subtituloProduto: {
    fontSize: 10.5,
    color: '#98A2B3',
    marginTop: 2,
    height: 30,
    lineHeight: 14,
  },
  precoProduto: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E5C07B',
    marginTop: 6,
    marginBottom: 10,
  },

  // Controles do Carrinho
  containerControleCarrinho: {
    width: '100%',
  },
  btnAdicionar: {
    width: '100%',
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#1A1D24',
    borderWidth: 1,
    borderColor: '#8FBCBB',
    alignItems: 'center',
  },
  txtBtnAdicionar: {
    color: '#8FBCBB',
    fontSize: 9.5,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  seletorQuantidade: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1A1D24',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#8FBCBB',
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  btnQtd: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: '#8FBCBB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBtnQtd: {
    color: '#1A1D24',
    fontSize: 14,
    fontWeight: 'bold',
  },
  txtQuantidade: {
    color: '#ECEFF4',
    fontSize: 12,
    fontWeight: 'bold',
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