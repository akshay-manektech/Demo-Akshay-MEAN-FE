import { RegisterPayloadInterface } from "./register-payload.interface";

export type LoginPayloadInterface = Pick<
  RegisterPayloadInterface,
  'email' | 'password'
>;