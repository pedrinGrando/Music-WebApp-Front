import { Artist } from './artist.resource'

class ArtistService {
    baseURL: string = 'http://localhost:8080/artists';

    async buscar(name: string) : Promise<Artist>{
        const url = `${this.baseURL}?query=${name}`
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
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
export const useArtistService = () => new ArtistService();