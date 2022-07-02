import { useEffect } from 'react';
import '../../css/Embed.component.scss'



const Embed = (props) =>{


    useEffect(()=>{
       
    },[props.params])

    return (    

        <div class="background-embed" style={{display:props.params.show ? 'flex':'none' }}>
            <div class="background" onClick={()=>{props.setEmbedState({show:false})}}></div>
            <iframe width="420" height="315"
            src={`https://www.youtube.com/embed/${props.params.key}?autoplay=1`}>
            </iframe>
        </div>

    );
}


export default Embed;