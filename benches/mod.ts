import { runBenchmarks } from './deps.ts';

import './thousand.ts';
import './million.ts';

await runBenchmarks();
