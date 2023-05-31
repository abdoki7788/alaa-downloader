document.addEventListener('alpine:init', () => {
    Alpine.data('main', () => ({
        link: "",
        reso: "480",
        results: false,
        fetching: false,
        fetchingText: "در حال دریافت اطلاعات دوره",
        fetchError: false,
        fetchErrorMessage: "مشکلی پیش آمده ِ. لینک دیگری را امتحان کنید",
        fetchErrorTitle: "مشکلی هست!",
        episodes: [],
        coursePage: "",
        courseDetail: {},
        async fetchEpisodes() {
            this.courseDetail.forEach(async value => {
                let myValue = {...value}
                let episodeUrl = myValue.url
                await fetch(episodeUrl, {
                    responseType: 'html/text'
                }).then(async response => {
                    if (response.status == 200) {
                        let episode = await response.text()
                        console.log(myValue.position)
                        this.fetchingText = `در حال واکشی قسمت ها : قسمت ${myValue.position}`
                    }
                })
            })
        },
        async getEpisodes(courseHTML) {
            var doc = new DOMParser().parseFromString(courseHTML, "text/html");
            this.courseDetail = JSON.parse(doc.querySelectorAll('script[type="application/ld+json"]')[1].innerHTML).itemListElement
            await this.fetchEpisodes()
        },
        async fetchCourse() {
            this.episodes = []
            this.fetching = true
            await fetch(this.link, {
                responseType: 'html/text'
            }).then(async response => {
                if (response.status == 200) {
                    let body = await response.text()
                    this.coursePage = body
                    await this.getEpisodes(this.coursePage)
                    this.fetching = false
                } else if (response.status == 404) {
                    this.fetchErrorMessage = 'لینک وارد شده وجود ندارد لطفا دوباره امتحان کنید'
                    this.fetchErrorTitle = 'لینک اشتباه'
                    this.fetchError = true
                }
            })
        }
    }))
})