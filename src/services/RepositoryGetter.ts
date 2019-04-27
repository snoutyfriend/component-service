export interface RepositoryGetter<T> {
    findAll(): T[];
    get(id: string): T[];
}
