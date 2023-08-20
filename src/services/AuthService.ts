import { UsersRepository } from '../repositories/UsersRepository';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface User {
  id: string,
  name: string,
  email: string,
  password: string,
  profilePicture: string | null
}

interface UserLogin {
  email: string,
  password: string
}

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

    const accessToken = this.generateToken(user);
    return { accessToken };
  }

  async signin(userData: UserLogin) {

    const { email, password } = userData;
    const user = await new UsersRepository().findByEmail(email);

    if (!user){
      throw new Error('User not found');
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const accessToken = this.generateToken(user);
    return { accessToken };
  }

  generateToken(user: User) {
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
