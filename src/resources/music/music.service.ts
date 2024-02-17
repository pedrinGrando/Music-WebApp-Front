import { Music } from './music.resource'

class MusicService {
    baseURL: string = 'http://localhost:8080/songs';

    async buscar(nameMusic: string) : Promise<Music>{
        const url = `${this.baseURL}?nameMusic=${nameMusic}`
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
        });
        return await response.json();
    }

    async salvar (dados: FormData) {
        const response = await fetch(this.baseURL, {
            method: 'POST',
            mode: 'cors',
            body: dados,
            headers: {
                'Content-Type': 'application/json'
            }
            
        })

       return response;
    }
}

// REACT HOOK
export const useMusicService = () => new MusicService();