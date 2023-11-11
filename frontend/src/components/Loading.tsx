import { BounceLoader } from 'react-spinners'
type Props = {}

const Loading = (props: Props) => {
    return (
        <div className='flex items-center justify-center h-screen'>
            <BounceLoader color='#5E0000' speedMultiplier={2} />
        </div>
    )
}

export default Loading