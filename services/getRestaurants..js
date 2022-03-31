import useSWR from "swr"
import { useRouter } from "next/router"

export default function getRestaurants() {
	const router = useRouter()
	const { category, query } = router.query

	let params = ''
	if(category)
		params = `${params == '' ? '?' : '&'}category=${category}`

	if(query)
		params = `${params == '' ? '?' : '&'}query=${query}`

	const fetcher = (...args) => fetch(...args).then((response) => response.json())

	const { data, error } = useSWR(
		`${process.env.apiUrl}/api/restaurants${params}`,
		fetcher, 
		{ revalidateOnFocus: false } //disable refresh when focus/mouse over
	)

	return {
		restaurants: data,
		isLoading: !error && !data,
		isError: error
	}
}