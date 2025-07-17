import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { useHotels } from '@/shared/hooks/useHotel';
import { Hotel } from '@/shared/types/Hotel';
import { styles } from './propertiesPage.styles';
import { Property, PropertyStatus } from '@/shared/types/Property';

const PropertyListScreen = () => {
  const { data: hotelsData, isLoading, isError } = useHotels();

  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilter, setCurrentFilter] = useState<PropertyStatus | 'All'>('All');

  // ✅ Map API hotels to our unified Property type
  const mappedHotels: Property[] =
    hotelsData?.map((hotel: Hotel) => ({
      id: hotel.hotelId.toString(),
      name: hotel.hotelName,
      address: hotel.hotelAddress,
      status: PropertyStatus.LIVE, // Or dynamically assign based on backend logic
    })) || [];

  const filteredProperties = mappedHotels.filter((property) => {
    const matchesFilter = currentFilter === 'All' || property.status === currentFilter;
    const matchesSearch =
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.id.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const handleActionClick = (propertyId: string) => {
    Alert.alert('Action', `Manage property ID: ${propertyId}`);
  };

  const renderProperty = ({ item }: { item: Property }) => (
    <View style={{
      backgroundColor: '#fff',
      padding: 16,
      marginBottom: 10,
      borderRadius: 10,
      elevation: 1,
    }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>{item.name}</Text>
      <Text style={{ color: '#666' }}>{item.address}</Text>
      <TouchableOpacity
        onPress={() => handleActionClick(item.id)}
        style={{
          backgroundColor: '#1abc9c',
          marginTop: 10,
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: '600' }}>Manage</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) return <Text style={{ padding: 20 }}>Loading hotels...</Text>;
  if (isError) return <Text style={{ padding: 20 }}>Error loading hotels.</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Property Details</Text>
      </View>

      <TextInput
        placeholder="Search by name or ID..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 10,
          padding: 10,
          marginBottom: 12,
        }}
      />

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
        {(['All', ...Object.values(PropertyStatus)] as (PropertyStatus | 'All')[]).map((status) => (
          <TouchableOpacity
            key={status}
            onPress={() => setCurrentFilter(status)}
            style={{
              paddingVertical: 6,
              paddingHorizontal: 14,
              borderRadius: 16,
              backgroundColor: currentFilter === status ? '#1abc9c' : '#eee',
              marginRight: 8,
              marginBottom: 8,
            }}
          >
            <Text style={{
              color: currentFilter === status ? '#fff' : '#333',
              fontWeight: '500',
            }}>
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredProperties}
        keyExtractor={(item) => item.id}
        renderItem={renderProperty}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </View>
  );
};

export default PropertyListScreen;
