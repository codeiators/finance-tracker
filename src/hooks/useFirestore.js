import {useReducer, useEffect, useState} from 'react'
import { projectFirestore, timestamp } from '../firebase/config'

let initialState = {

    document: null,
    isPending:false,
    error:null,
    success:null

}

const fireStoreReducer = (state, action) => {

    switch(action.type) {

        case 'IS_PENDING':
            return { isPending: true, document:null, success:false, error:null }
        case 'ADDED_DOCUMENT':
            return {isPending: false, success: true, document:action.payload, error:null}   
        case 'ERROR':
            return {isPending: false, success: false, document:null, error:action.payload}  

        default:
            return state

    }

}

export const useFirestore = (collection) => {


    const [isCanceeled, setIsCancelled] = useState(false)
    const [response, dispatch] = useReducer(fireStoreReducer, initialState)

    const ref = projectFirestore.collection(collection)


    const dispatchIfNotCancelled = (action) => {

        if(!isCanceeled) {
            dispatch(action)
        }

    }

    const addDocument = async (doc) => {

        dispatch({type:'IS_PENDING'})

        try {
            const createdAt = timestamp.fromDate(new Date())
            const addedDocument = await ref.add({...doc, createdAt})

            dispatchIfNotCancelled({type:'ADDED_DOCUMENT', payload: addedDocument})

        } catch(err) {

            dispatchIfNotCancelled({type:'ERROR', payload: err.message})

        }

    }

    const deleteDocument = (id) => {

    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return {addDocument, deleteDocument, response}

}