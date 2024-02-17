'use client'
import { Template } from '../../components/Template'
import { useState } from 'react'
import { useNotification } from '@/components'
import { useMusicService } from '@/resources/music/music.service' 
import { Music } from '@/resources/music/music.resource'
import { Button } from '@/components/button'
import Link from 'next/link'
import { InputText } from '@/components/input'

export default function GaleriaPage(){
  
    const useService = useMusicService();
    const [nameMusic, setNameMusic] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const notification  = useNotification();

    async function searchImages(){
      setLoading(true)
       const result = await useService.buscar(nameMusic);
       setLoading(false)

       if(!result.nameMusic?.length){
          notification.notify('No results found!', 'warning')
       }else{
        <div>
             <span>{result.nameMusic}</span>
            <span>{result.durationMinutes}:{result.durationSeconds}</span>
            <span>{result.trackNumber}</span>
            <span>{result.album}</span>
          </div>
       }
    }

    return (
     <Template loading={loading}>

         <section className='flex flex-col items-center justfy-center my-5'>
                
                <div className='flex space-x-4'>

                <h1 className='flex space-x-4 text-gray-700'>Musics Menu</h1>
                    
                    <InputText placeholder='Type name' onChange={event => setNameMusic(event.target.value)} />

                      <Button type='button' style='bg-red-500 hover:bg-blue-300' label='Search' onClick={searchImages}/>
                    
                     <Link href="/musicForm">
                     
                         <Button type='button' style='bg-yellow-500 hover:bg-yellow-300' label='Add new'/>

                     </Link>
                </div>
         </section>

         <section className='grid grid-cols-4 gap-8'>

         </section>
     </Template>
    )
}