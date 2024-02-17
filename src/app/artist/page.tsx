'use client'
import { Template } from '../../components/Template'
import { useState } from 'react'
import { useNotification } from '@/components'
import { useArtistService } from '@/resources/artist/artist.service' 
import { Artist } from '@/resources/artist/artist.resource'
import { Button } from '@/components/button'
import Link from 'next/link'
import { InputText } from '@/components/input'

export default function ArtistPage(){
  
    const useService = useArtistService();
    const [name, setName] = useState<string>("")
    const [extension, setExtension] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const notification  = useNotification();

    async function searchImages(){
      setLoading(true)
       const result = await useService.buscar(name);
       setLoading(false)

       if(!result){
          notification.notify('No Artists found!', 'warning')
       }else{
        <div>
             <span>{result.name}</span>
            <span>{result.profileImage}</span>
          </div>
       }
    }


    return (
     <Template loading={loading}>

         <section className='flex flex-col items-center justfy-center my-5'>
  
                <div className='flex space-x-4'>

                <h1 className='flex space-x-4 text-gray-700'>Artist Menu</h1>
                    
                    <InputText placeholder='Type name' onChange={event => setName(event.target.value)} />

                      <Button type='button' style='bg-red-500 hover:bg-blue-300' label='Search' onClick={searchImages}/>
                    
                     <Link href="/artistForm">
                     
                         <Button type='button' style='bg-yellow-500 hover:bg-yellow-300' label='Add new'/>

                     </Link>
                </div>
         </section>

         <section className='grid grid-cols-4 gap-8'>

         </section>
     </Template>
    )
}