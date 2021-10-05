export class App {
    static readonly Id = 1; // 1: web - 2: app
    static readonly Version = 1_0_0;
    static readonly Host = "autotimelapse.com";
    static readonly Company = "I&I HiTech";
    static readonly Domain = `https://${App.Host}/`;
    static readonly ApiUrl = `https://api-app.${App.Host}/v4`;
    static readonly UrlCdnSc = `https://cdn-sc.${App.Host}/files`;
    static readonly SentryDsn = "https://45bb5c5632ff443c9812f1b9c4a3ce72@o355966.ingest.sentry.io/5861246";
    static readonly Hashids = {
        "connections": {
            "main": {
                "salt": "TsDh^3X3G6cA",
                "length": 15
            },
            "cache": {
                "salt": "1uSc$U&sN40d",
                "length": 20
            },
            "user": {
                "salt": "nrZtBS@@^O71",
                "length": 20
            },
            "file": {
                "salt": "$XLy6T$6T5fn",
                "length": 36
            }
        }
    };
    static readonly HoursStoreState: number = 24;
    static readonly DelaySearch: number = 400;
    static readonly TimeoutHideCopy: number = 4500;
    static readonly FormatFromDate: string = "YYYY-MM-DD";
    static readonly FormatFromTime: string = "HH:mm:ss";
    static readonly FormatFromMoment: string = "YYYY-MM-DDTHH:mm:ss.SSS[Z]";
    static readonly FormatToMoment: string = "DD-MM-YYYY HH:mm:ss";
    static readonly FormatToDate: string = "DD-MM-YYYY";
    static readonly FormatToTime: string = "HH:mm:ss";
    static readonly VideoIntroSecond: number = 6;
    static readonly VideoOutroSecond: number = 15;
    static readonly RV_FPS: number = 30;
}
