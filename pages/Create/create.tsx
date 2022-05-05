import Head from "next/head";
import CreateLink from "../../components/CreateLink";
import Layout from "../../components/Layout";

export const Create = () => {
    return(
        <Layout Children={
            <>
            <Head><title>Create New Link</title></Head>
            <p>create your link below</p>
            <CreateLink/>
            </>
        }/>
    )
}