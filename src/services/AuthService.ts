import { UsersRepository } from '../repositories/UsersRepository';
import { hash } from 'bcryptjs';
import { User } from '../types';
import { sign } from 'jsonwebtoken';

class AuthService {

  async signup(userData: User) {

    const {name, password, email, profilePicture} = userData;
    const emailTaken = await new UsersRepository().findByEmail(email);

    if (emailTaken){
      throw new Error('This email is already in use');
    }

    const hashedPassword = await hash(password, 12);

    const user = await new UsersRepository().create({
      name, password: hashedPassword, email, profilePicture
    });

    const jwtSecret = process.env.JWT_SECRET;

    if (jwtSecret) {
      const token = sign(
        {
          user: {
            id: user.id,
            name: user.name,
            password: user.password,
            email: user.email,
            profilePicture: user.profilePicture
          }
        },
        jwtSecret,
        {
          subject: user.id,
          expiresIn: '1d'
        }
      );
      return token;
    } else {
      throw new Error('JWT Secret not found');
    }
  }

}

export {AuthService};
