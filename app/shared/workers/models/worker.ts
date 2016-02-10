export enum Team {
    MWS,
    EASY_PUSH,
    CASINO_MOBILE,
    STG,
    PTV,
    IT,
    VIDEOBET,
    IMS,
    GLOBAL,
    SKYWIND,
    CASINO,
    CROSSRIDER,
    LIVE,
    OAPI,
    FINANCE,
    HR,
    MEXOS,
    POKER,
    PLAMEE,
    FABRIC,
    BET365,
    MOBENGA,
    BIG_DATA,
    KIOSK,
    HTML5_LIVE,
    ADMINISTRATION,
    ASIAN_PACIFIC,
    CASUAL_GAMES,
    SPORTSBOOK,
    HTML_INSTALLER,
    OPERATIONS,
    INTERNAL
}


interface IWorker {
    id: number;
    firstName: string;
    lastName: string;
    photo: string;
    team: Team;
}

export class Worker {
    id: number;
    firstName: string;
    lastName: string;
    photo: string;
    team: Team;

    constructor({ id, firstName, lastName, photo, team }: IWorker) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.photo = photo;
        this.team = team;
    }

    static TEAM_NAMES_MAP = new Map<Team, string>(<Array<any>> [
        [Team.MWS, 'MWS'],
        [Team.EASY_PUSH, 'EASY_PUSH'],
        [Team.CASINO_MOBILE, 'CASINO_MOBILE'],
        [Team.STG, 'STG'],
        [Team.PTV, 'PTV'],
        [Team.IT, 'IT'],
        [Team.VIDEOBET, 'VIDEOBET'],
        [Team.IMS, 'IMS'],
        [Team.GLOBAL, 'GLOBAL'],
        [Team.SKYWIND, 'SKYWIND'],
        [Team.CASINO, 'CASINO'],
        [Team.CROSSRIDER, 'CROSSRIDER'],
        [Team.LIVE, 'LIVE'],
        [Team.OAPI, 'OAPI'],
        [Team.FINANCE, 'FINANCE'],
        [Team.HR, 'HR'],
        [Team.MEXOS, 'MEXOS'],
        [Team.POKER, 'POKER'],
        [Team.PLAMEE, 'PLAMEE'],
        [Team.FABRIC, 'FABRIC'],
        [Team.BET365, 'BET365'],
        [Team.MOBENGA, 'MOBENGA'],
        [Team.BIG_DATA, 'BIG_DATA'],
        [Team.KIOSK, 'KIOSK'],
        [Team.HTML5_LIVE, 'HTML5_LIVE'],
        [Team.ADMINISTRATION, 'ADMINISTRATION'],
        [Team.ASIAN_PACIFIC, 'ASIAN_PACIFIC'],
        [Team.CASUAL_GAMES, 'CASUAL_GAMES'],
        [Team.SPORTSBOOK, 'SPORTSBOOK'],
        [Team.HTML_INSTALLER, 'HTML_INSTALLER'],
        [Team.OPERATIONS, 'OPERATIONS'],
        [Team.INTERNAL, 'INTERNAL']
    ]);

    get teamName() {
        return Worker.TEAM_NAMES_MAP.get(this.team);
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
