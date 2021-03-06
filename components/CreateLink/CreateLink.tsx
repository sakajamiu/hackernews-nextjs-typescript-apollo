import React, { useState } from 'react';
import { FEED_QUERY } from '../LinkList/LinkList';
import { useRouter } from 'next/router';


import { useMutation, gql } from '@apollo/client';

const CREATE_LINK_MUTATION = gql`
  mutation PostMutation(
    $description: String!
    $url: String!
  ) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;
interface Post{
 id: String | any;
 createdAt: Date;
 url: String;
 description: String;
};
interface Data{
    description: String;
    url: String
}
export  const CreateLink = () => {
  const [formState, setFormState] = useState({
    description: '',
    url: ''
  });
  const router = useRouter()
  const [createLink] = useMutation<Post, Data>(CREATE_LINK_MUTATION, {
    variables: {
      description: formState.description,
      url: formState.url
    },
    update: (cache, { data: { post } }:any) => {
      const data:any = cache.readQuery({
        query: FEED_QUERY,
      });

      cache.writeQuery({
        query: FEED_QUERY,
        data: {
          feed: {
            links: [post, ...data.feed.links]
          }
        },
      });
    },
    onCompleted: () => router.push("/")
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(formState)
          createLink();
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.description}
            onChange={(e) =>
              setFormState({
                ...formState,
                description: e.target.value
              })
            }
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={formState.url}
            onChange={(e) =>
              setFormState({
                ...formState,
                url: e.target.value
              })
            }
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};