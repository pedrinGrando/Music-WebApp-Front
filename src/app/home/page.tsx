'use client'
import { Template } from '../../components/Template'
import { useState } from 'react'

export default function GaleriaPage(){
    
    const [loading, setLoading] = useState<boolean>(false)
    
    return (
     <Template loading={loading}>

         <section className='flex flex-col items-center justfy-center my-5'>
                
                <div className='flex space-x-4'>

                        <div>
                          
                          <h1 className='text-gray-700'>Welcome to Music Listener</h1>
                          <p className='text-gray-700'>Our system manages Songs, Artists and Albums</p>
                          <p className='text-gray-700'>- Enjoy yourself!</p>
                          
                         </div>     
                </div>

           </section>

          <section className='grid grid-cols-4 gap-8'>

         </section>
     </Template>
    )
}