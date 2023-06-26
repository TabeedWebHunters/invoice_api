import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
@Injectable()
export class UserService {

  constructor(@InjectRepository(User) public readonly userRepo: Repository<User>
  ){};

  async findOne(email : string) {
    let user : User = await this.userRepo.findOne({where:{email: email}})
    return user;
  }

  async registerUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string,
  ): Promise<User> {
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
    user.role = role;
    
    console.log(user);

    return this.userRepo.save(user);
  }

  async deleteUserByEmail(email: string): Promise<boolean> {
    const user = await this.userRepo.findOne({ where: { email } });
  
    if (!user) {
      throw new Error(`User with email ${email} not found.`);
    }

    await this.userRepo.remove(user);
  
    return true;
  }
  
}
