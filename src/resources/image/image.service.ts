import { Image } from './image.resource'

class ImageService {
    baseURL: string = 'http://localhost:8080/v1/images';

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
export const useImageService = () => new ImageService();