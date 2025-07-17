// services/roomService.ts

import { Room } from "@/shared/types/room";
import axiosInstance from "./axiosinstance";



// ✅ Get all rooms by hotel ID
export const fetchRoomsByHotel = async (hotelId: number): Promise<Room[]> => {
  const response = await axiosInstance.get(`/rooms/getByHotel/${hotelId}`);
  return response.data;
};

// ✅ Get a single room by ID
export const fetchRoomById = async (roomId: number): Promise<Room> => {
  const response = await axiosInstance.get(`/rooms/getByRoom/${roomId}`);
  return response.data;
};

// ✅ Create a new room (omit roomId)
export const createRoom = async (room: Omit<Room, 'roomId'>): Promise<void> => {
  await axiosInstance.post('/rooms/saveRoom', room);
};

// ✅ Update an existing room
export const updateRoom = async (room: Room): Promise<Room> => {
  const response = await axiosInstance.put(`/rooms/update/${room.roomId}`, room);
  return response.data;
};

// ✅ Delete a room by ID
export const deleteRoom = async (roomId: number): Promise<void> => {
  await axiosInstance.delete(`/rooms/${roomId}`);
};
