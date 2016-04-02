import { Room, IRoom, ROOM_DEFAULT_SKELETON, RoomType } from './room';


export interface IUtilityRoom extends IRoom {
}

export const TEAM_ROOM_DEFAULT_SKELETON: IUtilityRoom = Object.assign({}, ROOM_DEFAULT_SKELETON);

export class UtilityRoom extends Room implements IUtilityRoom {

    constructor({ id, name, icon, position }: IUtilityRoom = TEAM_ROOM_DEFAULT_SKELETON) {
        super({ id, name, icon, position, type: RoomType.UTILITY });
    }

    toJSON(): IUtilityRoom {
        return Object.assign({}, super.toJSON());
    }
}
