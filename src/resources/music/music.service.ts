import { Music } from './music.resource'

class MusicService {
    baseURL: string = 'http://localhost:8080/music';

    async buscar(query: string, extension: string) : Promise<Music[]>{
        const url = `${this.baseURL}?query=${query}&extension=${extension}`
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
        });
        return await response.json();
    }

    async salvar (dados: FormData) : Promise<string>{
        const response = await fetch(this.baseURL, {
            method: 'POST',
            mode: 'cors',
            body: dados,
            headers: {
                'Content-Type': 'application/json'
            }
            
        })

       return response.headers.get('location') ?? ''
    }
}

// REACT HOOK
export const useMusicService = () => new MusicService();