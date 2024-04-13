import { UsersRepository } from '../repositories/UsersRepository';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { INewUser, IUser, IUserLogin } from '../types/types';

class AuthService {

  async signup(userData: INewUser) {

    const {name, password, email} = userData;
    const emailTaken = await new UsersRepository().findByEmail(email);

    if (emailTaken){
      throw new Error('This email is already in use');
    }

    this.verifyPassword(password);
    const hashedPassword = await hash(password, 12);

    const user = await new UsersRepository().create({
      name, password: hashedPassword, email
    });

    const accessToken = this.generateToken(user, '1d');
    return { accessToken };
  }

  async signin(userData: IUserLogin) {

    const { email, password } = userData;
    const user = await new UsersRepository().findByEmail(email);

    if (!user){
      throw new Error('User not found');
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const accessToken = this.generateToken(user, '1d');
    return { accessToken };
  }

  generateToken(user: IUser, expiresIn: string) {
    const jwtSecret = process.env.JWT_SECRET;

    if (jwtSecret) {
      const token = sign(
        {
          user: {
            id: user.id,
            name: user.name,
            password: user.password,
            email: user.email,
          }
        },
        jwtSecret,
        {
          subject: user.id,
          expiresIn
        }
      );
      return token;
    } else {
      throw new Error('JWT Secret not found');
    }
  }

  verifyPassword(password: string) {

    if(password.length < 8) {
      throw new Error('Your password must have at least 8 characters');
    }

    const specialChars = /[^\w\s\d]/;
    const verifySpecialChars = specialChars.test(password);
    if(!verifySpecialChars) {
      throw new Error('Your password must have at least one special character');
    }

    const camalCase = /[A-Z]/g;
    const verifyCamalCase = camalCase.test(password);
    if(!verifyCamalCase) {
      throw new Error('Your password must have at least one camal case letter');
    }
  }

}

export {AuthService};
