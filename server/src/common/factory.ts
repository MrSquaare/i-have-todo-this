export type EntityConstructor<T> = new () => T;

export abstract class Factory<T> {
  protected abstract entity: EntityConstructor<T>;
  protected abstract attrs(): T;

  protected makeEntity(): T {
    const entity = new this.entity();

    Object.assign(entity, this.attrs());

    return entity;
  }

  public make(): T {
    return this.makeEntity();
  }

  public makeMany(amount: number): T[] {
    return Array.from({ length: amount }).map(() => this.makeEntity());
  }
}
