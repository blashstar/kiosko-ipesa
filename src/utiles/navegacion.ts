import { useRouter } from 'vue-router';

export default function usarNavegacion() {
	const router = useRouter()  // Llamado desde setup → funciona

	function seccion(nombre: string) {
		router.push({ name: nombre })
	}

	return { seccion }
}
