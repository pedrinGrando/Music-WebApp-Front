'use client'

import { Template } from "@/components"
import { Button, InputText, RenderIf, useNotification, FieldError } from "@/components"
import { useMusicService } from '@/resources/music/music.service'
import { useFormik } from "formik"
import { FormMusicProps, formScheme, formValidationScheme } from './formScheme'
import { useState } from "react"
import Link from "next/link"

export default function FormularioPage(){

      const [loading, setLoading]  = useState<boolean>(false)
      const [imagePreview, setImagePreview] = useState<string>();
      const service = useMusicService();
      const notification = useNotification();

       const formik = useFormik<FormMusicProps>({
          initialValues: formScheme,
          onSubmit: handleSubmit,
          validationSchema: formValidationScheme
       })

     async function handleSubmit(dados: FormMusicProps){
         setLoading(true)

         const formData = new FormData();
         formData.append("name", dados.nameMusic ?? ""); 
         formData.append("durationMinutes", String(dados.durationMinutes ?? ""));
         formData.append("durationSeconds", String(dados.durationSeconds ?? "")); 
         formData.append("album", String(dados.album ?? "")); 
         formData.append("trackNumber", String(dados.trackNumber ?? "")); 
         
          await service.salvar(formData)

          formik.resetForm();
        
          setImagePreview('')

          setLoading(false)

          notification.notify('Upload sent successfully', 'success' )
     }

    return (
      <Template loading={loading}>
           <section className="flex flex-col items-center justify-center my-5">
            <h5 className="mt-3 mb-10 text-3x1 font-extrabold tracking-tight text-gray-900">New Music</h5>
              <form onSubmit={formik.handleSubmit}>

                <div className="grid grid-cols-1">
                     <label className="block text-sm font-medium leading-6 text-gray-700">Tittle: *</label>
                     <InputText    id="name" 
                                   value={formik.values.nameMusic} 
                                   onChange={formik.handleChange} 
                                   placeholder="Music Tittle"/>
                </div>

                <div className="mt-5 grid grid-cols-1">
                     <label className="block text-sm font-medium leading-6 text-gray-700">Duration Minutes: *</label>
                     <InputText    id="durationMinutes" 
                                   value={formik.values.durationMinutes?.toString()} 
                                   onChange={formik.handleChange} 
                                   placeholder="Duration Minutes: " />
                </div>

                <div className="mt-5 grid grid-cols-1">
                     <label className="block text-sm font-medium leading-6 text-gray-700">Duration Seconds: *</label>
                     <InputText    id="durationSeconds" 
                                   value={formik.values.durationSeconds?.toString()} 
                                   onChange={formik.handleChange} 
                                   placeholder="Duration Seconds: " />
                </div>
                
                <div className="mt-5 grid grid-cols-1">
                     <label className="block text-sm font-medium leading-6 text-gray-700">Album Name: *</label>
                     <InputText    id="album" 
                                   value={formik.values.album} 
                                   onChange={formik.handleChange} 
                                   placeholder="Album Name:" />
                </div>
               
                <div className="mt-5 grid grid-cols-1">
                     <label className="block text-sm font-medium leading-6 text-gray-700">Tracking number: *</label>
                     <InputText    id="trackNumber" 
                                   type="number"
                                   value={formik.values.trackNumber?.toString()} 
                                   onChange={formik.handleChange} 
                                   placeholder="Tracking number:" />
                </div>
               
                   <div className="mt-6 flex items-center justify-end gab-x-6">
                        <Button style="bg-blue-500 hover: bg-blue-300" label="Save" type="submit"/>
                    <Link href="/music">
                        <Button style="bg-red-500 hover: bg-red-300" label="Cancel" type="button"/>
                    </Link>
                   </div>
               </form>
            </section>
        </Template>
    )
}