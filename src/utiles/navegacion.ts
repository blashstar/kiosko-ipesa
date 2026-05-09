import { useRouter } from 'vue-router';

export default function usarNavegacion() {
	const router = useRouter()  // Llamado desde setup → funciona

	function seccion(nombre: string) {
		router.push({ name: nombre })
	}

	const volver = () => {
		if (window.history.length > 1) {
			router.back();
		} else {
			router.push('/');
		}
	};

	return { seccion, volver }
}
