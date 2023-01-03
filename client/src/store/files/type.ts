export type TSort = 'name' | 'type' | 'date';
export type TView = 'list' | 'plate';

export interface IGetFilesArgs {
	parentId?: string | null;
	sortBy?: string;
}
