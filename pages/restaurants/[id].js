import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event'
import DetailsRestaurant from '../../components/DetailsRestaurant'

export default function Restaurant({ restaurant }) {
  return <DetailsRestaurant restaurant={restaurant} />
}

// export async function getServerSideProps(context) { //using SSR render
//   const { id } = context.query

//   try {
//     const response = await fetch(`${process.env.apiUrl}/api/restaurants/${id}`)
//     const restaurant = await response.json()
//     const isError =  response.ok ? false : true

//     return { props: { restaurant, isError: isError } }
//   } catch (error) {
//     return { props: { isError: true } }
//   }
// }


export async function getStaticPaths() {
  const res = await fetch(`${process.env.apiUrl}/api/restaurants`);
  const restaurants = await res.json();

  const paths = restaurants.map((restaurant) => ({
    params: { id: restaurant.id.toString() }
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${process.env.apiUrl}/api/restaurants/${params.id}`);
  const restaurant = await res.json();
  return {
    props: { restaurant },
    revalidate: 120
  }
}