import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import { Hotel } from '@/shared/types/Hotel';
import { useSaveHotel } from '@/shared/hooks/useHotel';
import { styles } from './addHotel.styles';


const AddHotelScreen = () => {
  const [hotel, setHotel] = useState<Hotel>({
    hotelId: 0,
    hotelName: '',
    hotelAddress: '',
  });

  const router = useRouter();
  const { mutate: saveHotel, isPending } = useSaveHotel();

  const handleChange = (name: keyof Hotel, value: string) => {
    setHotel((prev) => ({
      ...prev,
      [name]: name === 'hotelId' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = () => {
    const { hotelId, hotelName, hotelAddress } = hotel;

    if (!hotelId || !hotelName.trim() || !hotelAddress.trim()) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }

    saveHotel(hotel, {
      onSuccess: () => {
        Alert.alert('Success', '✅ Hotel saved successfully!');
        setHotel({ hotelId: 0, hotelName: '', hotelAddress: '' });
      },
      onError: () => {
        Alert.alert('Error', '❌ Failed to save hotel.');
      },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backButton}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Hotel Details</Text>

      <Text style={styles.label}>Hotel ID</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={hotel.hotelId?.toString() || ''}
        onChangeText={(text) => handleChange('hotelId', text)}
      />

      <Text style={styles.label}>Hotel Name</Text>
      <TextInput
        style={styles.input}
        value={hotel.hotelName}
        onChangeText={(text) => handleChange('hotelName', text)}
      />

      <Text style={styles.label}>Hotel Address</Text>
      <TextInput
        style={styles.input}
        value={hotel.hotelAddress}
        onChangeText={(text) => handleChange('hotelAddress', text)}
      />

      <TouchableOpacity
        style={[styles.button, isPending && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={isPending}
      >
        <Text style={styles.buttonText}>{isPending ? 'Saving...' : 'Save Hotel'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddHotelScreen;