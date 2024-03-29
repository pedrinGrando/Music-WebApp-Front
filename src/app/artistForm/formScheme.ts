import * as Yup from 'yup'

export interface FormArtistProps {
    name?: string;
    profileImage?: string;
}

export const formScheme: FormArtistProps = { name: '', profileImage: '' }

//validar campos
export const formValidationScheme = Yup.object().shape({
    name: Yup.string()
             .trim()
             .required('Name is required')
             .max(50, 'Name has the limit of 50 characteres!')

    ,file: Yup.mixed<Blob>()
             .required('Select an image to upload')
            .test('size', 'File size cannot be higher than 4 MB', (file) => {
                return file.size < 4000000;
            })
})