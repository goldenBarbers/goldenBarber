import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Linking,
  useWindowDimensions,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import Header from '../components/Header';
import Footer from '../components/Footer';

// =====================================================
// GOLDEN BARBER - LOJA DE PRODUTOS AUTORAIS
// Ficheiro: src/app/produtos.tsx
// =====================================================

const CORES = {
  fundo: '#0f1314',
  marrom: '#2c251d',
  dourado: '#bb975a',
  texto: '#F4F0E8',
  cinza: '#A59A8B',
  card: '#151817',
  cardBorda: '#292e2b',
};

const CATEGORIAS_PRODUTOS = ['Todos', 'Cabelo', 'Barba', 'Tratamento'];

const CATALOGO_PRODUTOS = [
  {
    id: 'p1',
    nome: 'Pomada Matte Modeladora',
    subtitulo: 'Fixação forte e efeito seco natural para o dia a dia',
    volume: '100g',
    preco: 'R$ 62,00',
    precoNum: 62,
    categoria: 'Cabelo',
    imagem: require('../../assets/images/products/pomada.jpg'),
  },
  {
    id: 'p2',
    nome: 'Óleo Fortificante para Barba',
    subtitulo: 'Hidratação profunda com fragrância amadeirada nobre',
    volume: '30ml',
    preco: 'R$ 54,00',
    precoNum: 54,
    categoria: 'Barba',
    imagem: require('../../assets/images/products/oleo.jpg'),
  },
  {
    id: 'p3',
    nome: 'Balm Modelador de Barba',
    subtitulo: 'Alinha os fios rebeldes e protege a pele contra irritações',
    volume: '80g',
    preco: 'R$ 48,00',
    precoNum: 48,
    categoria: 'Barba',
    imagem: require('../../assets/images/products/balm.jpg'),
  },
  {
    id: 'p4',
    nome: 'Shampoo Purificante Scalp Care',
    subtitulo: 'Limpeza profunda do couro cabeludo e controle de oleosidade',
    volume: '250ml',
    preco: 'R$ 58,00',
    precoNum: 58,
    categoria: 'Tratamento',
    imagem: require('../../assets/images/products/shampoo.jpg'),
  },
];

