import 'little-state-machine';

declare module 'little-state-machine' {
  interface GlobalState {
    'welcome'?: any;
    'submit-steps'?: any;
    [x: string]: any;
  }
}