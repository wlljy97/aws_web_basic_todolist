class DateUtils {
    static leftPad(value) {
        if(value >= 10) {
            return value;
        }

        return`0${value}`; // 10 이하면 01 이런식으로 표시하기 위한것
    }

    static toStringByFormatting(date, delimiter) {
        const year = date.getFullYear();
        const month = this.leftPad(date.getMonth() + 1); // index로 되어 있기 때문에 0부터 시작해서 +1을 해준다.
        const day = this.leftPad(date.getDate());

        return [year, month, day].join("-");
    }
}