import {reactive} from "vue";

const message = reactive({
    isShow: false,
    text: '',
    color: ''
});

export function useMessage() {

    const showMessage = (text = '', color = 'success') => {
        message.isShow = true;
        message.text = text;
        message.color = color
    }

    const closeMessage = () => {
        message.isShow = false;
        message.text = '';
        message.color = '';
    }

    return { message, showMessage, closeMessage }
}