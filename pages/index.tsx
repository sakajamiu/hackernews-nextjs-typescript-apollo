import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import LinkList from '../components/LinkList'
import Layout from '.././components/Layout';
import { siteTitle } from '../components/Layout/Layout';
const Home: NextPage = () => {
  return (
    <Layout Children ={
      <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <LinkList/>
      
      </>

    }
    />
  )
}

export default Home
