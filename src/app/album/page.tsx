'use client'
import { Template } from '../../components/Template'
import { useState } from 'react'
import { useNotification } from '@/components'
import { useAlbumService } from '@/resources/album/album.service' 
import { Button } from '@/components/button'
import Link from 'next/link'
import { InputText } from '@/components/input'

export default function GaleriaPage(){
  
    const useService = useAlbumService();
    const [title, setTitle] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const notification  = useNotification();

    async function searchImages(){
      setLoading(true)
       const result = await useService.buscar(title);

       setLoading(false)

       if(!result.title?.length){
          notification.notify('No results found!', 'warning')
       } else{
          <div>
            <span>{result.releaseYear}</span>
            <span>{result.title}</span>
          </div>
       }
    }

    return (
     <Template loading={loading}>

         <section className='flex flex-col items-center justfy-center my-5'>
                
                <div className='flex space-x-4'>

                <h1 className='flex space-x-4 text-gray-700'>Albums Menu</h1>
                    
                    <InputText placeholder='Type name' onChange={event => setTitle(event.target.value)} />

                      <Button type='button' style='bg-red-500 hover:bg-blue-300' label='Search' onClick={searchImages}/>
                    
                     <Link href="/albumForm">
                     
                         <Button type='button' style='bg-yellow-500 hover:bg-yellow-300' label='Add new'/>

                     </Link>

                </div>

         </section>

         <section className='grid grid-cols-4 gap-8'>

         </section>
     </Template>
    )
}