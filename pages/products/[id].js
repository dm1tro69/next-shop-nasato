import React from 'react';
import Title from "../../components/Title";
import Head from "next/head";
import Image from "next/image";
import {getProduct, getProducts} from "../../lib/products";
import {ApiError} from "../../lib/api";

const ProductPage = ({product}) => {


    return (
        <>
            <Head>
                <title>Product Page</title>

            </Head>
        <main>
            <Title>Product Page</Title>
            <h1>{product.title}</h1>
            <div className={'flex flex-col lg:flex-row'}>
                <div className={''}>
                    <Image src={product.pictureUrl} height={480} width={640}/>
                </div>

                <div className={'flex-1 lg:ml-4'}>
                    <p>{product.description}</p>
                    <p className={'text-lg font-bold mt-2'}>{product.price}</p>
                </div>
            </div>
        </main>
        </>
    );
};

export default ProductPage;

export async function getStaticPaths(){
    const products = await getProducts()
    return {
        paths: products.map(product => ({
            params: {
                id: product.id.toString()
            }
        })),
        fallback: 'blocking'
    }
}

export async function getStaticProps({params}){

   try {
       const product = await getProduct(params.id)
       return {
           props: {product},
           revalidate: 5 * 60
       }
   }catch (e) {

       if (e instanceof ApiError && e.status === 404){
           return {notFound: true}
       }
       throw e
   }
}
