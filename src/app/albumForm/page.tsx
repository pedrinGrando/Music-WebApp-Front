'use client'

import { Template } from "@/components"
import { Button, InputText, RenderIf, useNotification, FieldError } from "@/components"
import { useAlbumService } from '@/resources/album/album.service'
import { useFormik } from "formik"
import { FormAlbumProps, formScheme, formValidationScheme } from './formScheme'
import { useState } from "react"
import Link from "next/link"

export default function FormularioPage(){

      const [loading, setLoading]  = useState<boolean>(false)
      const [imagePreview, setImagePreview] = useState<string>();
      const service = useAlbumService();
      const notification = useNotification();

       const formik = useFormik<FormAlbumProps>({
          initialValues: formScheme,
          onSubmit: handleSubmit,
          validationSchema: formValidationScheme
       })

     async function handleSubmit(dados: FormAlbumProps){
         setLoading(true)

          const formData = new FormData();
          formData.append("title", dados.title)
          formData.append("releaseYear", dados.releaseYear.toString());
          formData.append("coverImage", dados.coverImage)
          formData.append("artist", dados.artist)

          await service.salvar(formData)

          formik.resetForm();
        
          setImagePreview('')

          setLoading(false)

          notification.notify('Album Saved', 'success' )
     }

    function onFileUpload(event: React.ChangeEvent<HTMLInputElement>){
        
         if (event.target.files){  
          const file = event.target.files[0]
          formik.setFieldValue("coverImage", file)
          const imageURL = URL.createObjectURL(file)
          setImagePreview(imageURL)
        }
    }

    return (
      <Template loading={loading}>
           <section className="flex flex-col items-center justify-center my-5">
            <h5 className="mt-3 mb-10 text-3x1 font-extrabold tracking-tight text-gray-900">New Album</h5>
              <form onSubmit={formik.handleSubmit}>

                <div className="grid grid-cols-1">
                     <label className="block text-sm font-medium leading-6 text-gray-700">Album Title: *</label>
                     <InputText    id="title" 
                                   value={formik.values.title} 
                                   onChange={formik.handleChange} 
                                   placeholder="Album Title"/>
                              
                </div>

                <div className="mt-5 grid grid-cols-1">
                     <label className="block text-sm font-medium leading-6 text-gray-700">Release Year: *</label>
                     <InputText    id="releaseYear" 
                                   type="number"
                                   onChange={formik.handleChange} 
                                   placeholder="Release Year " />
                </div>

                <div className="mt-5 grid grid-cols-1">
                     <label className="block text-sm font-medium leading-6 text-gray-700">Artist Name: *</label>
                     <InputText    id="artist" 
                                   value={formik.values.artist} 
                                   onChange={formik.handleChange} 
                                   placeholder="Artist Name " />
                </div>

                <div className="mt-5 grid grid-cols-1 ">
                     <label className="block text-sm font-medium leading-6 text-gray-700">Cover Image: *</label>
                     <div className="mt-2 flex justify-center rounded-lg border-dashed border-gray-900/25 px6">
                           <div className="text-center">

                         <RenderIf condition={!imagePreview}>
                                <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                     <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                </svg>
                          </RenderIf>
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                     <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo">
                                   <RenderIf condition={!imagePreview}>
                                        <span>Click to upload</span>
                                   </RenderIf>

                                   <RenderIf condition={!!imagePreview}>
                                           <img src={imagePreview} width={250} className="rounded-md" />
                                   </RenderIf>
                                        <input onChange={onFileUpload} id="coverImage" type="file" className="sr-only"/>
                                     </label>
                                </div>
                        </div>
                       </div>

                    </div>
                   <div className="mt-6 flex items-center justify-center gab-x-3">
                        <Button style="bg-blue-500 hover: bg-blue-300" label="Save" type="submit"/>
                    <Link href="/album">
                        <Button style="bg-red-500 hover: bg-red-300" label="Cancel" type="button"/>
                    </Link>
                   </div>
               </form>
            </section>
        </Template>
    )
}