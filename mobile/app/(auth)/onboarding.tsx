
/**
 * Écran d'onboarding
 * Présente les fonctionnalités principales de l'application aux nouveaux utilisateurs
 */
import { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

/**
 * Interface pour les données des slides d'onboarding
 * Interface for onboarding slide data
 */
interface OnboardingSlideData {
  id: string;
  title: string;
  description: string;
  image: string;
}

/**
 * Données des slides d'onboarding
 * Onboarding slides data
 */
const ONBOARDING_DATA: OnboardingSlideData[] = [
  {
    id: '1',
    title: 'Trouvez votre espace professionnel',
    description: 'Découvrez des milliers de bureaux et espaces de coworking partout en France',
    image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&q=80',
  },
  {
    id: '2',
    title: 'Réservez en toute simplicité',
    description: 'Un processus de réservation simple et sécurisé en quelques clics',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
  },
  {
    id: '3',
    title: 'Travaillez dans des lieux d\'exception',
    description: 'Des espaces de travail modernes et bien équipés pour booster votre productivité',
    image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&q=80',
  },
];

/**
 * Composant d'écran d'onboarding
 * Onboarding screen component
 */
export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<OnboardingSlideData> | null>(null);
  const router = useRouter();

  /**
   * Rendu d'un slide d'onboarding
   * Render an onboarding slide
   */
  const renderItem = ({ item }: { item: OnboardingSlideData }) => (
    <View style={styles.slide}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      />
      <View style={styles.content}>
        <Animated.Text 
          entering={FadeIn.duration(800)} 
          exiting={FadeOut}
          style={styles.title}
        >
          {item.title}
        </Animated.Text>
        <Animated.Text 
          entering={FadeIn.delay(400).duration(800)} 
          exiting={FadeOut}
          style={styles.description}
        >
          {item.description}
        </Animated.Text>
      </View>
    </View>
  );

  /**
   * Gère le passage au slide suivant ou la redirection vers la connexion
   * Handles moving to the next slide or redirecting to login
   */
  const handleNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: currentIndex + 1,
          animated: true,
        });
      }
      setCurrentIndex(currentIndex + 1);
    } else {
      router.replace('/(auth)/login');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={ONBOARDING_DATA}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIndex);
        }}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {ONBOARDING_DATA.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentIndex && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentIndex === ONBOARDING_DATA.length - 1 ? 'Commencer' : 'Suivant'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  slide: {
    width,
    height,
  },
  image: {
    width,
    height,
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
  },
  content: {
    position: 'absolute',
    bottom: 200,
    left: 0,
    right: 0,
    padding: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 36,
    color: '#fff',
    marginBottom: 16,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
    lineHeight: 26,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    gap: 32,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  paginationDotActive: {
    backgroundColor: '#fff',
    width: 24,
  },
  button: {
    backgroundColor: '#0066FF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#fff',
  },
});
