import useSWR from "swr"

export default function getRestaurants() {
	const fetcher = (...args) => fetch(...args).then((response) => response.json())

	const { data, error } = useSWR(
		`${process.env.apiUrl}/api/restaurants`,
		fetcher, 
		{ revalidateOnFocus: false } //disable refresh when focus/mouse over
	)

	return {
		restaurants: data,
		isLoading: !error && !data,
		isError: error
	}
}