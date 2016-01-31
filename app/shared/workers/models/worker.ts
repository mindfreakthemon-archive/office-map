export enum Team {
    MWS,
    IMS,
    Mobenga,
    Plamee
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
        [Team.MWS, 'Mobile & Web Services'],
        [Team.IMS, 'IMS'],
        [Team.Mobenga, 'Mobenga'],
        [Team.Plamee, 'Plamee']
    ]);

    get teamName() {
        return Worker.TEAM_NAMES_MAP.get(this.team);
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
