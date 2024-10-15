import axios from "axios";

const api = axios.create({
  baseURL:
    "https://aeroperformanceanlayzerservice-d2bretahcsexckgf.canadacentral-01.azurewebsites.net/api/Performance",
});

// Type definitions for the API responses

interface ConditionResult {
  time: number; // Adjust based on your actual response structure
}

// Store telemetry data
export const storeTelemetryData = async (base64File: string): Promise<any> => {
  const response = await api.post<any>("/StoreTelemetryData", {
    fileContent: base64File,
  });
  return response.data;
};

// Get telemetry data
export const getTelemetryData = async (): Promise<any[]> => {
  const response = await api.get<any[]>("/GetTelemetryData");
  return response.data;
};

// Get time by condition
export const getTimeByCondition = async (
  channel: number,
  condition: string,
  value: number
): Promise<ConditionResult> => {
  const response = await api.get<ConditionResult>("/GetTimeByCondition", {
    params: { channel, condition, value },
  });
  return response.data;
};

// Get times for default conditions
export const getTimesForDefaultCondition = async (): Promise<any> => {
  const response = await api.get<any>("/GetTimesForDefaultCondition");
  return response.data;
};

// Clear telemetry data
export const clearTelemetryData = async (): Promise<void> => {
  try {
    const response = await api.delete("/ClearTelemetryData");
    console.log("Delete successful:", response.data);
  } catch (error) {
    console.error("Error deleting telemetry data:", error);
    throw error; // Re-throw the error to handle it where this function is called
  }
};
