import { toast } from "react-toastify"

const ToastNotify = (message, position) =>{
    return toast.dark(message, {
        position: toast.POSITION[position],
        className: 'pc-toast',
        bodyClassName: 'pc-body-toast',
        progressClassName: 'pc-progressbar-toast',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false
    })
}

export default ToastNotify