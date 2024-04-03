import Swal, { SweetAlertOptions } from "sweetalert2"

class Alert {
    static popup(options?: SweetAlertOptions) {
        return Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer
                toast.onmouseleave = Swal.resumeTimer
            }
        }).fire(options || {})
    }

    static confirm(options?: SweetAlertOptions) {
        return Swal.mixin({
            title: "Anda yakin?",
            text: "Data tidak dapat dikembalikan setelah dihapus!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, hapus!"
        }).fire(options || {})
    }
}

export default Alert
