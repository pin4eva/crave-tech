import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as sgMail from '@sendgrid/mail';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { ReqWithUser } from 'src/typings';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { config } from 'src/utils';
sgMail.setApiKey(config.SENDGRID_API_KEY);

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @Inject(REQUEST) private readonly req: ReqWithUser,
    private jwtService: JwtService,
  ) {}

  async register(data: UserDocument): Promise<UserDocument> {
    const { password, email, name } = data;
    let user = await this.userModel.findOne({ email });
    if (user)
      throw new BadRequestException('Email aleady exist, sigin instead');

    try {
      user = await this.userModel.create({
        ...data,
        password: bcrypt.hashSync(password, 10),
        firstName: name?.split(' ')?.[0],
        lastName: name?.split(' ')?.[1],
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async login(data: {
    email: string;
    password: string;
  }): Promise<{ id: string; token: string; isActive: boolean }> {
    try {
      let user = await this.userModel.findOne({ email: data.email });
      if (!user) throw new NotFoundException('You are not yet registered');
      const isMatch = bcrypt.compareSync(data.password, user.password);
      if (!isMatch)
        throw new UnauthorizedException('Email or password not correct');
      const { id, isActive } = user;
      const token = `Bearer ${this.jwtService.sign(id)}`;
      user = await this.userModel.findById(id).select('-password');
      this.req.user = user;
      return { id, isActive, token };
    } catch (error) {
      throw error;
    }
  }

  async getMe(): Promise<UserDocument> {
    const user = this.req.user;
    try {
      await this.userModel.updateOne(
        { _id: user.id },
        {
          $set: { lastSeen: new Date() },
        },
      );
      // const user = await this.userModel.findById(id).select('-password');
      return user;
    } catch (error) {
      throw error;
    }
  }
}
