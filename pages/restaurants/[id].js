import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event'
import DetailsRestaurant from '../../components/DetailsRestaurant'

export default function Restaurant({restaurant, isError = false}) {
 return <DetailsRestaurant restaurant={restaurant} isError={isError} />
}

export async function getServerSideProps(context) { //using SSR render
  const { id } = context.query

  try {
    const response = await fetch(`${process.env.apiUrl}/api/restaurants/${id}`)
    const restaurant = await response.json()
    const isError =  response.ok ? false : true

    return { props: { restaurant, isError: isError } }
  } catch (error) {
    return { props: { isError: true } }
  }
}