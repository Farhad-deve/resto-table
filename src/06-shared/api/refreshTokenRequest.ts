import axios from 'axios';
import { API_URL } from '../config/consants';

const refreshTokenApi = axios.create({
    baseURL: API_URL
});

interface RefreshTokenResponse {
    access: string;
}

export const refreshTokenRequest = async (refreshToken: string) : Promise<RefreshTokenResponse> => {
    const res = await refreshTokenApi.post<RefreshTokenResponse>("/auth/refresh", { refresh: refreshToken });
    return res.data;
};