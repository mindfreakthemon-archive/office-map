// typescript magic

export class SerializableService {
}

export interface Serializable extends SerializableService {
    toJSON(): any;
}
