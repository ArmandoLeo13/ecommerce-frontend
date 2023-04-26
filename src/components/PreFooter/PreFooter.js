import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import ChatPopup from '../ChatPopup/ChatPopup';

const PreFooter = () =>{

    const { isAuthenticated } = useContext(UserContext);

    if(!isAuthenticated){
        return null
    }

    return(
        <div className="PreFooter">
            <ChatPopup />
        </div>
    )
};

export default PreFooter;


