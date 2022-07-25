import React from "react";
import {NextPage} from "next";
import { useRouter } from "next/router";
import {FormattedMessage, useIntl} from "react-intl";
import {Button, Paper, Tooltip} from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const ProductDetail: NextPage = () => {
    const router = useRouter();
    const {id} = router.query;

    return (
        <>
            <Paper sx={{my: 1, p: 1}}>
                <Button onClick={() => router.back()} startIcon={<KeyboardBackspaceIcon/>}>
                    <FormattedMessage id={"back"}/>
                </Button>
            </Paper>

            Product detail {id}
        </>
    );
}

export default ProductDetail;