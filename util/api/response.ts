import { Turo } from '@/types';
import i18n from '@/util/i18next';
import { NextApiResponse } from 'next';

export namespace RespUtil {
  export function succ(): Turo.ApiResponse {
    return {
      code: Turo.StatusCode.SUCCESS,
      msg: i18n.t(`statusCode:${Turo.StatusCode.SUCCESS}`),
    };
  }

  export function fail<D = unknown>(
    code: Turo.StatusCode = Turo.StatusCode.UNKNOWN_FAIL,
    data?: D
  ): Turo.ApiResponse<D> {
    return {
      code: code,
      msg: i18n.t(`statusCode:${code}`),
      data,
    };
  }

  export function ofData<D = unknown>(data: D): Turo.ApiResponse<D> {
    const resp = succ();
    resp.data = data;
    return resp as Turo.ApiResponse<D>;
  }

  export const responseJson = <D>(response: NextApiResponse<Turo.ApiResponse<D>>, result: Turo.ApiResponse<D>) => {
    response.status(200).json(result);
  };

  export const succNextApi = (response: NextApiResponse<Turo.ApiResponse>) => {
    return responseJson(response, succ());
  };

  export const ofDataNextApi = <D = unknown>(response: NextApiResponse<Turo.ApiResponse<D>>, data: D) => {
    return responseJson(response, ofData(data));
  };

  export const failNextApi = <D = unknown>(
    response: NextApiResponse<Turo.ApiResponse<D>>,
    code?: Turo.StatusCode,
    data?: D
  ) => {
    return responseJson(response, fail(code, data));
  };

  export const requestMethodNotAllow = (response: NextApiResponse) => {
    response.status(405).send({ message: 'Request Method Not Allowed' });
  };
}
