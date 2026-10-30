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
  Linking,
  useWindowDimensions,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// =====================================================
// GOLDEN BARBER
// Ficheiro: src/app/index.tsx
// =====================================================

const CORES = {
  fundo: '#0f1314',
  marrom: '#2c251d',
  dourado: '#bb975a',
  texto: '#F4F0E8',
  cinza: '#A59A8B',
  card: '#151817',
  avaliacoesFundo: '#151817',
  cardAvaliacao: '#242A28',
};

interface BotaoProps {
  titulo: string;
  destaque?: boolean;
  onPress: () => void;
}

function Botao({ titulo, destaque = false, onPress }: BotaoProps) {
  return (
    <TouchableOpacity
      style={[
        styles.botao,
        destaque ? styles.botaoDestaque : styles.botaoContorno,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.textoBotao,
          destaque ? styles.textoBotaoDestaque : styles.textoBotaoContorno,
        ]}
      >
        {titulo}
      </Text>
    </TouchableOpacity>
  );
}

interface CardProps {
  imagem: any;
  titulo: string;
  descricao: string;
  destaque?: boolean;
  telaGrande?: boolean;
  onPress: () => void;
}

function CardDestaque({
  imagem,
  titulo,
  descricao,
  destaque = false,
  telaGrande = false,
  onPress,
}: CardProps) {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        telaGrande ? styles.cardGrande : styles.cardMobile,
        destaque && styles.cardDestaque,
      ]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Image source={imagem} style={styles.imagemCard} resizeMode="cover" />

      <View style={styles.conteudoCard}>
        <Text style={[styles.tituloCard, destaque && styles.textoEscuro]}>
          {titulo}
        </Text>

        <Text
          style={[
            styles.descricaoCard,
            destaque && styles.descricaoDestaque,
          ]}
        >
          {descricao}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function Index() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [telaGrande, setTelaGrande] = useState(false);

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

  const navegacaoMenu: Record<string, () => void> = {
    'Início': () => { },
    'Loja': () => router.push('/produtos'),
    'Agendar': () => router.push('/agenda'),
    'Trabalhos': () => router.push('/trabalhos'),
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
            <Image
              source={require('../../assets/images/homepage/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            <View style={styles.menu}>
              {['Início', 'Loja', 'Agendar', 'Trabalhos', 'Minha Conta', 'Login'].map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.itemMenu}
                  onPress={navegacaoMenu[item]}
                >
                  <Text style={styles.textoMenu}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* ==========================================
            2. BANNER PRINCIPAL (HERO)
        ========================================== */}
        <ImageBackground
          source={require('../../assets/images/homepage/barbeiro-e-ambiente.jpg')}
          style={[styles.banner]}
          imageStyle={styles.imagemBanner}
          resizeMode="cover"
        >
          <View style={styles.sombraBanner} />

          <View style={styles.bannerConteudoWrapper}>
            <View style={styles.bannerConteudo}>
              <Text style={styles.tituloBanner}>
                Mais que um corte,{'\n'}um estilo de vida
              </Text>

              <Text style={styles.textoBanner}>
                Atendimento de alto padrão, ambiente sofisticado e produtos de
                primeira linha para o homem moderno.
              </Text>

              <View style={styles.botoesBanner}>
                <Botao
                  titulo="Explorar Loja"
                  destaque
                  onPress={() => router.push('/produtos')}
                />
                <Botao
                  titulo="Agendar horário"
                  onPress={() => router.push('/agenda')}
                />
              </View>
            </View>
          </View>
        </ImageBackground>

        {/* ==========================================
            3. NOSSOS DESTAQUES
        ========================================== */}
        <View style={styles.secaoDestaques}>
          <View style={styles.destaquesInner}>
            <Text style={styles.tituloSecao}>Nossos Destaques</Text>

            <Text style={styles.subtituloSecao}>
              Atendimento de alto padrão, ambiente sofisticado e produtos de
              primeira linha para o homem moderno.
            </Text>

            <View
              style={[
                styles.listaCards,
                telaGrande ? styles.listaCardsGrande : styles.listaCardsMobile,
              ]}
            >
              <CardDestaque
                imagem={require('../../assets/images/homepage/loja.png')}
                titulo="Loja Autoral"
                descricao="Produtos exclusivos da marca Golden Barber: pomadas modeladoras, óleos hidratantes para barba e shampoos especiais."
                destaque
                telaGrande={telaGrande}
                onPress={() => router.push('/produtos')}
              />

              <CardDestaque
                imagem={require('../../assets/images/homepage/agendamento.png')}
                titulo="Agendamento"
                descricao="Escolha o serviço desejado, seu barbeiro de preferência, a data e o melhor horário disponível para você."
                telaGrande={telaGrande}
                onPress={() => router.push('/agenda')}
              />

              <CardDestaque
                imagem={require('../../assets/images/homepage/trabalhos.png')}
                titulo="Trabalhos"
                descricao="Confira a galeria de trabalhos realizados por nossa equipe de especialistas e inspire-se para seu próximo visual."
                telaGrande={telaGrande}
                onPress={() => router.push('/trabalhos')}
              />
            </View>
          </View>
        </View>

        {/* ==========================================
            4. AVALIAÇÕES
        ========================================== */}
        <View style={styles.secaoAvaliacoes}>
          <View style={styles.avaliacoesInner}>
            <Text style={styles.tituloSecao}>O que dizem nossos clientes</Text>

            <Text style={styles.subtituloAvaliacao}>
              A experiência Golden Barber na opinião de quem já passou por aqui.
            </Text>

            <View
              style={[
                styles.listaAvaliacoes,
                telaGrande ? styles.listaAvaliacoesGrande : styles.listaAvaliacoesMobile,
              ]}
            >
              <View
                style={[
                  styles.cardAvaliacao,
                  telaGrande ? styles.cardAvaliacaoGrande : styles.cardAvaliacaoMobile,
                ]}
              >
                <Text style={styles.estrelas}>★★★★★</Text>
                <Text style={styles.textoAvaliacao}>
                  "Atendimento excelente, ambiente sofisticado e corte impecável!"
                </Text>
                <Text style={styles.nomeCliente}>Cliente Golden Barber</Text>
              </View>

              <View
                style={[
                  styles.cardAvaliacao,
                  telaGrande ? styles.cardAvaliacaoGrande : styles.cardAvaliacaoMobile,
                ]}
              >
                <Text style={styles.estrelas}>★★★★★</Text>
                <Text style={styles.textoAvaliacao}>
                  "Profissionais atenciosos e muito cuidadosos com cada detalhe."
                </Text>
                <Text style={styles.nomeCliente}>Cliente Golden Barber</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ==========================================
            5. LOCALIZAÇÃO / GOOGLE MAPS (CORES ORIGINAIS)
        ========================================== */}
        <View style={styles.secaoMapa}>
          <View style={styles.mapaInner}>
            <Text style={styles.taglineSecao}>COMO CHEGAR</Text>
            <Text style={styles.tituloSecao}>Venha nos Visitar</Text>
            <Text style={styles.subtituloSecao}>
              Fácil acesso em Sorocaba/SP com estacionamento na região.
            </Text>

            <View
              style={[
                styles.gridVisita,
                telaGrande ? styles.gridVisitaGrande : styles.gridVisitaMobile,
              ]}
            >
              {/* CARD DE INFORMAÇÕES (SEM ÍCONES) */}
              <View style={styles.cardInfoVisita}>
                <View style={styles.blocoInfo}>
                  <Text style={styles.tituloInfo}>Endereço</Text>
                  <Text style={styles.textoInfoDestaque}>Av. Principal, 1000</Text>
                  <Text style={styles.textoInfoSub}>Centro - Sorocaba - SP</Text>
                  <Text style={styles.textoInfoSub}>CEP 18000-000</Text>
                </View>

                <View style={styles.divisorInfo} />

                <View style={styles.blocoInfo}>
                  <Text style={styles.tituloInfo}>Horários</Text>
                  <Text style={styles.textoInfoDestaque}>Segunda a Sábado</Text>
                  <Text style={styles.textoInfoSub}>09h00 às 20h00</Text>
                  <Text style={styles.textoInfoSub}>Domingos e Feriados: Fechado</Text>
                </View>
              </View>

              {/* CONTAINER DO MAPA (CORES ORIGINAIS) */}
              <View style={styles.containerIframe}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d470092.74092344457!2d-46.11397563437496!3d-23.00174899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ccf9b788bd1917%3A0xa5b0bda363f85468!2sGolden%20Barber%20Shop!5e0!3m2!1spt-BR!2sbr!4v1793359175236!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    minHeight: '380px',
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </View>
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
                source={require('../../assets/images/homepage/logo.png')}
                style={styles.logoRodape}
                resizeMode="contain"
              />

              <View style={styles.colunaCentral}>
                <Text style={styles.nomeRodape}>Golden Barber</Text>
                <Botao
                  titulo="Explorar Loja"
                  destaque
                  onPress={() => router.push('/produtos')}
                />
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

  // BANNER
  banner: {
    width: '100%',
    height: 520,
    justifyContent: 'center',
    backgroundColor: CORES.marrom,
  },
  imagemBanner: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  sombraBanner: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  bannerConteudoWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  bannerConteudo: {
    width: '100%',
    maxWidth: 1200,
    paddingHorizontal: 30,
    paddingVertical: 60,
    alignItems: 'flex-start',
  },
  tituloBanner: {
    color: '#F8F2E9',
    fontSize: 38,
    lineHeight: 44,
    fontWeight: 'bold',
    marginBottom: 16,
    maxWidth: 480,
    fontFamily: 'serif',
  },
  textoBanner: {
    color: '#F0E9DF',
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 400,
    marginBottom: 26,
  },
  botoesBanner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },

  // BOTÕES
  botao: {
    minWidth: 160,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  botaoDestaque: {
    backgroundColor: CORES.dourado,
    borderWidth: 1,
    borderColor: CORES.dourado,
  },
  botaoContorno: {
    backgroundColor: 'rgba(16,20,20,0.85)',
    borderWidth: 1,
    borderColor: CORES.dourado,
  },
  textoBotao: {
    fontSize: 13,
    letterSpacing: 0.3,
  },
  textoBotaoDestaque: {
    color: '#171510',
    fontWeight: '600',
  },
  textoBotaoContorno: {
    color: CORES.texto,
  },

  // DESTAQUES
  secaoDestaques: {
    width: '100%',
    backgroundColor: CORES.marrom,
    paddingVertical: 55,
    alignItems: 'center',
  },
  destaquesInner: {
    width: '100%',
    maxWidth: 1200,
    paddingHorizontal: 24,
  },
  tituloSecao: {
    color: CORES.texto,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'serif',
    marginBottom: 12,
  },
  subtituloSecao: {
    color: CORES.cinza,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    alignSelf: 'center',
    maxWidth: 450,
    marginBottom: 36,
  },
  listaCards: {
    width: '100%',
    gap: 20,
  },
  listaCardsMobile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  listaCardsGrande: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  card: {
    backgroundColor: CORES.card,
    borderRadius: 4,
    overflow: 'hidden',
  },
  cardMobile: {
    width: '100%',
    maxWidth: 360,
  },
  cardGrande: {
    flex: 1,
    maxWidth: 360,
  },
  cardDestaque: {
    backgroundColor: CORES.dourado,
  },
  imagemCard: {
    width: '100%',
    height: 180,
    backgroundColor: '#39332B',
  },
  conteudoCard: {
    padding: 18,
    minHeight: 120,
  },
  tituloCard: {
    color: CORES.texto,
    fontSize: 20,
    fontFamily: 'serif',
    fontWeight: '600',
    marginBottom: 8,
  },
  textoEscuro: {
    color: '#171510',
  },
  descricaoCard: {
    color: CORES.cinza,
    fontSize: 13,
    lineHeight: 18,
  },
  descricaoDestaque: {
    color: '#302719',
  },

  // AVALIAÇÕES
  secaoAvaliacoes: {
    width: '100%',
    backgroundColor: CORES.avaliacoesFundo,
    paddingVertical: 50,
    alignItems: 'center',
  },
  avaliacoesInner: {
    width: '100%',
    maxWidth: 1200,
    paddingHorizontal: 22,
  },
  subtituloAvaliacao: {
    color: '#AAA69D',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
  },
  listaAvaliacoes: {
    width: '100%',
    gap: 16,
  },
  listaAvaliacoesMobile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  listaAvaliacoesGrande: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardAvaliacao: {
    backgroundColor: CORES.cardAvaliacao,
    borderWidth: 1,
    borderColor: '#3A3D36',
    borderRadius: 4,
    padding: 22,
  },
  cardAvaliacaoMobile: {
    width: '100%',
    maxWidth: 540,
  },
  cardAvaliacaoGrande: {
    flex: 1,
    maxWidth: 540,
  },
  estrelas: {
    color: CORES.dourado,
    fontSize: 18,
    letterSpacing: 3,
    marginBottom: 10,
  },
  textoAvaliacao: {
    color: '#F0ECE4',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 14,
  },
  nomeCliente: {
    color: CORES.dourado,
    fontSize: 12,
    fontWeight: '600',
  },

  // LOCALIZAÇÃO / MAPA
  secaoMapa: {
    width: '100%',
    backgroundColor: CORES.marrom,
    paddingVertical: 55,
    alignItems: 'center',
  },
  mapaInner: {
    width: '100%',
    maxWidth: 1050,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  taglineSecao: {
    color: CORES.dourado,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 6,
    textAlign: 'center',
  },
  gridVisita: {
    width: '100%',
    marginTop: 24,
    gap: 20,
  },
  gridVisitaMobile: {
    flexDirection: 'column',
  },
  gridVisitaGrande: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  cardInfoVisita: {
    flex: 1,
    backgroundColor: CORES.card,
    borderRadius: 8,
    padding: 32,
    borderWidth: 1,
    borderColor: '#3A3D36',
    justifyContent: 'center',
  },
  blocoInfo: {
    gap: 6,
  },
  tituloInfo: {
    color: CORES.dourado,
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'serif',
    marginBottom: 8,
  },
  textoInfoDestaque: {
    color: CORES.texto,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  textoInfoSub: {
    color: CORES.cinza,
    fontSize: 14,
    lineHeight: 20,
  },
  divisorInfo: {
    height: 1,
    backgroundColor: '#3A3D36',
    width: '100%',
    marginVertical: 24,
    opacity: 0.8,
  },
  containerIframe: {
    flex: 1.4,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#3A3D36',
    minHeight: 380,
  },

  // RODAPÉ
  rodape: {
    width: '100%',
    backgroundColor: CORES.fundo,
    paddingVertical: 45,
    alignItems: 'center',
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