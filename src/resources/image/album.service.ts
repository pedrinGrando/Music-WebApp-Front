import { Image } from './album.resource'

class AlbumService {
    baseURL: string = 'http://localhost:8080/albums';

    async buscar(query: string, extension: string) : Promise<Image[]>{
        const url = `${this.baseURL}?query=${query}&extension=${extension}`
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
        });
        return await response.json();
    }

    async salvar (dados: FormData) : Promise<string>{
        const response = await fetch(this.baseURL, {
            method: 'POST',
            mode: 'cors',
            body: dados
        })

       return response.headers.get('location') ?? ''
    }
}

// REACT HOOK
export const useAlbumService = () => new AlbumService();