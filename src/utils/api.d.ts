import { AxiosResponse } from "axios";

export interface MeirinRequest {
  subject     :string;
  object      :string;
  action      :string;
  environment :string;
}

export interface MeirinResponse {
  decision :string;
}

export interface MeirinMetapolicy {
  id    :number;
  name  :string;
  match :string;
  mode  :string;
}

export interface MeirinInputMetapolicy {
  name  :string;
  match :string;
  mode  :string;
}

export interface MeirinPolicy {
  id     :number;
  name   :string;
  group  :number;
  match  :string;
  effect :string;
}

export interface MeirinInputPolicy {
  name   :string;
  group  :number;
  match  :string;
  effect :string;
}

export function requestMeirin<T = MeirinResponse, R = AxiosResponse<T>>(request :MeirinRequest) :Promise<R>;

export function enumMetapolicy<T = MeirinMetapolicy, R = AxiosResponse<T>>(offset :number, limit :number) :Promise<R>;
export function enumPolicy<T = MeirinPolicy, R = AxiosResponse<T>>(offset :number, limit :number) :Promise<R>;

export function createMetaPolicy<T = MeirinMetapolicy, R = AxiosResponse<T>>(metapolicy :MeirinInputMetapolicy) :Promise<R>;
export function createPolicy<T = MeirinPolicy, R = AxiosResponse<T>>(policy :MeirinInputPolicy) :Promise<R>;

export function deleteMetaPolicy<T = void, R = AxiosResponse<T>>(id :number) :Promise<R>;
export function deletePolicy<T = void, R = AxiosResponse<T>>(id :number) :Promise<R>;

export function patchMetapolicy<T = MeirinMetapolicy, R = AxiosResponse<T>>(id :number, metapolicy :MeirinInputMetapolicy) :Promise<R>;
export function patchPolicy<T = MeirinPolicy, R = AxiosResponse<T>>(id :number, policy :MeirinInputPolicy) :Promise<R>;

export function getMetapolicy<T = MeirinMetapolicy, R = AxiosResponse<T>>(id :number) :Promise<R>;
export function getPolicy<T = MeirinPolicy, R = AxiosResponse<T>>(id :number) :Promise<R>;

// 返回的是字符串，得自己转数字
export function countMetapolicy<T = string, R = AxiosResponse<T>>() :Promise<R>;
export function countPolicy<T = string, R = AxiosResponse<T>>() :Promise<R>;

export function testExpression<T = string, R = AxiosResponse<T>>(expression :string) :Promise<R>;
