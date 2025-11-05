import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Alert,
  CircularProgress,
  Divider
} from '@mui/material';
import {
  DirectionsCar,
  Thermostat,
  LocationOn,
  Person,
  Build,
  Refresh
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001'; // B1 server

function App() {
  const [licensePlate, setLicensePlate] = useState('');
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [temperatureHistory, setTemperatureHistory] = useState([]);

  const fetchCarData = async () => {
    if (!licensePlate.trim()) {
      setError('Please enter a license plate number');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_BASE_URL}/api/car/${licensePlate}`);
      setCarData(response.data);
      
      // Simulate temperature history for chart
      const history = [];
      const now = new Date();
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        history.push({
          time: time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          indoor: response.data.indoorTemp + (Math.random() - 0.5) * 4,
          outdoor: response.data.outdoorTemp + (Math.random() - 0.5) * 6
        });
      }
      setTemperatureHistory(history);
    } catch (error) {
      setError('Failed to fetch car data. Please check the license plate and server connection.');
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

  const sendHeatingCommand = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/car/${licensePlate}/command`, {
        command: 'start_heating'
      });
      alert('Heating command sent successfully!');
    } catch (error) {
      alert('Failed to send heating command');
    }
  };

  useEffect(() => {
    // Auto-refresh every 30 seconds
    if (carData) {
      const interval = setInterval(refreshData, 30000);
      return () => clearInterval(interval);
    }
  }, [carData]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Rental Service Staff Dashboard
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Car Information Lookup
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            label="License Plate"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            variant="outlined"
            size="small"
            placeholder="e.g. ABC-123"
            sx={{ minWidth: 200 }}
          />
          <Button
            variant="contained"
            onClick={fetchCarData}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <DirectionsCar />}
          >
            {loading ? 'Loading...' : 'Get Car Data'}
          </Button>
          {carData && (
            <Button
              variant="outlined"
              onClick={refreshData}
              startIcon={<Refresh />}
            >
              Refresh
            </Button>
          )}
        </Box>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Paper>

      {carData && (
        <>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Thermostat color="primary" />
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      Indoor Temp
                    </Typography>
                  </Box>
                  <Typography variant="h4" color="primary">
                    {carData.indoorTemp}°C
                  </Typography>
                  <Chip 
                    label={carData.indoorTemp > 20 ? "Comfortable" : "Cold"} 
                    color={carData.indoorTemp > 20 ? "success" : "warning"}
                    size="small"
                  />
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Thermostat color="secondary" />
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      Outdoor Temp
                    </Typography>
                  </Box>
                  <Typography variant="h4" color="secondary">
                    {carData.outdoorTemp}°C
                  </Typography>
                  <Chip 
                    label={carData.outdoorTemp > 15 ? "Mild" : "Cold"} 
                    color={carData.outdoorTemp > 15 ? "success" : "info"}
                    size="small"
                  />
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOn color="action" />
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      GPS Location
                    </Typography>
                  </Box>
                  <Typography variant="body1">
                    {carData.gps?.lat?.toFixed(6)}
                  </Typography>
                  <Typography variant="body1">
                    {carData.gps?.lng?.toFixed(6)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Person color="action" />
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      Owner
                    </Typography>
                  </Box>
                  <Typography variant="h6">
                    {carData.owner}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    License: {carData.licensePlate}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Temperature History (24 hours)
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={temperatureHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="indoor" stroke="#1976d2" name="Indoor" />
                    <Line type="monotone" dataKey="outdoor" stroke="#9c27b0" name="Outdoor" />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Car Details
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Owner
                  </Typography>
                  <Typography variant="body1">{carData.owner}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    License Plate
                  </Typography>
                  <Typography variant="body1">{carData.licensePlate}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Last Service
                  </Typography>
                  <Typography variant="body1">{carData.lastService}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Last Updated
                  </Typography>
                  <Typography variant="body1">
                    {new Date(carData.lastUpdated).toLocaleString()}
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="h6" gutterBottom>
                  Remote Commands
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={sendHeatingCommand}
                  startIcon={<Thermostat />}
                  sx={{ mb: 1 }}
                >
                  Start Heating
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Build />}
                >
                  Service Mode
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
}

export default App;