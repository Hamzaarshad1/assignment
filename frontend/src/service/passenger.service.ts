import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/passengers/';

export const getPassengerById = async (passengerId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}${passengerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching passenger data:', error);
    throw error;
  }
};

export const updatePassenger = async (passengerId: string, data: any) => {
  try {
    const response = await axios.put(`${BASE_URL}${passengerId}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating passenger data:', error);
    throw error;
  }
};

export const getAllPassengers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all passenger data:', error);
    throw error;
  }
};