export default function Produtos() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [telaGrande, setTelaGrande] = useState(false);

  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');
  const [carrinho, setCarrinho] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    setTelaGrande(width >= 768);
  }, [width]);

  const whatsapp = '5511999999999';

  const abrirWhatsApp = () => {
    Linking.openURL(`https://wa.me/${whatsapp}`);
  };

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

  // Totais
  const totalItens = Object.values(carrinho).reduce((acc, curr) => acc + curr, 0);
  const valorTotal = Object.keys(carrinho).reduce((acc, id) => {
    const produto = CATALOGO_PRODUTOS.find((p) => p.id === id);
    const qtd = carrinho[id];
    return acc + (produto ? produto.precoNum * qtd : 0);
  }, 0);

  const produtosFiltrados = CATALOGO_PRODUTOS.filter((prod) => {
    if (categoriaSelecionada === 'Todos') return true;
    return prod.categoria === categoriaSelecionada;
  });

  return (
    <SafeAreaView style={styles.tela}>
      <StatusBar barStyle="light-content" />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* CABEÇALHO REUTILIZÁVEL */}
        <Header />

        {/* HERO / CABEÇALHO DA LOJA */}
        <View style={styles.heroSecao}>
          <View style={styles.heroConteudo}>
            <Text style={styles.subtituloDourado}>COLLEZIONE PRIVATA</Text>
            <Text style={styles.tituloHero}>Loja Autoral Golden Barber</Text>
            <Text style={styles.descricaoHero}>
              Ingredientes botânicos & alta performance. Formulações exclusivas
              desenvolvidas para manter seu cuidado diário impecável em casa.
            </Text>
          </View>
        </View>

        {/* FILTRO DE CATEGORIAS */}
        <View style={styles.secaoFiltros}>
          <View style={styles.containerFiltros}>
            {CATEGORIAS_PRODUTOS.map((cat) => {
              const isSelected = categoriaSelecionada === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.botaoFiltro,
                    isSelected && styles.botaoFiltroAtivo,
                  ]}
                  onPress={() => setCategoriaSelecionada(cat)}
                >
                  <Text
                    style={[
                      styles.textoFiltro,
                      isSelected && styles.textoFiltroAtivo,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* GRADE DE PRODUTOS */}
        <View style={styles.secaoProdutos}>
          <View style={styles.produtosInner}>
            <View
              style={[
                styles.gridProdutos,
                telaGrande ? styles.gridGrande : styles.gridMobile,
              ]}
            >
              {produtosFiltrados.map((produto) => {
                const qtd = carrinho[produto.id] || 0;
                const isSelected = qtd > 0;

                return (
                  <View
                    key={produto.id}
                    style={[
                      styles.cardProduto,
                      telaGrande ? styles.cardGrande : styles.cardMobile,
                      isSelected && styles.cardProdutoSelecionado,
                    ]}
                  >
                    <View style={styles.imagemWrapper}>
                      <Image
                        source={produto.imagem}
                        style={styles.imagemProduto}
                      />
                      <View style={styles.badgeVolume}>
                        <Text style={styles.txtBadgeVolume}>{produto.volume}</Text>
                      </View>
                    </View>

                    <View style={styles.conteudoCard}>
                      <Text style={styles.nomeProduto}>{produto.nome}</Text>
                      <Text style={styles.subtituloProduto} numberOfLines={2}>
                        {produto.subtitulo}
                      </Text>

                      <Text style={styles.precoProduto}>{produto.preco}</Text>

                      {/* Controles do Carrinho */}
                      <View style={styles.containerControleCarrinho}>
                        {qtd === 0 ? (
                          <TouchableOpacity
                            style={styles.btnAdicionar}
                            onPress={() => adicionarAoCarrinho(produto.id)}
                            activeOpacity={0.8}
                          >
                            <Text style={styles.txtBtnAdicionar}>
                              + ADICIONAR
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <View style={styles.seletorQuantidade}>
                            <TouchableOpacity
                              style={styles.btnQtd}
                              onPress={() => removerDoCarrinho(produto.id)}
                            >
                              <Text style={styles.txtBtnQtd}>-</Text>
                            </TouchableOpacity>

                            <Text style={styles.txtQuantidade}>{qtd}</Text>

                            <TouchableOpacity
                              style={styles.btnQtd}
                              onPress={() => adicionarAoCarrinho(produto.id)}
                            >
                              <Text style={styles.txtBtnQtd}>+</Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        {/* RODAPÉ REUTILIZÁVEL */}
        <Footer />
      </ScrollView>

      {/* BARRA FLUTUANTE DE RESUMO DO CARRINHO */}
      {totalItens > 0 && (
        <View style={styles.containerCTAFlutuante}>
          <View style={styles.resumoCTA}>
            <Text style={styles.txtResumoTop}>MEU CARRINHO</Text>
            <Text style={styles.txtResumoItens}>
              {totalItens} {totalItens === 1 ? 'produto selecionado' : 'produtos selecionados'}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.btnCTA}
            onPress={abrirWhatsApp}
            activeOpacity={0.85}
          >
            <Text style={styles.txtBtnCTA}>
              FINALIZAR • R$ {valorTotal},00
            </Text>
          </TouchableOpacity>
        </View>
      )}
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

  // FILTROS
  secaoFiltros: {
    width: '100%',
    backgroundColor: CORES.fundo,
    paddingVertical: 24,
    alignItems: 'center',
  },
  containerFiltros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 20,
  },
  botaoFiltro: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: CORES.card,
    borderWidth: 1,
    borderColor: '#2d3330',
  },
  botaoFiltroAtivo: {
    backgroundColor: CORES.dourado,
    borderColor: CORES.dourado,
  },
  textoFiltro: {
    color: CORES.cinza,
    fontSize: 13,
    fontWeight: '500',
  },
  textoFiltroAtivo: {
    color: '#171510',
    fontWeight: 'bold',
  },

  // SEÇÃO PRODUTOS
  secaoProdutos: {
    width: '100%',
    backgroundColor: CORES.fundo,
    paddingBottom: 60,
    alignItems: 'center',
  },
  produtosInner: {
    width: '100%',
    maxWidth: 1200,
    paddingHorizontal: 20,
  },
  gridProdutos: {
    width: '100%',
    gap: 20,
  },
  gridMobile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  gridGrande: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  cardProduto: {
    backgroundColor: CORES.card,
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#242a27',
  },
  cardMobile: {
    width: '100%',
    maxWidth: 360,
  },
  cardGrande: {
    width: '23.5%',
    minWidth: 260,
  },
  cardProdutoSelecionado: {
    borderColor: CORES.dourado,
  },
  imagemWrapper: {
    position: 'relative',
    width: '100%',
    height: 180,
    backgroundColor: '#1c1f1e',
  },
  imagemProduto: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  badgeVolume: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(15, 19, 20, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: CORES.dourado,
  },
  txtBadgeVolume: {
    color: CORES.dourado,
    fontSize: 10,
    fontWeight: 'bold',
  },
  conteudoCard: {
    padding: 16,
  },
  nomeProduto: {
    fontSize: 17,
    fontFamily: 'serif',
    fontWeight: 'bold',
    color: CORES.texto,
    marginBottom: 4,
  },
  subtituloProduto: {
    fontSize: 12,
    color: CORES.cinza,
    lineHeight: 17,
    marginBottom: 12,
    height: 34,
  },
  precoProduto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: CORES.dourado,
    marginBottom: 14,
  },

  // CONTROLES DO CARRINHO
  containerControleCarrinho: {
    width: '100%',
  },
  btnAdicionar: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 4,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: CORES.dourado,
    alignItems: 'center',
  },
  txtBtnAdicionar: {
    color: CORES.dourado,
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.8,
  },
  seletorQuantidade: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1c201e',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: CORES.dourado,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  btnQtd: {
    width: 28,
    height: 28,
    borderRadius: 4,
    backgroundColor: CORES.dourado,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBtnQtd: {
    color: '#171510',
    fontSize: 16,
    fontWeight: 'bold',
  },
  txtQuantidade: {
    color: CORES.texto,
    fontSize: 14,
    fontWeight: 'bold',
  },

  // BARRA FLUTUANTE CTA
  containerCTAFlutuante: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    backgroundColor: CORES.marrom,
    borderTopWidth: 1,
    borderTopColor: CORES.dourado,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 5,
  },
  resumoCTA: {
    flex: 1,
    marginRight: 10,
  },
  txtResumoTop: {
    color: CORES.dourado,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  txtResumoItens: {
    color: CORES.texto,
    fontSize: 13,
    fontWeight: '500',
    marginTop: 2,
  },
  btnCTA: {
    backgroundColor: CORES.dourado,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBtnCTA: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#171510',
    letterSpacing: 0.8,
  },
});