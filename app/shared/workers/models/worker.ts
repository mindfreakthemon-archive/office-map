export enum Team {
    MWS,
    IMS,
    Mobenga,
    Plamee
}

export class Worker {
    id: number;
    firstName: string;
    lastName: string;
    team: Team;

    constructor({ id, firstName, lastName, team } : { id: number, firstName: string, lastName: string, team: Team }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
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
}
