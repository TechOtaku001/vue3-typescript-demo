import { LoginFormInt } from "@/types/login";
import service from ".";

export function login(data: LoginFormInt) {
  return service({
    url: '/login',
    method: 'post',
    data
  })
}