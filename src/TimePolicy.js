export default class TimePolicy {
    async check() {
        return new Date().getHours() >= 16;
    }
}