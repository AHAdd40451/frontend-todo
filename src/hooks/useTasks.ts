'use client';

import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Task } from "@/types/task";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const useTasks = () => {
    return useQuery<Task[]>({
        queryKey: ['tasks'],
        queryFn: () => axios.get(`${API_URL}/tasks`).then(res => res.data)
    });
};

export const useTaskById = (id: string) => {
    return useQuery<Task>({
        queryKey: ['task', id],
        queryFn: () => axios.get(`${API_URL}/tasks/${id}`).then(res => res.data)
    });
};

export const useCreateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Partial<Task>) =>
            axios.post(`${API_URL}/tasks`, data).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        }
    });
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string | number; data: Partial<Task> }) =>
            axios.put(`${API_URL}/tasks/${id}`, data).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        }
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string | number) =>
            axios.delete(`${API_URL}/tasks/${id}`).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        }
    });
};