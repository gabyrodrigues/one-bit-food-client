import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import addressState from '../store/atoms/addressAtom'

export default function getRestaurants() {
	const router = useRouter()
	const { category, query } = router.query
	const [address] = useRecoilState(addressState)

	let params = ''
	if(category)
		params = `${params == '' ? '?' : '&'}category=${category}`

	if(query)
		params = `${params == '' ? '?' : '&'}query=${query}`

	if(address.city !== '')
		params = `${params == '' ? '?' : '&'}city=${address.city}`

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