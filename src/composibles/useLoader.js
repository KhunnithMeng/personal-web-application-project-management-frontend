import {ref} from "vue";

const loader = ref(false);

export function useLoader() {


    const openLoader = () => loader.value = true;
    const closeLoader = () => loader.value = false;

    return { loader, openLoader, closeLoader }
}