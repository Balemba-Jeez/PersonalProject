
export default function dateFormatter(date) {
    return (new Date(date).toLocaleDateString('en-CA'))
}