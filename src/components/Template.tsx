import {ToastContainer } from 'react-toastify'
import Link from 'next/link'
import React from 'react';


interface TemplateProps{
    children: React.ReactNode
    loading?: boolean;
}

export const Template: React.FC<TemplateProps> = ({ children, loading = false}: TemplateProps) =>{
    return (
        <>
          <Header/>
          <div className={`${loading ? 'animate-pulse' : ''} container mx-auto mt-8 px-4`}>
                    <RenderIf condition={loading}>
                        <div className="text-center">
                            <Loading />
                        </div>
                    </RenderIf>
                    { children }
                </div> 
          <Footer/>
          <ToastContainer position='top-right' 
                          autoClose={8000}
                          hideProgressBar={false}
                          draggable={false}
                          closeOnClick={true}
                          pauseOnHover={true}
                          
            />
        </>
    )
}

interface RenderIfProps{
    condition?: boolean;
    children: React.ReactNode;
}

export const RenderIf: React.FC<RenderIfProps> = ({condition = true, children}) => {

    if(condition){
        return children
    }

    return false;
}

const Loading: React.FC = () => {
    return (
        <div role="status">
            <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
        </div>
    )
}
const Header: React.FC = () =>{
    return (

        <header className="bg-indigo-950 text-white py-3">
            
           <div className="container mx-auto flex justify-between items-center px-4">

              <Link href="/home">
                 <h1 className="text-yellow font-bold">Music Listener App</h1>
               </Link>

                 <Link href="/music">

                    <h1 className="text-3x1 font-bold">Musics</h1>
                    <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 19C9 20.1046 7.65685 21 6 21C4.34315 21 3 20.1046 3 19C3 17.8954 4.34315 17 6 17C7.65685 17 9 17.8954 9 19ZM9 19V5L21 3V17M21 17C21 18.1046 19.6569 19 18 19C16.3431 19 15 18.1046 15 17C15 15.8954 16.3431 15 18 15C19.6569 15 21 15.8954 21 17ZM9 9L21 7" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>

                 </Link>

                 <Link href="/artist">
                     
                    <h1 className="text-3x1 font-bold">Artists</h1>
                    <svg fill="#000000" width="64px" height="64px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" d="M12.5449583,5.98310324 C12.1985417,6.57525241 12,7.26444026 12,8 C12,10.209139 13.790861,12 16,12 C16.7422712,12 17.4373203,11.7978187 18.0330812,11.4455225 C16.8338903,10.8860487 15.5806753,9.99488884 14.7928932,9.20710678 C13.9948774,8.40909096 13.1016472,7.16707402 12.5449583,5.98310324 Z M14.0852562,4.48719414 C14.3877487,5.43112584 15.4281841,7.01397051 16.2071068,7.79289322 C16.9733039,8.55909037 18.5287892,9.57630173 19.5217245,9.89832493 C19.8268158,9.33351727 20,8.6869833 20,8 C20,5.790861 18.209139,4 16,4 C15.3063505,4 14.6539391,4.17656148 14.0852562,4.48719414 Z M13.8704322,13.6110971 C12.2697863,13.0032732 10.9967268,11.7302137 10.3889029,10.1295678 L4.29859663,18.8843831 L5.11561694,19.7014034 L13.8704322,13.6110971 Z M16.9127854,13.9310124 L4.88438306,22.2985966 L1.70140337,19.1156169 L10.0689876,7.08721464 C10.5086439,4.2067098 12.9966196,2 16,2 C19.3137085,2 22,4.6862915 22,8 C22,11.0033804 19.7932902,13.4913561 16.9127854,13.9310124 Z"></path> </g></svg>

                 </Link>

                 <Link href="/album">
                     
                    <h1 className="text-3x1 font-bold">Albums</h1>
                    <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 2.19995C19.5645 3.12649 23 7.162 23 11.9999C23 16.8378 19.5645 20.8733 15 21.7999" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M15 9C16.1411 9.28364 17 10.519 17 12C17 13.481 16.1411 14.7164 15 15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M1 2L11 2L11 22L1 22" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M4 15.5C4 16.3284 3.32843 17 2.5 17C1.67157 17 1 16.3284 1 15.5C1 14.6716 1.67157 14 2.5 14C3.32843 14 4 14.6716 4 15.5Z" fill="#000000"></path> <path d="M4 15.5C4 16.3284 3.32843 17 2.5 17C1.67157 17 1 16.3284 1 15.5C1 14.6716 1.67157 14 2.5 14C3.32843 14 4 14.6716 4 15.5ZM4 15.5V7.6C4 7.26863 4.26863 7 4.6 7H7" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>

                 </Link>
           </div>
        </header>
    )
}

const Footer: React.FC = () =>{
    return (
        <footer className="fixed bottom-0 w-full bg-indigo-950 text-white px-4 py-1">
                <div className="container mx-auto text-center">
                <p>&copy; 2024 Pedro Aluisio. Todos os direitos reservados.</p>
                </div>
        </footer>
    )
}