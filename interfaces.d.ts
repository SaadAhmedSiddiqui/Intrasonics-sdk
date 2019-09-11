// Type definitions for intrasonics-sdk
// Project: https://github.com/SaadAhmedSiddiqui/Intrasonics-sdk
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.5.3

export interface MainConfig {
  softwareFolder: string;
  tokenPath: string;
}
export interface EncodeConfig {
  filePath: string;
  codeword: string;
  outputPath?: string;
  eventEngine?: string;
  time?: string;
}
export type encode = (config: EncodeConfig) => Promise<string>
export interface IntrasonicsSDK {
  new(config: MainConfig): IntrasonicsSDK;
  encode: encode;
}
