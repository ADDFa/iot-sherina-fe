class ParseDate {
    private static monthsName = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Okt",
        "Nov",
        "Des"
    ]

    static date(value: string) {
        const dateObj = new Date(value)
        const Y = dateObj.getFullYear()
        const m = this.monthsName[dateObj.getMonth()]
        const d = dateObj.getDate()

        return `${Y} ${m} ${d}`
    }
}

export default ParseDate
