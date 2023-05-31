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
        async getEpisodes(courseHTML) {
            var doc = new DOMParser().parseFromString(courseHTML, "text/html");
            courseDetail = JSON.parse(doc.querySelectorAll('script[type="application/ld+json"]')[1].innerHTML).itemListElement
            for (const value of courseDetail) {
                console.log(value)
                let episodeUrl = value.url;
                const response = await fetch(episodeUrl, {
                    responseType: 'html/text'
                });
                if (response.status == 200) {
                    let episode = await response.text();
                    console.log(value.position);
                    this.fetchingText = `در حال واکشی قسمت ها : قسمت ${value.position}.`;
                }
            }
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
                    this.fetchingText = "عملیات کامل شد!"
                    setInterval(() => {
                        console.log('h')
                        this.fetching = false
                    }, 2000)
                } else if (response.status == 404) {
                    this.fetchErrorMessage = 'لینک وارد شده وجود ندارد لطفا دوباره امتحان کنید'
                    this.fetchErrorTitle = 'لینک اشتباه'
                    this.fetchError = true
                }
            })
        }
    }))
})