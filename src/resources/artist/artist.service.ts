import { Artist } from './artist.resource'

class ArtistService {
    baseURL: string = 'http://localhost:8080/artists';

    async buscar(name: string) : Promise<Artist>{

        const id = this.buscarPeloId(name);

        const url = `${this.baseURL}?id=${id}`
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    }

    async salvar (dados: FormData){
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

    async buscarPeloId(name: string): Promise<number> {
        try {
          
           const urlId = `${this.baseURL}?name=${name}`;
   
           // Realiza a requisição GET para a API
           const response = await fetch(urlId, {
               method: 'GET',
               mode: 'cors',
               headers: {
                   'Content-Type': 'application/json'
               }
           });
   
           if (!response.ok) {
               throw new Error('Erro ao buscar o ID do artista');
           }
   
           const data = await response.json();
           const id = data.id;
   
           if (typeof id !== 'number') {
               throw new Error('ID do artista não encontrado na resposta da API');
           }
   
           return id;
       } catch (error) {

           console.error('Erro ao buscar o ID do artista:', error);
           throw error;
       }
   
   }
}

 

// REACT HOOK
export const useArtistService = () => new ArtistService();