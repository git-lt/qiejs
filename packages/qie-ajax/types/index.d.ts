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
export declare class Request {
    catch?: (err: any) => void;
    dataType: "json" | "default" | "form-data";
    loading: ILoadingProps | undefined;
    axios: AxiosStatic;
    cancelSource: CancelTokenSource;
    loadingDelay: number;
    constructor(options: IAjax);
    regist(apis: Record<string, string | Function>, servicePrefix?: string): Record<string, TimerHandler>;
    _transfromToRequest(methodUrl: string, servicePrefix?: string): (config: Partial<IRequestConfig>) => Promise<any>;
    _changeLoading(loading: boolean | Function, state: boolean): void;
}
declare const _default: (options: IAjax) => Request;
export default _default;
