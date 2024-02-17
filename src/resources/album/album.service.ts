import { Album } from './album.resource'


class AlbumService {
    baseURL: string = 'http://localhost:8080/albums';

    async buscar(title: string) : Promise<Album>{

        const id = this.buscarPeloId(title)
        const url = `${this.baseURL}?id=${id}`
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
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

    async buscarPeloId(title: string): Promise<number> {
        try {
          
           const urlId = `${this.baseURL}?title=${title}`;
   
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

   //DELETE EM TESTE
   async deleteAlbum(id: number) {
    try {
      const response = await fetch(`http://localhost:8080/albums/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log('Album deleted successfully');
       
      } else {
        console.error('Failed to delete album');
        
      }
    } catch (error) {
      console.error('Error deleting album:', error);
      
    }
  };
  
}

// REACT HOOK
export const useAlbumService = () => new AlbumService();