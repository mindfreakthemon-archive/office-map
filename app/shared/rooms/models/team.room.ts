import { Room, IRoom, ROOM_DEFAULT_SKELETON, RoomType } from './room';


export interface ITeamRoom extends IRoom {
}

export const TEAM_ROOM_DEFAULT_SKELETON: ITeamRoom = Object.assign({}, ROOM_DEFAULT_SKELETON);

export class TeamRoom extends Room implements ITeamRoom {

    constructor({ id, name, icon, position }: ITeamRoom = TEAM_ROOM_DEFAULT_SKELETON) {
        super({ id, name, icon, position, type: RoomType.TEAM });
    }

    toJSON(): ITeamRoom {
        return Object.assign({}, super.toJSON());
    }
}
