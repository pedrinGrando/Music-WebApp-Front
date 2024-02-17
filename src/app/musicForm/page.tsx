'use client'

import { Template } from "@/components"
import { Button, InputText, RenderIf, useNotification, FieldError } from "@/components"
import { useAlbumService } from '@/resources/album/album.service'
import { useFormik } from "formik"
import { FormProps, formScheme, formValidationScheme } from './formScheme'
import { useState } from "react"
import Link from "next/link"

export default function FormularioPage(){

      const [loading, setLoading]  = useState<boolean>(false)
      const [imagePreview, setImagePreview] = useState<string>();
      const service = useAlbumService();
      const notification = useNotification();

       const formik = useFormik<FormProps>({
          initialValues: formScheme,
          onSubmit: handleSubmit,
          validationSchema: formValidationScheme
       })

     async function handleSubmit(dados: FormProps){
         setLoading(true)

          const formData = new FormData();
          formData.append("file", dados.file)
          formData.append("name", dados.name)
          formData.append("tags", dados.tags)

          await service.salvar(formData)

          formik.resetForm();
        
          setImagePreview('')

          setLoading(false)

          notification.notify('Upload sent successfully', 'success' )
     }

    function onFileUpload(event: React.ChangeEvent<HTMLInputElement>){
        
         if (event.target.files){  
          const file = event.target.files[0]
          formik.setFieldValue("file", file)
          const imageURL = URL.createObjectURL(file)
          setImagePreview(imageURL)
        }
    }

    return (
      <Template loading={loading}>
           <section className="flex flex-col items-center justify-center my-5">
            <h5 className="mt-3 mb-10 text-3x1 font-extrabold tracking-tight text-gray-900">New Music</h5>
              <form onSubmit={formik.handleSubmit}>

                <div className="grid grid-cols-1">
                     <label className="block text-sm font-medium leading-6 text-gray-700">Tittle: *</label>
                     <InputText    id="name" 
                                   value={formik.values.name} 
                                   onChange={formik.handleChange} 
                                   placeholder="Music Tittle"/>
                              <FieldError error={formik.errors.name}  />
                </div>

                <div className="mt-5 grid grid-cols-1">
                     <label className="block text-sm font-medium leading-6 text-gray-700">Duration Minutes: *</label>
                     <InputText    id="tags" 
                                   value={formik.values.tags} 
                                   onChange={formik.handleChange} 
                                   placeholder="Duration Minutes: " />
                </div>

                <div className="mt-5 grid grid-cols-1">
                     <label className="block text-sm font-medium leading-6 text-gray-700">Duration Seconds: *</label>
                     <InputText    id="tags" 
                                   value={formik.values.tags} 
                                   onChange={formik.handleChange} 
                                   placeholder="Duration Seconds: " />
                </div>
                
                <div className="mt-5 grid grid-cols-1">
                     <label className="block text-sm font-medium leading-6 text-gray-700">Album Name: *</label>
                     <InputText    id="tags" 
                                   value={formik.values.tags} 
                                   onChange={formik.handleChange} 
                                   placeholder="Album Name:" />
                </div>
               
                <div className="mt-5 grid grid-cols-1">
                     <label className="block text-sm font-medium leading-6 text-gray-700">Tracking number: *</label>
                     <InputText    id="tags" 
                                   value={formik.values.tags} 
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