import { Suspense } from "react";
import Layout from '../components/Layout.server';
import FeaturedCollections from '../components/FeaturedCollections.server';

export default function Home() {
  return (	
    <Layout>
      <section className="p-6 md:p-8 lg:p-12 bg-gradient-to-tr bg-indigo-800 text-white">
          <h1 className="font-extrabold mb-4 text-5xl md:text-7xl">Hello world!</h1>
          <p className="font-bold mb-3">Welcome to Hydrogen.</p>
          <p>
            Hydrogen is a front-end web development framework used for building
            Shopify custom storefronts.
          </p>
      </section>
      <Suspense>
        <FeaturedCollections />
      </Suspense>
    </Layout>
  )
}
