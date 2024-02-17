import * as Yup from 'yup'

export interface FormProps {
    title: string;
    releaseYear: number;
    coverImage: string;
    artist: string;
}

export const formScheme: FormProps = { title: '', releaseYear: 0, coverImage: '', artist: '' }

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
            .test('type', 'Accepted formats: jpeg, giff or png', (file) => {
                return file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
            })

})