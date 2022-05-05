import React,{useEffect, useState} from 'react'
import Head from 'next/head';
import Image from 'next/image';
import styles from './index.module.css';
import Link from 'next/link';
import { AUTH_TOKEN } from '../../constraint';
export const siteTitle = 'Hacker News';
export  function Layout({ Children} :{Children:JSX.Element}) {
  const [authToken, setAuthToken] = useState<String|any>('')
useEffect(() =>{
  if(typeof window !=='undefined'){
     setAuthToken(window.localStorage.getItem(AUTH_TOKEN))
    console.log(authToken)
  }
},[authToken])
   
 
    return (
      <div className={styles.container}>
      
        <Head>
          <link rel="icon" href="/favicon.ico" />
          
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />
                  <link
           rel="stylesheet"
           href="https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css"
        />
        <meta name="og:title" content={siteTitle} />
        </Head>
        <header className="flex pa1 justify-between nowrap orange">
         <Link href="/"><a className="ml1 no-underline black">Hacker news</a></Link>
         <Link href="/Search"><a className="ml1 no-underline black">Search</a></Link>
         {
             authToken&&(
                <Link href="/Create"><a className="ml1 no-underline black">submit</a></Link>
             )
         } {authToken ? (
          <Link href="/">
            <a onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);}}
              className="ml1 no-underline black"
            > 
               logout
            </a>
          
          </Link>
        ) : (
          <Link
            href="/Login"><a className="ml1 no-underline black">login</a>
            
          </Link>
        )}
        </header>
        <main className="ph3 pv1 background-gray">{Children}</main>
        <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
  
      </div>
    );
  }