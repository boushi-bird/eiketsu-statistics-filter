import { main } from './main';
import { SCRIPT_ID } from './defines';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any)[SCRIPT_ID] = main;

main();
