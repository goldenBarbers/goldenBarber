import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import Header from '../components/Header';
import Footer from '../components/Footer';

// =====================================================
// GOLDEN BARBER - GALERIA DE TRABALHOS & EQUIPE
// Ficheiro: src/app/trabalhos.tsx
// =====================================================

const CORES = {
  fundo: '#0f1314',
  marrom: '#2c251d',
  dourado: '#bb975a',
  texto: '#F4F0E8',
  cinza: '#A59A8B',
  card: '#151817',
  cardHover: '#1f2422',
};

interface BarberItem {
  id: string;
  nome: string;
  cargo: string;
  imagem: any;
}

const BARBEIROS: BarberItem[] = [
  {
    id: '1',
    nome: 'Guilherme',
    cargo: 'Master Barber & Stylist',
    imagem: require('../../assets/images/barbers/guilherme.webp'),
  },
  {
    id: '2',
    nome: 'Paulo',
    cargo: 'Especialista em Barba & Visagismo',
    imagem: require('../../assets/images/barbers/paulo.webp'),
  },
  {
    id: '3',
    nome: 'Renan',
    cargo: 'Especialista em Fade & Clássicos',
    imagem: require('../../assets/images/barbers/renan.png'),
  },
];

interface TrabalhoItem {
  id: string;
  titulo: string;
  categoria: string;
  descricao: string;
  imagem: any;
}

const LISTA_TRABALHOS: TrabalhoItem[] = [
  {
    id: '1',
    titulo: 'Fade Americano',
    categoria: 'Cabelo',
    descricao: 'Degradê suave e bem alinhado com finalização em pomada fosca.',
    imagem: require('../../assets/images/services/fade.jpg'),
  },
  {
    id: '2',
    titulo: 'Barba Lenhador Tradicional',
    categoria: 'Barba',
    descricao: 'Modelagem com toalha quente, alinhamento navalhado e óleo hidratante.',
    imagem: require('../../assets/images/services/lenhador.jpg'),
  },
  {
    id: '3',
    titulo: 'Corte Social Clássico',
    categoria: 'Cabelo',
    descricao: 'Estilo executivo atemporal para homens que buscam sobriedade e elegância.',
    imagem: require('../../assets/images/services/social.jpg'),
  },
  {
    id: '4',
    titulo: 'Degradê Navalhado & Beard Combo',
    categoria: 'Combo',
    descricao: 'Harmonização completa de cabelo e barba com acabamento na navalha.',
    imagem: require('../../assets/images/services/navalhado.jpg'),
  },
  {
    id: '5',
    titulo: 'Barboterapia Premium',
    categoria: 'Barba',
    descricao: 'Tratamento relaxante de esfoliação, vapor de ozônio e óleos essenciais.',
    imagem: require('../../assets/images/services/barboterapia.jpg'),
  },
  {
    id: '6',
    titulo: 'Styling & Pigmentação',
    categoria: 'Especial',
    descricao: 'Preenchimento discreto de falhas e definição perfeita dos contornos.',
    imagem: require('../../assets/images/services/pigmentação.jpg'),
  },
];

const CATEGORIAS = ['Todos', 'Cabelo', 'Barba', 'Combo', 'Especial'];

