import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Provider as PaperProvider, Card, Title, Paragraph, TextInput, Button, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001'; // B1 server

export default function App() {
  const [licensePlate, setLicensePlate] = useState('');
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCarData = async () => {
    if (!licensePlate.trim()) {
      Alert.alert('Error', 'Please enter a license plate number');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/car/${licensePlate}`);
      setCarData(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch car data. Make sure the license plate is correct and the server is running.');
      console.error('Error fetching car data:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    if (carData) {
      fetchCarData();
    }
  };

  useEffect(() => {
    // Auto-refresh every 30 seconds if we have car data
    if (carData) {
      const interval = setInterval(refreshData, 30000);
      return () => clearInterval(interval);
    }
  }, [carData]);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Car User App</Title>
            <Paragraph>Enter your license plate to view car information</Paragraph>
            
            <TextInput
              label="License Plate"
              value={licensePlate}
              onChangeText={setLicensePlate}
              style={styles.input}
              mode="outlined"
              placeholder="e.g. ABC-123"
            />
            
            <Button 
              mode="contained" 
              onPress={fetchCarData}
              loading={loading}
              disabled={loading}
              style={styles.button}
            >
              Get Car Data
            </Button>
          </Card.Content>
        </Card>

        {carData && (
          <Card style={styles.card}>
            <Card.Content>
              <Title>Car Information - {carData.licensePlate}</Title>
              
              <View style={styles.dataRow}>
                <Paragraph style={styles.label}>Outdoor Temperature:</Paragraph>
                <Paragraph style={styles.value}>{carData.outdoorTemp}°C</Paragraph>
              </View>
              
              <View style={styles.dataRow}>
                <Paragraph style={styles.label}>Indoor Temperature:</Paragraph>
                <Paragraph style={styles.value}>{carData.indoorTemp}°C</Paragraph>
              </View>
              
              <View style={styles.dataRow}>
                <Paragraph style={styles.label}>GPS Location:</Paragraph>
                <Paragraph style={styles.value}>
                  {carData.gps?.lat?.toFixed(6)}, {carData.gps?.lng?.toFixed(6)}
                </Paragraph>
              </View>
              
              <View style={styles.dataRow}>
                <Paragraph style={styles.label}>Owner:</Paragraph>
                <Paragraph style={styles.value}>{carData.owner}</Paragraph>
              </View>
              
              <View style={styles.dataRow}>
                <Paragraph style={styles.label}>Last Service:</Paragraph>
                <Paragraph style={styles.value}>{carData.lastService}</Paragraph>
              </View>
              
              <View style={styles.dataRow}>
                <Paragraph style={styles.label}>Last Updated:</Paragraph>
                <Paragraph style={styles.value}>
                  {new Date(carData.lastUpdated).toLocaleString()}
                </Paragraph>
              </View>

              <Button 
                mode="outlined" 
                onPress={refreshData}
                style={styles.refreshButton}
              >
                Refresh Data
              </Button>
            </Card.Content>
          </Card>
        )}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginBottom: 16,
  },
  input: {
    marginVertical: 8,
  },
  button: {
    marginTop: 16,
  },
  refreshButton: {
    marginTop: 16,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  label: {
    fontWeight: 'bold',
    flex: 1,
  },
  value: {
    flex: 1,
    textAlign: 'right',
  },
});