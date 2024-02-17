import * as Yup from 'yup'

export interface FormMusicProps {
    nameMusic?: string;
    durationMinutes?: number;
    durationSeconds?: number;
    album?: string;
    trackNumber?: number;
}

export const formScheme: FormMusicProps = { name: '', durationMinutes: 0, durationSeconds: 0, album: '',  trackNumber: 0}

//validar campos
export const formValidationScheme = Yup.object().shape({
    name: Yup.string()
             .trim()
             .required('Name is required')
             .max(50, 'Name has the limit of 50 characteres!')

})