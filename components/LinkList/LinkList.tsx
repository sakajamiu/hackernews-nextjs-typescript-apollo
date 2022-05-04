import Link from '../Link'
import { useQuery, gql } from '@apollo/client'


const FEED_QUERY = gql`
  {
    feed {
      id
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`
interface Feed {
    feed:{
        id : String;
        links: Array<{
            id: String | any;
            createdAt: String;
            url:String;
            description: String;
        }>;
    };
}

export const LinkList = () => {
    const   {loading, data}= useQuery<Feed>(FEED_QUERY)
    if(loading){
        console.log(loading)
        return <div>loading...</div>
    }

    return(
        <div>
            {data &&(
                <>{
                    
                    data.feed.links.map(link => (                      
                        <Link key={link.id} description={link.description} url={link.url}/>
                        
                        
                    ))
                }
                </>
            )
            }
        </div>

    )
}