export default function Trabalhos() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [telaGrande, setTelaGrande] = useState(false);
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');

  useEffect(() => {
    setTelaGrande(width >= 768);
  }, [width]);

  const trabalhosFiltrados =
    categoriaAtiva === 'Todos'
      ? LISTA_TRABALHOS
      : LISTA_TRABALHOS.filter((item) => item.categoria === categoriaAtiva);

  return (
    <SafeAreaView style={styles.tela}>
      <StatusBar barStyle="light-content" />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* CABEÇALHO REUTILIZÁVEL */}
        <Header />

        {/* HERO DA PÁGINA */}
        <View style={styles.heroSecao}>
          <View style={styles.heroConteudo}>
            <Text style={styles.subtituloDourado}>EXCELÊNCIA & TRADIÇÃO</Text>
            <Text style={styles.tituloHero}>Nossa Equipe & Trabalhos</Text>
            <Text style={styles.descricaoHero}>
              Conheça os especialistas por trás do padrão Golden Barber e inspire-se com as transformações realizadas em nossa barbearia.
            </Text>
          </View>
        </View>

        {/* SEÇÃO NOSSOS BARBEIROS */}
        <View style={styles.secaoBarbeiros}>
          <View style={styles.barbeirosInner}>
            <Text style={styles.tituloSecao}>Nossos Barbeiros</Text>
            <Text style={styles.subtituloSecao}>
              Profissionais qualificados para entregar o corte e o cuidado impecáveis que você merece.
            </Text>

            <View
              style={[
                styles.gridBarbeiros,
                telaGrande ? styles.gridBarbeirosGrande : styles.gridBarbeirosMobile,
              ]}
            >
              {BARBEIROS.map((barbeiro) => (
                <View
                  key={barbeiro.id}
                  style={[
                    styles.cardBarbeiro,
                    telaGrande ? styles.cardBarbeiroGrande : styles.cardBarbeiroMobile,
                  ]}
                >
                  <View style={styles.imagemBarbeiroContainer}>
                    <Image
                      source={barbeiro.imagem}
                      style={styles.imagemBarbeiro}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.infoBarbeiro}>
                    <Text style={styles.nomeBarbeiro}>{barbeiro.nome}</Text>
                    <Text style={styles.cargoBarbeiro}>{barbeiro.cargo}</Text>
                    <TouchableOpacity
                      style={styles.botaoAgendarBarbeiro}
                      onPress={() => router.push('/agenda')}
                    >
                      <Text style={styles.textoBotaoAgendarBarbeiro}>
                        Agendar com {barbeiro.nome}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* FILTRO DE CATEGORIAS DA GALERIA */}
        <View style={styles.secaoFiltros}>
          <View style={styles.containerFiltros}>
            <Text style={styles.tituloGaleria}>Galeria de Cortes e Barbas</Text>
            <View style={styles.listaFiltros}>
              {CATEGORIAS.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.botaoFiltro,
                    categoriaAtiva === cat && styles.botaoFiltroAtivo,
                  ]}
                  onPress={() => setCategoriaAtiva(cat)}
                >
                  <Text
                    style={[
                      styles.textoFiltro,
                      categoriaAtiva === cat && styles.textoFiltroAtivo,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* GALERIA DE TRABALHOS */}
        <View style={styles.secaoGaleria}>
          <View style={styles.galeriaInner}>
            <View
              style={[
                styles.gridGaleria,
                telaGrande ? styles.gridGrande : styles.gridMobile,
              ]}
            >
              {trabalhosFiltrados.map((item) => (
                <View
                  key={item.id}
                  style={[
                    styles.cardTrabalho,
                    telaGrande ? styles.cardGrande : styles.cardMobile,
                  ]}
                >
                  <View style={styles.imagemWrapper}>
                    <Image
                      source={item.imagem}
                      style={styles.imagemCard}
                      resizeMode="cover"
                    />
                    <View style={styles.badgeCategoria}>
                      <Text style={styles.textoBadge}>{item.categoria}</Text>
                    </View>
                  </View>

                  <View style={styles.conteudoCard}>
                    <Text style={styles.tituloCard}>{item.titulo}</Text>
                    <Text style={styles.descricaoCard}>{item.descricao}</Text>

                    <TouchableOpacity
                      style={styles.botaoAgendarCard}
                      onPress={() => router.push('/agenda')}
                    >
                      <Text style={styles.textoBotaoAgendar}>
                        Quero esse estilo →
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* RODAPÉ REUTILIZÁVEL */}
        <Footer />
      </ScrollView>
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

  // HERO
  heroSecao: {
    width: '100%',
    backgroundColor: CORES.fundo,
    paddingVertical: 45,
    paddingHorizontal: 24,
    alignItems: 'center',
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
    fontSize: 36,
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

  // BARBEIROS
  secaoBarbeiros: {
    width: '100%',
    backgroundColor: CORES.marrom,
    paddingVertical: 50,
    alignItems: 'center',
  },
  barbeirosInner: {
    width: '100%',
    maxWidth: 1200,
    paddingHorizontal: 24,
  },
  tituloSecao: {
    color: CORES.texto,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'serif',
    marginBottom: 8,
  },
  subtituloSecao: {
    color: CORES.cinza,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 36,
  },
  gridBarbeiros: {
    width: '100%',
    gap: 24,
  },
  gridBarbeirosMobile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  gridBarbeirosGrande: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  cardBarbeiro: {
    backgroundColor: CORES.card,
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2d3330',
  },
  cardBarbeiroMobile: {
    width: '100%',
    maxWidth: 260,
  },
  cardBarbeiroGrande: {
    flex: 1,
    maxWidth: 280,
  },
  imagemBarbeiroContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#1c1f1e',
  },
  imagemBarbeiro: {
    width: '100%',
    height: '100%',
  },
  infoBarbeiro: {
    padding: 14,
    alignItems: 'center',
  },
  nomeBarbeiro: {
    color: CORES.dourado,
    fontSize: 18,
    fontFamily: 'serif',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cargoBarbeiro: {
    color: CORES.cinza,
    fontSize: 13,
    marginBottom: 16,
    textAlign: 'center',
  },
  botaoAgendarBarbeiro: {
    borderWidth: 1,
    borderColor: CORES.dourado,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 4,
  },
  textoBotaoAgendarBarbeiro: {
    color: CORES.texto,
    fontSize: 12,
    fontWeight: '600',
  },

  // FILTROS
  secaoFiltros: {
    width: '100%',
    backgroundColor: CORES.fundo,
    paddingTop: 45,
    paddingBottom: 20,
    alignItems: 'center',
  },
  containerFiltros: {
    width: '100%',
    maxWidth: 1200,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  tituloGaleria: {
    color: CORES.texto,
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'serif',
    marginBottom: 20,
    textAlign: 'center',
  },
  listaFiltros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
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

  // GALERIA
  secaoGaleria: {
    width: '100%',
    backgroundColor: CORES.fundo,
    paddingBottom: 60,
    alignItems: 'center',
  },
  galeriaInner: {
    width: '100%',
    maxWidth: 1200,
    paddingHorizontal: 20,
  },
  gridGaleria: {
    width: '100%',
    gap: 24,
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
  cardTrabalho: {
    backgroundColor: CORES.card,
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#242a27',
  },
  cardMobile: {
    width: '100%',
    maxWidth: 380,
  },
  cardGrande: {
    width: '31%',
    minWidth: 300,
  },
  imagemWrapper: {
    position: 'relative',
    width: '100%',
    height: 220,
  },
  imagemCard: {
    width: '100%',
    height: '100%',
  },
  badgeCategoria: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(15, 19, 20, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: CORES.dourado,
  },
  textoBadge: {
    color: CORES.dourado,
    fontSize: 11,
    fontWeight: 'bold',
  },
  conteudoCard: {
    padding: 20,
  },
  tituloCard: {
    color: CORES.texto,
    fontSize: 18,
    fontFamily: 'serif',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descricaoCard: {
    color: CORES.cinza,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 16,
  },
  botaoAgendarCard: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
  },
  textoBotaoAgendar: {
    color: CORES.dourado,
    fontSize: 13,
    fontWeight: '600',
  },
});