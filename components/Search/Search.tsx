import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import Link from '../Link';

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      id
      links {
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
  }
`;
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
 export const Search = () => {
  const [searchFilter, setSearchFilter] = useState('');
  const [executeSearch, { data }] = useLazyQuery<Feed>(
    FEED_SEARCH_QUERY
  );
  return (
    <>
      <div>
        Search
        <input
          type="text"
          onChange={(e) => setSearchFilter(e.target.value)}
        
        />
        <button
          onClick={() =>
            executeSearch({
              variables: { filter: searchFilter }
            })
        }> OK </button>
      </div>
      {data &&
        data.feed.links.map((link, index) => (
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
        ))}
    </>
  );   
};