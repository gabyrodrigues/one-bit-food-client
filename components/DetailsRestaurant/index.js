import CategoryProducts from './CategoryProducts'
import Details from './Details'
import { Alert } from 'react-bootstrap'

export default function DetailsRestaurant(props) {
  if(props.isError) {
    return <Alert variant='custom-red'>Erro ao carregar</Alert>
  }

  return (
    <>
      <Details {...props.restaurant} />

      {props.restaurant.product_categories.map((product_category, i) => (
        <CategoryProducts restaurant={props.restaurant} {...product_category} key={i} />
      ))}
    </>
  )
}