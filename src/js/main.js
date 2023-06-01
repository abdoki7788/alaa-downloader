function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}

document.addEventListener('alpine:init', () => {
    Alpine.data('main', () => ({
        link: "",
        reso: "480",
        fetching: false,
        fetched: false,
        fetchingText: "در حال دریافت اطلاعات دوره",
        fetchError: false,
        fetchErrorMessage: "مشکلی پیش آمده ِ. لینک دیگری را امتحان کنید",
        fetchErrorTitle: "مشکلی هست!",
        episodes: [],
        allDownloadLinks: ``,
        coursePage: "",
        async getLinksText() {
            downloadURI("data:x-application/text," + this.allDownloadLinks, "course_links.txt");
        },
        async extractEpidodeLinks(episodeHtml, epUrl, position) {
            let doc = new DOMParser().parseFromString(episodeHtml, "text/html");
            let pageJson = JSON.parse(doc.querySelector('script[type="application/ld+json"]').innerHTML)
            let episodeDetail = {
                "name": pageJson.name,
                "description": pageJson.description,
                "episodeUrl": epUrl,
                "position": position,
                "url": doc.querySelector(`source[res="${this.reso}p"]`).src
            }
            return episodeDetail
        },
        async getEpisodes(courseHTML) {
            let doc = new DOMParser().parseFromString(courseHTML, "text/html");
            courseDetail = JSON.parse(doc.querySelectorAll('script[type="application/ld+json"]')[1].innerHTML).itemListElement
            for (const value of courseDetail) {
                let episodeUrl = value.url;
                const response = await fetch(episodeUrl, {
                    responseType: 'html/text'
                });
                if (response.status == 200) {
                    let episode = await response.text();
                    let episodeDetail = await this.extractEpidodeLinks(episode, episodeUrl, value.position)
                    this.episodes = [...this.episodes, episodeDetail]
                    this.allDownloadLinks += episodeDetail.url + '\n'
                    this.fetchingText = `در حال واکشی قسمت ها : قسمت ${value.position}.`;
                }
            }
        },
        async fetchCourse() {
            this.episodes = []
            this.allDownloadLinks = ``
            this.fetching = true
            this.fetched = false
            await fetch(this.link, {
                responseType: 'html/text'
            }).then(async response => {
                if (response.status == 200) {
                    let body = await response.text()
                    this.coursePage = body
                    await this.getEpisodes(this.coursePage)
                    this.fetchingText = "عملیات کامل شد!"
                    setTimeout(() => {
                        console.log(this.allDownloadLinks)
                        this.fetching = false
                        this.fetched = true
                    }, 1000)
                } else if (response.status == 404) {
                    this.fetchErrorMessage = 'لینک وارد شده وجود ندارد لطفا دوباره امتحان کنید'
                    this.fetchErrorTitle = 'لینک اشتباه'
                    this.fetchError = true
                }
            })
        }
    }))
})