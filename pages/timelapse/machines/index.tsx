
import type {GetServerSideProps, NextPage} from 'next'

const Machines:NextPage = () => {
    return (
        <>
            <h1>DDD</h1>
        </>
    );
}

export const getServerSideProps:GetServerSideProps = async  (context) =>{
    console.log(context.query);

    return {
            props:{

            }
    };
}

export default Machines;