import useSWR from 'swr'

export default function getAvailableCities() {
  const fetcher = (...args) => fetch(...args).then((response) => response.json())

  const { data, error } = useSWR(
		`${process.env.apiUrl}/api/available_cities`,
		fetcher,
		{ revalidateOnFocus: false }
	)

	return {
		available_cities: data,
		isLoading: !error && !data,
		isError: error
	}
}