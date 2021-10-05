import type {GetServerSideProps, NextPage} from 'next'
import {CHashids} from "../../../core/CHashids";
import axios from "axios";
import Head from 'next/head';
import ErrorPage from "next/error";

interface IData {
    items: any[],

}

const Machines: NextPage<{ data: IData }> = props => {
    if (!props.data) {
        return <ErrorPage statusCode={404}/>;
    }

    console.log(props.data);
    return (
        <>
            <Head>
                <title>{props.data.items[0]['name']}</title>
            </Head>
            <h1>Machines:{props.data.items[0]['name']}</h1>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    console.log(context.params);
    try {
        const dString: string = context.params!['id'] as string;
        const projectId = CHashids.decodeGetFirst(dString);
        console.log(projectId)
        const res = await axios.get(`https://api-app.autotimelapse.com/v4/timelapse/project/${projectId}/machines`, {
            headers: {
                'Authorization': 'Bearer zsrKCZ5SSfXmNpWUAcxEsaHDLSimSwwvL7j8DyUEtv6t8nOsOcz0KN41yEr0'
            }

        })

        const data: IData = res.data;

        return {
            props: {
                data,
            }
        };
    } catch (e) {
        context.res.statusCode = 404;
        return {
            props: {}
        }
    }


}

export default Machines;