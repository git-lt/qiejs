import { CancelTokenSource, AxiosStatic } from "axios";
export interface ILoadingProps {
    show: Function;
    hide: Function;
}
declare type RequestDataType = "json" | "default" | "form-data";
export interface IAjax {
    catch?: (err: any) => void;
    dataType?: RequestDataType;
    loading?: ILoadingProps;
    loadingDelay?: number;
    axios: AxiosStatic;
}
export interface IRequestConfig {
    data: any;
    dataType: RequestDataType;
    catchError: boolean;
    headers: any[];
    loading: Function | boolean;
    [propName: string]: any;
}
export declare type ITransApiResult = <T = any>(config?: Partial<IRequestConfig>) => Promise<T>;
export declare type ITransFnApiResult = (...params: any[]) => ITransApiResult;
declare type ITransResult = ITransApiResult | ITransFnApiResult;
declare type IApiTypes = Record<string, ITransResult>;
export declare class Request {
    catch?: (err: any) => void;
    dataType: "json" | "default" | "form-data";
    loading: ILoadingProps | undefined;
    axios: AxiosStatic;
    cancelSource: CancelTokenSource;
    loadingDelay: number;
    constructor(options: IAjax);
    regist<T extends IApiTypes>(apis: Record<string, string | Function>, servicePrefix?: string): T;
    _transfromToRequest(methodUrl: string, servicePrefix?: string): ITransApiResult;
    _changeLoading(loading: boolean | Function, state: boolean): void;
}
declare const _default: (options: IAjax) => Request;
export default _default;
