import * as Yup from 'yup'

export interface FormAlbumProps {
    title: string;
    releaseYear: number;
    coverImage: string;
    artist: string;
}

export const formScheme: FormAlbumProps = { title: '', releaseYear: 0, coverImage: '', artist: '' }

//validar campos
export const formValidationScheme = Yup.object().shape({
    title: Yup.string()
             .trim()
             .required('Title is required')
             .max(50, 'TItle has the limit of 50 characteres!')

    ,coverImage: Yup.mixed<Blob>()
             .required('Select an image to upload')
            .test('size', 'File size cannot be higher than 4 MB', (file) => {
                return file.size < 4000000;
            })

})