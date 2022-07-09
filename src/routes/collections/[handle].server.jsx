import { useRouteParams,gql, useShopQuery, CacheLong, Seo,
  useServerAnalytics,	ShopifyAnalyticsConstants,} from "@shopify/hydrogen";
import { Suspense } from "react";
import { Layout } from "../../components/Layout.server";
import ProductCard from "../../components/ProductCard.server";


const COLLECTION_QUERY = gql`
  query CollectionDetails($handle: String!) {
    collection(handle: $handle) {
      title
      description
      seo {
        description
        title
      }
      image {
        id
        url
        width
        height
        altText
      }
      products(first: 8) {
        nodes {
          id
          title
          publishedAt
          handle
          variants(first: 1) {
            nodes {
              id
              image {
                url
                altText
                width
                height
              }
              priceV2 {
                amount
                currencyCode
              }
              compareAtPriceV2 {
                amount
                currencyCode
              }
            }
          }
        }
    }
  }
  }
`;


export default function Collection() {
    const { handle } = useRouteParams();
    const result = useShopQuery({
        query: COLLECTION_QUERY,
        cache: CacheLong(),
        variables: {
            handle
        }
    })

    console.log(result.data.collection.seo);

    useServerAnalytics({
        shopify: {
        pageType: ShopifyAnalyticsConstants.pageType.collection,
        resourceId: result.data.collection.id,
        },
    });
   
    return (
    <Layout>
      <Suspense>
        <Seo type="collection" data={result.data.collection} />
      </Suspense>
     	<header className="grid w-full gap-8 p-4 py-8 md:p-8 lg:p-12 justify-items-start">
        <h1 className="text-4xl whitespace-pre-wrap font-bold inline-block text-indigo-700">
          {result.data.collection.title}
        </h1>

        {result.data.collection.description && (
          <div className="flex items-baseline justify-between w-full">
            <div>
              <p className="max-w-md whitespace-pre-wrap inherit text-copy inline-block">
                {result.data.collection.description}
              </p>
            </div>
          </div>
        )}
      </header>
      	<section className="w-full gap-4 md:gap-8 grid p-6 md:p-8 lg:p-12">
        <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {result.data.collection.products.nodes.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </Layout>
  
  );
}
