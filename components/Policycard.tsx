import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Card } from './ui/card';
import { Heading } from './ui/heading';
import { Text } from './ui/text';
import { Box } from './ui/box';
import moment from 'moment';

type Policy = {
  id: string;
  name: string;
  productname : string;
  firstname: string;
  description: string;
  integration: string;
  country: string;
  status : string
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
        <Box style={styles.circle}>
          <Text style={styles.circleText}>Test</Text>
        </Box>
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

const styles = StyleSheet.create({
  card: {
    margin: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    transform: [{ scale: 1 }],
    transition: 'transform 0.2s',
  },
  cardDefault: {
    backgroundColor: 'linear-gradient(to right, #3b82f6, #9333ea)', // Bleu à violet
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardPressed: {
    backgroundColor: 'linear-gradient(to right, #9333ea, #3b82f6)', // Violet à bleu
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