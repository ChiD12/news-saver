export interface Device {
  deviceType: string;
  externalDeviceId?: string;
  userId: string;
}

export interface DeviceDto {
  device: Device;
  updateDevice: boolean;
}

export interface User {
  id: string;
  name: string;
  password: string;
  email: string;
  devices: Device[];
}

export interface UserInput {
  name: string;
  password: string;
  email: string;
}

export interface UserDto {
  name: string;
}

export interface LoginDto {
  name: string;
  userId: string;
  deviceType: string;
  externalDeviceId?: string;
}

export interface LoginInput {
  name: string;
  password: string;
  deviceType: string;
  deviceId?: string;
}

export interface UserRepo {
  insertUser(user: UserInput): Promise<boolean>;
  insertDevice(device: Device, userName: string): Promise<boolean>;
  getAll(): Promise<User[]>;
  getUserByName(name: string): Promise<User | null>;
}

export interface UserService {
  postUser(user: UserInput): Promise<boolean | void>;
  getAllUsers(): Promise<User[]>;
  login(loginInput: LoginInput): Promise<string | null>;
}
