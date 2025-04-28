import React, { useState } from 'react';
import { Pressable, Image,StyleSheet } from 'react-native';
import { Card } from '../../components/ui/card';
import { Heading } from '../../components/ui/heading';
import { Text } from '../../components/ui/text';
import { Box } from '../../components/ui/box';
import moment from 'moment';
//import LinearGradient from 'react-native-linear-gradient';
import { Icon, EyeIcon } from "@/components/ui/icon"
import { View } from '../../components/ui/view';

function showEye() {
  return <Icon as={EyeIcon} size="xl" />
}

type Policy = {
  id: string;
  name: string;
  productname : string;
  productid: string;
  firstname: string;
  description: string;
  integration: string;
  country: string;
  status : string
};

const getProductImage = (productid: string) => {
  const images: { [key: string]: any } = {
    "1": require("@/assets/images/biz/train.png"),
    "2": require("@/assets/images/biz/avion.png"),
    "3": require("@/assets/images/biz/bagage.png"),
    // Ajoutez d'autres mappings ici
  };

  return images[productid] || require("@/assets/images/biz/avion.png"); // Image par défaut
};

export default function Policycard(props: Policy) {
  const [isPressed, setIsPressed] = useState(false);
  var outputDate = moment(props.integration).format("dddd, MMM DD at HH:mm a");
  return (
    <Pressable
      onPressIn={() => setIsPressed(true)} // Détecte le début de l'interaction
      onPressOut={() => setIsPressed(false)} // Réinitialise après l'interaction
    >

      <Card
        size="md"
        variant="elevated"
        style={[
          styles.card,
          isPressed ? styles.cardPressed : styles.cardDefault,
        ]}
      >
      <View style={styles.header}>
        <Box style={styles.circle}>
           <Image
                source={getProductImage(props.productid)}
                style={styles.productImage}
                resizeMode="contain"
              />
        </Box>
        <View style={styles.eyeIcon}>
        {showEye()}
        </View>
        </View>
        <Heading size="md" style={styles.heading}>
          {props.productname} {props.status}

        </Heading>
        <Text size="sm" style={styles.description}>
          {props.name} {props.firstname}  
         
          {props.description}
        </Text>
        <Text size="sm" style={styles.description}>
        {outputDate} {props.country}
        </Text>
      </Card>

    </Pressable>
  );
}

/*
   <LinearGradient
        colors={
          isPressed
            ? ['#9333ea', '#3b82f6'] // Violet à bleu (quand pressé)
            : ['#3b82f6', '#9333ea'] // Bleu à violet (par défaut)
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.cardGradient}
      >
        */
const styles = StyleSheet.create({
  header: {
    flexDirection: "row", // Dispose les éléments horizontalement
    justifyContent: "space-between", // Place Box à gauche et showEye() à droite
    alignItems: "center", // Aligne verticalement les éléments
    marginBottom: 16, // Espacement sous le header
  },
  eyeIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  cardGradient: {
    margin: 12,
    borderRadius: 16, // Assurez-vous que le dégradé suit les coins arrondis
  },
  card: {
    margin: 2,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    transform: [{ scale: 1 }],
    transition: 'transform 0.2s',
    backgroundColor: 'transparent', // Le fond est géré par le dégradé
  },
  cardDefault: {
   // backgroundColor: 'linear-gradient(to right, #3b82f6, #9333ea)', // Bleu à violet
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardPressed: {
    //backgroundColor: 'linear-gradient(to right, #9333ea, #3b82f6)', // Violet à bleu
    transform: [{ scale: 0.95 }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  circle: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  circleText: {
    color: '#3b82f6',
    fontWeight: 'bold',
    fontSize: 16,
  },
  productImage: {
    width: 64, // Remplit toute la largeur du conteneur
    height: 64, // Remplit toute la hauteur du conteneur
    borderRadius: 50, // Assure que l'image suit les coins arrondis du cercle
  },
  heading: {
    marginBottom: 8,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  description: {
    color: '#050405',
    fontSize: 14,
  },
});