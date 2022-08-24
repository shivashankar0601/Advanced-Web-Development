import "./alert.css";
import Swal from "sweetalert2";

async function Alert({ icon_name, message, time }) {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-right",
        iconColor: "white",
        customClass: {
            popup: "colored-toast",
        },
        showConfirmButton: false,
        timer: time,
        timerProgressBar: true,
    });
    return (
        <div>
            {await Toast.fire({
                icon: icon_name,
                title: message,
            })}
        </div>
    );
}

export default Alert;
