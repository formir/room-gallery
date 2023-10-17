import { ItemType, Position } from './../components/Item';
import { RoomType } from './../components/Room';
export declare const findItemByPosition: (position: Position, items: Array<ItemType>) => ItemType | undefined;
export declare function parseRooms(items: Array<ItemType>, preRooms: Array<RoomType>): void;
export declare function parseWalls(items: Array<ItemType>, preItems: Array<ItemType>, preRooms: Array<RoomType>, position?: Position): ItemType | undefined;
export declare const kebabize: (string: string) => string;
//# sourceMappingURL=parse.d.ts.map