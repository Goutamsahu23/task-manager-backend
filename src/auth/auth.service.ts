import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async signup(signupDto: SignupDto): Promise<any> {
    const { name, username, password } = signupDto;
    const existingUser = await this.userRepository.findOne({ where: { username } });

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({ name, username, password: hashedPassword });
    await this.userRepository.save(newUser);

    const payload = { username };
    const accessToken = this.jwtService.sign(payload);

    return {
      status: 200,
      message: "user registered successfully",
      newUser,
      access_token: accessToken
    };
  }

  async login(loginDto: LoginDto): Promise<any> {
    const { username, password } = loginDto;
  
    // demo
    if (username === 'demouser@gmail.com' && password === 'password') {
      const payload = { username };
      const accessToken = this.jwtService.sign(payload);
  
      return {
        status: 200,
        message: 'Demo user logged in successfully',
        user: { username }, 
        access_token: accessToken,
      };
    }
  
    // Regular user authentication
    const user = await this.userRepository.findOne({ where: { username } });
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const payload = { username };
    const accessToken = this.jwtService.sign(payload);
  
    return {
      status: 200,
      message: 'User logged in successfully',
      user,
      access_token: accessToken,
    };
  }
  
}
