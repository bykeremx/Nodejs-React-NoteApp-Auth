import NoteContext from '../context/NoteContext';
import { useContext, useState } from 'react';  
import {toast,Bounce } from 'react-toastify'


const useNote = () => {

    //useContext ile verileri bir çek 

    const { state, dispatch } = useContext(NoteContext);
    const [loading, setLoading] = useState(null);

    const user = JSON.parse(localStorage.getItem('user'));
    
    if(!user.token) {
        toast.error('Token yok, giriş yapın', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: Bounce.default
        });
        return;
    }


    //function is a alldata fetch

    const getNotes = async () => {
        // console.log(state,dispatch);
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/not/',{
                headers: {
                    'Authorization':`Bearer ${user.token}`,
                },
            });
            if (!response.ok) {

                throw new Error('Failed to fetch data');

            }
            const data = await response.json();
            console.log(data);
            dispatch({
                type: 'GET_NOTES',
                payload: data.notes,
            });
            setLoading(false);
            
        } catch (error) {
            console.log(error);

        }
    }
    //delete note 
    const deleteNote = async (id) => {
        const url = `http://localhost:8080/api/not/${id}`;
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete note');
            }
    
            dispatch({
                type: 'DELETE_NOTE',
                payload: id,
            });
            console.log(`${id} deleted`);
            toast('🦄 Not Silindi!', {
                position: "top-center",
                autoClose: 5000,
                theme: "dark",
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    //add note 
    const addNote = async (title, content) => {
        try {
            const response = await fetch('http://localhost:8080/api/not', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${user.token}`,
                },
                body: JSON.stringify({ title, content }),
            });
            if (!response.ok) {
                throw new Error('Failed to add note');
            }
            const data = await response.json();
            dispatch({
                type: 'ADD_NOTE',
                payload: data.note,
            });
            toast('🦄 Eklendi !', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            await getNotes();
        } catch (error) {
            console.log(error);

        }
    }


    return {
        Notes: state.notes,
        getNotes,
        Loading: loading,
        deleteNote,
        addNote
    }





}

export default useNote
