import Layout from "../../components/Layout"
import Login from "../../components/Login"

export const SignIn = () =>{
    return(
        <Layout Children={
            <>
            <Login/>
            </>
        }/>
    )
}