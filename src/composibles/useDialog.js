import {ref} from "vue";

const visible = ref(false);
const component = ref();
const dialogOptions = ref({});

let resolveDialog = null;

export function useDialog() {
    function open(customComponent, currentOption = {}) {
        visible.value = true;
        component.value = customComponent;
        dialogOptions.value = currentOption;

        return new Promise((resolve) => {
            resolveDialog = resolve
        })
    }

    function close(data = null) {
        visible.value = false;

        if (resolveDialog) {
            resolveDialog(data);
            resolveDialog = null;
        }
    }

    return {
        open,
        close,
        visible,
        component,
        dialogOptions
    };
}