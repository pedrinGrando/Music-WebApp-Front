'use client'
import { Template } from '../../components/Template'
import { ImageCard } from '../../components/ImageCard'
import { useState } from 'react'
import { useNotification } from '@/components'
import { useImageService } from '@/resources/image/image.service' 
import { Image } from '@/resources/image/image.resource'
import { Button } from '@/components/button'
import Link from 'next/link'
import { InputText } from '@/components/input'

export default function GaleriaPage(){
  
    const useService = useImageService();
    const [images, setImages] = useState<Image[]>([])
    const [query, setQuery] = useState<string>("")
    const [extension, setExtension] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const notification  = useNotification();

    async function searchImages(){
      setLoading(true)
       const result = await useService.buscar(query, extension);
       setImages(result);
       setLoading(false)

       if(!result.length){
          notification.notify('No results found!', 'warning')
       }
    }
    function renderImageCard(image: Image){
      return(
         <ImageCard nome={image.name} 
                     src={image.url} 
                     extension={image.extension}
                     tamanho={image.size} 
                     dataUpload={image.uploadDate} />
       )
    }
 
    function renderImageCards(){
         return images.map(image => renderImageCard(image))
    }

    return (
     <Template loading={loading}>

         <section className='flex flex-col items-center justfy-center my-5'>
                
                <div className='flex space-x-4'>
                    
                         <div>
                          
                          <h1 className='text-gray-700'>Bem vindo ao Music Listener</h1>
                          <p className='text-gray-700'>Nosso sistema feito gerenciamentos de Musicas, Artistas e Albums</p>
                          
                          </div>     
          
                </div>

         </section>

         <section className='grid grid-cols-4 gap-8'>

          {
            renderImageCards()
          }

         </section>
     </Template>
    )
}