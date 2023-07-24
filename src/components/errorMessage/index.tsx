export default function ErrorMessageDisplay({ message }: { message: string }) {
  return <p className="text-xs my-2 text-red-500">{message}</p>;
}
