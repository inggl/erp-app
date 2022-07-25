import {NextPage} from "next";
import React from "react";
import {useDispatch} from "react-redux";
import {dashboardConnect} from "../../store/actions/dashboardActions";

const Dashboard: NextPage = () => {
    const executedRef = React.useRef(false);

    const dispatch = useDispatch();

    React.useEffect(() => {
        if (executedRef.current) {
            return;
        }

        dispatch(dashboardConnect());

        executedRef.current = true;
    }, []);

    return (
        <>

        </>
    );
}

export default Dashboard;