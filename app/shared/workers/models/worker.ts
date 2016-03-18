import { Serializable } from '../../app/common/serializable';

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

export enum Gender {
    FEMALE,
    MALE
}

export interface IWorker {
    id: string;
    firstName: string;
    lastName: string;
    photo: string;
    email: string;
    team: Team;
    gender: number;
}

const WORKER_DEFAULT_SKELETON: IWorker = {
    id: null,
    firstName: '',
    lastName: '',
    photo: '',
    email: null,
    team: null,
    gender: Gender.MALE
};


export class Worker implements Serializable, IWorker {
    static TEAM_NAMES_MAP = new Map<Team, string>(<Array<any>> [
        [Team.MWS, 'Mobile & Web Services'],
        [Team.EASY_PUSH, 'Easy Push'],
        [Team.CASINO_MOBILE, 'Casino Mobile'],
        [Team.STG, 'STG'],
        [Team.PTV, 'PTV'],
        [Team.IT, 'IT'],
        [Team.VIDEOBET, 'Videobet'],
        [Team.IMS, 'IMS'],
        [Team.GLOBAL, 'Global'],
        [Team.SKYWIND, 'Skywing'],
        [Team.CASINO, 'Casino'],
        [Team.CROSSRIDER, 'Crossrider'],
        [Team.LIVE, 'LIVE'],
        [Team.OAPI, 'OAPI'],
        [Team.FINANCE, 'Finance'],
        [Team.HR, 'HR'],
        [Team.MEXOS, 'Mexos'],
        [Team.POKER, 'Poker'],
        [Team.PLAMEE, 'Plamee'],
        [Team.FABRIC, 'FABRIC'],
        [Team.BET365, 'Bet 365'],
        [Team.MOBENGA, 'Mobenga'],
        [Team.BIG_DATA, 'Big Data'],
        [Team.KIOSK, 'Kiosk'],
        [Team.HTML5_LIVE, 'HTML5 Live'],
        [Team.ADMINISTRATION, 'Administration'],
        [Team.ASIAN_PACIFIC, 'Asian Pacific'],
        [Team.CASUAL_GAMES, 'Casual Games'],
        [Team.SPORTSBOOK, 'Sportsbook'],
        [Team.HTML_INSTALLER, 'HTML Installer'],
        [Team.OPERATIONS, 'Operations'],
        [Team.INTERNAL, 'Internal']
    ]);

    static GENDER_MAP = new Map<number, string>(<Array<any>> [
        [Gender.FEMALE, 'Female'],
        [Gender.MALE, 'Male']
    ]);

    id: string;
    firstName: string;
    lastName: string;
    photo: string;
    email: string;
    _team: Team;
    _gender: number;

    constructor({ id, firstName, lastName, email, photo, team, gender }: IWorker = WORKER_DEFAULT_SKELETON) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.photo = photo;
        this.email = email;
        this.team = team;
        this.gender = gender;
    }

    get gender() {
        return this._gender;
    }

    set gender(value) {
        let gender = parseInt(String(value), 10);

        this._gender = Worker.GENDER_MAP.has(gender) ? gender : Gender.MALE;
    }

    get team() {
        return this._team;
    }

    set team(value) {
        let team = parseInt(String(value), 10);

        this._team = Worker.TEAM_NAMES_MAP.has(team) ? team : Team.MWS;
    }

    get teamName() {
        return Worker.TEAM_NAMES_MAP.get(this.team);
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    get genderName() {
        return Worker.GENDER_MAP.get(this.gender);
    }

    toJSON(): IWorker {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            photo: this.photo,
            email: this.email,
            team: this.team,
            gender: this.gender
        }
    }
}
