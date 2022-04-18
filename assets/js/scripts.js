function error(text) {
    swal.fire({
        text: text,
        icon: "error",
        buttonsStyling: false,
        confirmButtonText: "بستن",
        customClass: {
            confirmButton: "btn font-weight-bold btn-light-primary"
        }
    }).then(function() {
        KTUtil.scrollTop();
    });
}