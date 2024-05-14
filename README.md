# Productivity Tracker

A command-line tool for tracking tasks and breaks, including Pomodoro sessions. This tool helps you manage your productivity by logging task and break times, providing summaries, and offering productivity analysis.

## Features

- **Task and Break Management**: Start and stop tasks and breaks, and switch between them seamlessly.
- **Automated Analysis and Notifications**: Analyze productivity and receive notifications.
- **Custom Configuration**: Configure break intervals and other settings.
- **Security and Privacy**: Optionally encrypt your logs with a passphrase.
- **Pomodoro Technique**: Integrated Pomodoro timer.
- **Daily Logging**: Record logs on a daily basis.
- **Command-Line Usage**: Execute the tool from anywhere on your Linux system.

## Installation

### Prerequisites

- Node.js (https://nodejs.org)
- npm (https://www.npmjs.com)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/jagdishdev32/productivity-tracker.git
   cd productivity-tracker
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Make the script executable:

   ```bash
   chmod +x main.js
   ```

### Global Installation

To use the productivity tracker from anywhere in your terminal, you can install it globally using the `pkg` tool.

1. Install `pkg`:

   ```bash
   npm install -g pkg
   ```

2. Build the binary:

   ```bash
   pkg . --out-path build
   ```

3. Move the binary to a directory in your `PATH` (e.g., `/usr/local/bin`):

   ```bash
   sudo mv build/productivity-tracker /usr/local/bin/
   ```

### Usage

Run the tracker with the command:

```bash
productivity-tracker
```

### Commands

- **`T`**: Start or switch to a new task.
- **`B`**: Start or switch to a new break.
- **`P`**: Start a Pomodoro session.
- **`SUMMARY`**: Display a summary report of task and break times.
- **`ANALYZE`**: Analyze productivity based on logs.
- **`Q`**: Quit the program and display all logs.

### Example Usage

1. **Start a Task**:

   ```bash
   productivity-tracker
   T
   ```

2. **Start a Break**:

   ```bash
   B
   ```

3. **Start a Pomodoro Session**:

   ```bash
   P
   ```

4. **Get a Summary Report**:

   ```bash
   SUMMARY
   ```

5. **Analyze Productivity**:

   ```bash
   ANALYZE
   ```

6. **Quit and Display Logs**:
   ```bash
   Q
   ```

## Development

### File Structure

- `main.js`: Main entry point for the CLI tool.
- `utils.js`: Utility functions for time management and logging.
- `prompts.js`: Functions for prompting user input.
- `productivity.js`: Functions for productivity analysis.

### Build Script

For convenience, you can use the `build.js` script to automate the build process:

```javascript
#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");

const buildDir = path.resolve(__dirname, "build");

console.log("Building the binary...");
execSync(`pkg . --out-path ${buildDir}`, { stdio: "inherit" });

console.log("Binary built successfully!");
```

Make the script executable:

```bash
chmod +x build.js
```

Run the build script:

```bash
./build.js
```

## Contributing

Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
