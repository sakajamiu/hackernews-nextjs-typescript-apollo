import React,{useEffect, useState} from 'react'
import { AUTH_TOKEN } from '../../constraint'
import { timeDifferenceForDate } from '../../utilities'
import { useMutation, gql } from '@apollo/client'
import { FEED_QUERY } from '../LinkList/LinkList'
interface props {
    description : String,
    url: String,
    index: number,
    createdAt: Date
    postedBy: Array<{
        id: String| any;
        name: String;
    }>|any
    votes: Array<{
        id: String| any;
        user: Array<{
            id: String| any
        }>
    }>
    id: String| any
}
const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
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

 export const Link = ({description, url, createdAt, postedBy, index, votes,id}: props) =>{
    const [authToken, setAuthToken] = useState<String|any>('')
    useEffect(() =>{
      if(typeof window !=='undefined'){
         setAuthToken(window.localStorage.getItem(AUTH_TOKEN))
        console.log(authToken)
      }
    },[authToken]);
    const [vote] = useMutation(VOTE_MUTATION, {
        variables: {
          linkId: id
        },
        update: (cache, {data: {vote}}) => {
          const { feed } :any = cache.readQuery({
            query: FEED_QUERY
          });
    
          const updatedLinks = feed.links.map((feedLink: { id: any; votes: any }) => {
            if (feedLink.id === id) {
              return {
                ...feedLink,
                votes: [...feedLink.votes, vote]
              };
            }
            return feedLink;
          });
    
          cache.writeQuery({
            query: FEED_QUERY,
            data: {
              feed: {
                links: updatedLinks
              }
            }
          });
        }
    
    })
 return(
     <div>
        <div className="flex mt2 items-start">
            <div className="flex items-center">
                <span className="gray">{ index + 1}.</span>
                {authToken && (
                <div
                    className="ml1 gray f11"
                    style={{ cursor: 'pointer' }}
                    onClick={()=>{vote()}}
                >
                    ▲
                </div>
                )}
            </div>
            <div className="ml1">
                <div>
                    {description} ({url})
                </div>
                {(
                    <div className="f6 lh-copy gray">
                        {votes.length} votes | by{' '}
                        {postedBy? postedBy.name: 'unknown'}{' '}
                        {timeDifferenceForDate(createdAt)}
                    </div>
                )}
            </div>
        </div>
     </div>
 )
}

