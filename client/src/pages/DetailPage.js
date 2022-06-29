import {useContext, useState, useCallback, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import { LinkCard } from '../components/LinkCard';
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/authContext';
import { useHttp } from '../hooks/http.hook';

export const DetailPage = () => {
    const { token } = useContext(AuthContext)
    const {request, loadind} = useHttp();
    const [link, setLink] = useState(null);
    const linkId = useParams().id;

    const getLink = useCallback(async ()=>{
        try{
         const fetched = await request(`/api/link/${linkId}`, 'GET', null, {Authorization: `Bearer ${token}`});
         setLink(fetched);
        }catch (e) {}
    },[token, linkId, request]);

    useEffect(()=>{
        getLink()
    }, [getLink]);

    if(loadind) {
        return <Loader />
    }

    return ( 
        <>
            {!loadind && link && <LinkCard link={link}/>}
        </>
    )
}