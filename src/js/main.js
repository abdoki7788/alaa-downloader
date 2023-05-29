document.addEventListener('alpine:init', () => {
    Alpine.data('main', () => ({
        link: "",
        reso: "480",
        results: false,
        fetching: false,
        fetchError: false,
        fetchErrorMessage: "مشکلی پیش آمده ِ. لینک دیگری را امتحان کنید",
        fetchErrorTitle: "مشکلی هست!",
        fetchCourse() {
            this.fetching = true
            axios.get(this.link).then(response => {
                this.fetching = false
            }).catch(error => {
                this.fetching = false
                if(error.response.status == 404) {
                    this.fetchErrorMessage = "لینک مورد نظر پیدا نشد ِ. لینک دیگری را امتحان کنید"
                    this.fetchErrorTitle = "لینک اشتباه"
                }
                this.fetchError = true
            })
        }
    }))
})