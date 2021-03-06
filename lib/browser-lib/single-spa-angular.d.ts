import { AppProps, LifeCycles } from 'single-spa';
export default function singleSpaAngular(userOpts: SingleSpaAngularOpts): LifeCycles;
declare type SingleSpaAngularOpts = {
    NgZone: any;
    bootstrapFunction(props: AppProps): Promise<any>;
    template: string;
    Router?: any;
    domElementGetter?(): HTMLElement;
    AnimationEngine?: any;
};
export {};
