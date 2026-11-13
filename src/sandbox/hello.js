// Smoke test: run one command inside an MXC sandbox (bubblewrap on Linux, Seatbelt on macOS).
import { getPlatformSupport, run } from '@microsoft/mxc-sdk/v1';

const support = getPlatformSupport();
if (!support.isSupported) {
  console.error(`MXC sandbox unavailable: ${support.reason}`);
  process.exit(1);
}

const result = await run({
  filesystem: { readonlyPaths: [process.cwd()] },
  network: { egress: { default: 'deny' } },
  timeoutMs: 30_000,
  command: 'echo hello from inside MXC',
});

process.stdout.write(result.stdout);
if (result.exitCode !== 0) {
  console.error(result.stderr);
  process.exit(result.exitCode ?? 1);
}
