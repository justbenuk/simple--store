import { FaStar, FaRegStar } from "react-icons/fa";

export default function Rating({rating}: {rating: number}){

    const stars = Array.from({length: 5}, (_, i) => + 1 <= rating)

return (
    <div className="flex items-center gap-x-1">
{stars.map((isFilled, i) => {
    const className = `w-3 h-3 ${isFilled ? 'text-primary' : 'text-gray-400'}`
    return isFilled ? (
        <FaStar className={className} key={1}/>
    ) : (
        <FaRegStar className={className} key={1} />
    )
}
)}
    </div>
)
}