import Link from '../Link'
import { useQuery, gql } from '@apollo/client'


export const FEED_QUERY = gql`
  {
     feed {
        id
        links {
        id
        createdAt
        url
        description
        postedBy {
            id
            name
        }
        votes {
            id
            user {
            id
            }
        }
        }
    }
      
  }
`
interface Feed {
    feed:{
        id : String;
        links: Array<{
            id: String | any;
            createdAt: Date;
            url:String;
            description: String;
            postedBy: Array<{
                id: String| any;
                name: String
            }>
            votes: Array<{
                id: String| any;
                user: Array<{
                    id: String| any
                }>
            }>
        }>;
    };
}

export const LinkList = () => {
    const   {loading, data}= useQuery<Feed>(FEED_QUERY)
    if(loading){
        return <div>loading...</div>
    }

    return(
        <div>
            {data &&(
                <>{
                    
                    data.feed.links.map((link,index) => (                      
                        <Link 
                            key={link.id}
                            description={link.description}
                            url={link.url} 
                            index={index}
                            postedBy ={link.postedBy}
                            createdAt={link.createdAt}
                            votes={link.votes}
                            id ={link.id}
                            />
                        
                        
                    ))
                }
                </>
            )
            }
        </div>

    )
}