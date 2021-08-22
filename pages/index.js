import Head from 'next/head'
import Link from "next/link";
import Image from 'next/image'
import Title from "../components/Title";
import {getProducts} from "../lib/products";
import ProductCard from "../components/ProductCard";


export default function HomePage({products}) {
  return (
    <>
      <Head>
        <title>Next shop</title>
      </Head>
      <main className={'px-6 py-4'}>
       <Title>Next Shop</Title>
          <ul className={'grid grid-cols-1 lg:grid-cols-3 gap-4'}>
              {products.map((product) => {
                  return (
                      <li key={product.id}>
                          <ProductCard product={product}/>
                      </li>
                  )
              })}
          </ul>
      </main>
    </>
  )
}
export async function getStaticProps() {
    const products = await getProducts()
    return {
        props: {
            products
        },
        revalidate: 5 * 60
    }
}
