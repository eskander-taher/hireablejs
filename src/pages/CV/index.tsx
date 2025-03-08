import CVForm from "./CVForm";

export default function CV() {
	return (
		<div className="h-screen flex flex-col justify-center items-center p-5 bg-gray-100 dark:bg-gray-900 dark:text-white">
			<CVForm />
		</div>
	);
}
