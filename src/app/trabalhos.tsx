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
    imagem: require('../../assets/images/trabalhos.png'),
  },
  {
    id: '2',
    titulo: 'Barba Lenhador Tradicional',
    categoria: 'Barba',
    descricao: 'Modelagem com toalha quente, alinhamento navalhado e óleo hidratante.',
    imagem: require('../../assets/images/barbeiro-e-ambiente.jpg'),
  },
  {
    id: '3',
    titulo: 'Corte Social Clássico',
    categoria: 'Cabelo',
    descricao: 'Estilo executivo atemporal para homens que buscam sobriedade e elegância.',
    imagem: require('../../assets/images/trabalhos.png'),
  },
  {
    id: '4',
    titulo: 'Degradê Navalhado & Beard Combo',
    categoria: 'Combo',
    descricao: 'Harmonização completa de cabelo e barba com acabamento na navalha.',
    imagem: require('../../assets/images/barbeiro-e-ambiente.jpg'),
  },
  {
    id: '5',
    titulo: 'Barboterapia Premium',
    categoria: 'Barba',
    descricao: 'Tratamento relaxante de esfoliação, vapor de ozônio e óleos essenciais.',
    imagem: require('../../assets/images/trabalhos.png'),
  },
  {
    id: '6',
    titulo: 'Styling & Pigmentação',
    categoria: 'Especial',
    descricao: 'Preenchimento discreto de falhas e definição perfeita dos contornos.',
    imagem: require('../../assets/images/barbeiro-e-ambiente.jpg'),
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

  const whatsapp = '5511999999999';

  const abrirWhatsApp = () => {
    Linking.openURL(`https://wa.me/${whatsapp}`);
  };

  const abrirInstagram = () => {
    Linking.openURL('https://www.instagram.com/');
  };

  const trabalhosFiltrados =
    categoriaAtiva === 'Todos'
      ? LISTA_TRABALHOS
      : LISTA_TRABALHOS.filter((item) => item.categoria === categoriaAtiva);

  const navegacaoMenu: Record<string, () => void> = {
    'Início': () => router.push('/'),
    'Loja': () => router.push('/produtos'),
    'Agendar': () => router.push('/agenda'),
    'Trabalhos': () => {},
    'Minha Conta': () => router.push('/perfil'),
    'Login': () => router.push('/login'),
  };

  return (
    <SafeAreaView style={styles.tela}>
      <StatusBar barStyle="light-content" />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* ==========================================
            1. CABEÇALHO
        ========================================== */}
        <View style={styles.cabecalhoWrapper}>
          <View
            style={[
              styles.cabecalho,
              telaGrande && styles.cabecalhoGrande,
            ]}
          >
            <TouchableOpacity onPress={() => router.push('/')}>
              <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <View style={styles.menu}>
              {['Início', 'Loja', 'Agendar', 'Trabalhos', 'Minha Conta', 'Login'].map(
                (item) => (
                  <TouchableOpacity
                    key={item}
                    style={styles.itemMenu}
                    onPress={navegacaoMenu[item]}
                  >
                    <Text
                      style={[
                        styles.textoMenu,
                        item === 'Trabalhos' && styles.textoMenuAtivo,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ),
              )}
            </View>
          </View>
        </View>

        {/* ==========================================
            2. HERO DA PÁGINA
        ========================================== */}
        <View style={styles.heroSecao}>
          <View style={styles.heroConteudo}>
            <Text style={styles.subtituloDourado}>EXCELÊNCIA & TRADIÇÃO</Text>
            <Text style={styles.tituloHero}>Nossa Equipe & Trabalhos</Text>
            <Text style={styles.descricaoHero}>
              Conheça os especialistas por trás do padrão Golden Barber e inspire-se com as transformações realizadas em nossa barbearia.
            </Text>
          </View>
        </View>

        {/* ==========================================
            3. SEÇÃO NOSSOS BARBEIROS (ANTES DOS TRABALHOS)
        ========================================== */}
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

        {/* ==========================================
            4. FILTRO DE CATEGORIAS DA GALERIA
        ========================================== */}
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

        {/* ==========================================
            5. GALERIA DE TRABALHOS
        ========================================== */}
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

        {/* ==========================================
            6. RODAPÉ PRINCIPAL
        ========================================== */}
        <View style={styles.rodape}>
          <View style={styles.rodapeInner}>
            <View
              style={[
                styles.conteudoRodape,
                telaGrande && styles.conteudoRodapeGrande,
              ]}
            >
              <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logoRodape}
                resizeMode="contain"
              />

              <View style={styles.colunaCentral}>
                <Text style={styles.nomeRodape}>Golden Barber</Text>
                <TouchableOpacity
                  style={styles.botaoDestaqueRodape}
                  onPress={() => router.push('/agenda')}
                >
                  <Text style={styles.textoBotaoDestaqueRodape}>
                    Agendar Horário
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.colunaEndereco}>
                <Text style={styles.tituloEndereco}>Horário & Local</Text>
                <Text style={styles.textoEndereco}>
                  Segunda a Sábado: 09h às 20h
                </Text>
                <Text style={styles.textoEndereco}>
                  Av. Principal, 1000 - Centro
                </Text>
                <Text style={styles.textoEndereco}>Sorocaba - SP</Text>
              </View>
            </View>

            <View style={styles.linhaDourada} />

            <View style={styles.informacoesFinais}>
              <Text style={styles.textoFinal}>© 2026 Golden Barber</Text>

              <TouchableOpacity onPress={abrirInstagram}>
                <Text style={styles.textoFinal}>Instagram</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={abrirWhatsApp}>
                <Text style={styles.textoFinal}>WhatsApp</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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

  // CABEÇALHO
  cabecalhoWrapper: {
    width: '100%',
    backgroundColor: CORES.fundo,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1e2422',
  },
  cabecalho: {
    width: '100%',
    maxWidth: 1200,
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 16,
  },
  cabecalhoGrande: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  logo: {
    width: 90,
    height: 75,
  },
  menu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  itemMenu: {
    paddingVertical: 6,
  },
  textoMenu: {
    color: '#E8E5DF',
    fontSize: 14,
    fontWeight: '500',
  },
  textoMenuAtivo: {
    color: CORES.dourado,
    fontWeight: 'bold',
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
    maxWidth: 260, // <-- Altere aqui para diminuir no celular (antes era 340)
  },
  cardBarbeiroGrande: {
    flex: 1,
    maxWidth: 280, // <-- Altere aqui para diminuir no computador (antes era 360)
  },
  imagemBarbeiroContainer: {
    width: '100%',
    height: 200, // <-- Altere aqui para diminuir a altura da foto (antes era 280)
    backgroundColor: '#1c1f1e',
  },
  imagemBarbeiro: {
    width: '100%',
    height: '100%',
  },
  infoBarbeiro: {
    padding: 14, // <-- Diminua o espaçamento interno (antes era 20)
    alignItems: 'center',
  },
  nomeBarbeiro: {
    color: CORES.dourado,
    fontSize: 18, // <-- Opcional: diminua o tamanho do nome (antes era 22)
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

  // RODAPÉ
  rodape: {
    width: '100%',
    backgroundColor: CORES.fundo,
    paddingVertical: 45,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#1e2422',
  },
  rodapeInner: {
    width: '100%',
    maxWidth: 1200,
    paddingHorizontal: 25,
  },
  conteudoRodape: {
    alignItems: 'center',
    gap: 28,
  },
  conteudoRodapeGrande: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoRodape: {
    width: 120,
    height: 120,
  },
  colunaCentral: {
    alignItems: 'center',
    gap: 16,
  },
  nomeRodape: {
    color: CORES.dourado,
    fontSize: 28,
    fontFamily: 'serif',
    fontWeight: 'bold',
  },
  botaoDestaqueRodape: {
    backgroundColor: CORES.dourado,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  textoBotaoDestaqueRodape: {
    color: '#171510',
    fontWeight: '600',
    fontSize: 13,
  },
  colunaEndereco: {
    alignItems: 'center',
  },
  tituloEndereco: {
    color: CORES.texto,
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textoEndereco: {
    color: '#D5D4CF',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
  linhaDourada: {
    height: 1,
    backgroundColor: CORES.dourado,
    marginTop: 32,
    marginBottom: 20,
    opacity: 0.6,
  },
  informacoesFinais: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textoFinal: {
    color: '#77766F',
    fontSize: 12,
  },
});