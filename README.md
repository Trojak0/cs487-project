# TASTER — Tracing and Sandboxed Testing of External Repositories

## Supported platforms

| Platform | Sandbox backend | Requirement |
|---|---|---|
| Windows 11 + WSL2 | bubblewrap | **Ubuntu 22.04 or newer** (24.04 recommended) |
| Linux (native) | bubblewrap | Ubuntu 22.04+ or any distro with glibc ≥ 2.34 |
| macOS | Seatbelt (built in) | **Apple Silicon (M1+)**, macOS 11+ |

Not supported: Ubuntu 20.04 (glibc, gcc and bubblewrap are too old) and Intel Macs (the SDK ships no x64 macOS library).

## Setup

### 1. Prerequisites

**WSL2 / Linux**
```bash
lsb_release -rs     # 22.04 or newer
uname -r            # WSL only: should contain "WSL2"
```
```bash
sudo apt update && sudo apt install -y curl git build-essential bubblewrap
bwrap --version     # 0.5.0 or newer
```

**macOS**
```bash
xcode-select --install   # provides git, curl, compilers
```

If you have conda, turn off auto-activation so it doesn't shadow your Node or Python: `conda config --set auto_activate_base false`

### 2. Node.js 24+ (via nvm)
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```
Open a new terminal (or `source ~/.bashrc` on Linux, `source ~/.zshrc` on macOS), then:
```bash
nvm install 24 && nvm alias default 24
node -v             # v24.x
```

### 3. Clone and install
```bash
git clone git@github.com:Trojak0/cs487-project.git
cd cs487-project
nvm use             # reads .nvmrc
npm install         # installs @microsoft/mxc-sdk
```

### 4. Verify the sandbox
```bash
npm run check       # prints "hello from inside MXC"
```
If it fails, the error message names the missing requirement.

## Notes
- WSL: clone into the Linux filesystem (`~/`), not `/mnt/c/`.
- API keys go in `.env` (copy `.env.example`). Never commit `.env`.
- Malicious samples are **not** stored in the repo. `datasets/` holds only names, versions and hashes.
