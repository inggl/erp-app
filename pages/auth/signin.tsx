import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {getProviders, signIn} from "next-auth/react"
import {ClientSafeProvider, LiteralUnion} from "next-auth/react/types";
import {BuiltInProviderType} from "next-auth/providers";
import {Box, Button, Paper} from "@mui/material";
import map from "lodash/map";

const SignIn = ({providers}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            <Paper>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {providers && map(providers, (provider) => (
                        <Box key={provider.name}>
                            <Button onClick={() => signIn(provider.id)}>
                                Sign in with {provider.name}
                            </Button>
                        </Box>
                    ))}
                </Box>
            </Paper>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null = await getProviders()
    return {
        props: {providers},
    }
}

export default SignIn;