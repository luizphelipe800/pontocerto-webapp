import { toast } from "react-toastify"

const ToastNotify = (message, position, status) =>{
    return toast.dark(message, {
        position: toast.POSITION[position],
        className: `toast-${status}`,
        bodyClassName: `body-${status}`,
        progressClassName: `progressbar-${status}`,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false
    })
}

export default ToastNotify