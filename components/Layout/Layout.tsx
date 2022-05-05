import Head from 'next/head';
import Image from 'next/image';
import styles from './index.module.css';
import Link from 'next/link';
export const siteTitle = 'Hacker News';
export  function Layout({ Children} :{Children:JSX.Element}) {
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
        <header className={styles.header}>
         <Link href="/"><a>Hacker news</a></Link>
         <Link href="/Create"><a>New</a></Link>
        </header>
        <main>{Children}</main>
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