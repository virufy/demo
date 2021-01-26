import 'little-state-machine';

declare module 'little-state-machine' {
  interface GlobalState {
    'welcome'?: any;
    'submit-steps'?: SubmitSteps;
    [x: string]: any;
  }

  interface SubmitSteps {
    recordYourCough?: {
      recordingFile?: File;
      uploadedFile?: File;
    }
  }
}