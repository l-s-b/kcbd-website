import useImage from '../comps/useImage'

export default function Image({ fileName, alt, className, id, ...rest }) {
    const { loading, error, image } = useImage(fileName)

    if (error) return <span>{alt}</span>

    return (
        <>
            {loading ? (
                <span>Cargando . . .</span>
            ) : (
                <img
                    className={`Image${
                        className
                            ? className.padStart(className.length + 1)
                            : ''
                    }`}
                    src={image}
                    alt={alt}
                    {...rest}
                />
            )}
        </>
    )
}
