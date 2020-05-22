import "reflect-metadata";

import { Entity } from "./app/decorators/entity";
import { Property } from "./app/decorators/property";
import { RawQuery, Insert, Update } from "./app/decorators/query";

@Entity("users")
class User {
  @Property
  name!: string;

  @Property
  email!: string;

  @Property
  password!: string;

  @Property({ name: "birth_date" })
  birthDate!: Date;

  @Property
  age!: number;
}

@Entity("profiles")
class Profile {
  @Property
  picture!: string;
}

interface Props {
  name: string;
}

class ProfileDAO {
  @Insert
  async create(profile: Profile): Promise<Profile> {
    throw Error(`unable to create ${profile}`);
  }

  @Insert
  async createMany(profiles: Profile[]): Promise<Profile[]> {
    throw Error(`unable to create ${profiles}`);
  }

  @Insert
  async createAndPopulate(profile: Profile, relations: Profile[]): Promise<Profile> {
    throw Error(`unable to create ${profile} with ${relations}`);
  }

  @(RawQuery<Profile | undefined>(Profile)<Props>`
    SELECT * WHERE ${({ name }) => name}
  `)
  async getProfileRaw(props: Props): Promise<Profile | undefined> {
    throw Error(`unable to find ${props}`);
  }

  @Update
  async update() {}
}

new ProfileDAO()
  .getProfileRaw({ name: "Santos" })
  .then(console.log)
  .catch(console.log);

// TODO: if a entity don't have a primary key, then create an
// TODO: create FK's
// TODO: callbacks to onDelete, onUpdate, onInsert...
// TODO: decorator to ignore a field in an entity
// TODO: insert params, onConflic and more
// TODO: decorator to PK
// TODO: create the relationship system { parent, parentColumn, entityColumn }
// TODO: OneToOne, OneToMany, ManyToOne and ManyToMany
// TODO: Converters of types