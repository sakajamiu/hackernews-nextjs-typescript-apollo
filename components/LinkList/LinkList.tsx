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
`;
const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    newVote {
      id
      link {
        id
        url
        description
        createdAt
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
      user {
        id
      }
    }
  }
`;
const NEW_LINKS_SUBSCRIPTION = gql`
subscription {
  newLink {
    id
    url
    description
    createdAt
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
`;
interface Feed {
    newLink: any;
    feed:{
        __typename: any,
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
    const{ 
         data,
        loading,
        error,
        subscribeToMore }= useQuery<Feed>(FEED_QUERY)
        subscribeToMore({
            document: NEW_LINKS_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const newLink = subscriptionData.data.newLink;
              const exists = prev.feed.links.find(
                ({ id }) => id === newLink.id
              );
              if (exists) return prev;
          
              return Object.assign({}, prev, {
                feed: {
                  links: [newLink, ...prev.feed.links],
                  count: prev.feed.links.length + 1,
                  __typename: prev.feed.__typename
                }
              });
            }
          });
          subscribeToMore({
            document: NEW_VOTES_SUBSCRIPTION
          });
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