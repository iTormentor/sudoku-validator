import {validateBoxes} from "../service/verifier";

export {};

const self = globalThis as unknown as DedicatedWorkerGlobalScope;

self.onmessage = (message: MessageEvent<Array<Array<number>>>) => {
    self.postMessage(validateBoxes(message.data));
};
