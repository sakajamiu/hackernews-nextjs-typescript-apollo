interface props {
    description : String,
    url: String
}

 export const Link = ({description, url}: props) =>{
     console.log(description)
 return(
     <div>
         {description} {url}
     </div>
 )
}

