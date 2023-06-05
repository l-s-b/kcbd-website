import useImage from '../comps/useImage'

export default function Image({ fileName, alt, className, id, ...rest }) {
    const { loading, error, image } = useImage(fileName)

    if (error) return <span>{alt}</span>
    return (
        <>
            {loading ? ("") : (
                <img
                    className={`Image${
                        className
                            ? className.padStart(className.length + 1)
                            : ''
                    }`}
                    width="100%" /* To make it fit the swiper */
                    src={image}
                    alt={alt}
                    {...rest}
                />
            )}
        </>
    )
}
